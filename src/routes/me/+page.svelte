<script lang="ts">
	import FHIR from 'fhirclient';
	import { browser } from '$app/environment';
	import Authenticated from '$lib/components/Authenticated.svelte';
	import ChatDrawer from '$lib/components/ChatPanel.svelte';
	import { OpenRouterClient, type ChatMessage } from '$lib/services/openrouter';
	import ChatPanel from '$lib/components/ChatPanel.svelte';

	// State management with runes
	let patient = $state<Patient | null>(null);
	let documents = $state<ProcessedDocument[]>([]);
	let loading = $state(true);
	let searchTerm = $state('');
	let allExpanded = $state(false);
	let isOpen = $state(false);
	let messages = $state<ChatMessage[]>([]);
	let isLoading = $state(false);

	const client = new OpenRouterClient(
		'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'
	);

	type Patient = {
		resourceType: string;
		id: string;
		name: Array<{
			given: string[];
			family: string;
		}>;
		birthDate: string;
		gender: string;
		address: Array<{
			line: string[];
			city: string;
			state: string;
			postalCode: string;
			country: string;
		}>;
		communication: Array<{
			language: {
				text: string;
			};
		}>;
	};

	type ProcessedDocument = {
		id: string;
		date: Date;
		displayDate: string;
		content: string;
		formattedContent: string;
		searchContext: string;
		status: string;
		author: string;
		type: {
			coding: Array<{
				display: string;
			}>;
		};
	};

	function decodeBase64(data: string): string {
		if (browser) {
			const decoded = atob(data);
			return decoded;
		}
		return '';
	}

	function formatDate(date: Date): string {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function formatContent(content: string): string {
		const lines = content.split('\n');
		let formattedLines = lines.map((line) => {
			if (line.startsWith('# ')) {
				return `<h2 class="text-lg font-bold mt-4 mb-2">${line.substring(2)}</h2>`;
			}
			if (line.startsWith('## ')) {
				return `<h3 class="text-base font-bold mt-3 mb-2">${line.substring(3)}</h3>`;
			}
			if (line.startsWith('- ')) {
				return `<li class="ml-4">${line.substring(2)}</li>`;
			}
			return line ? `<p class="mb-2">${line}</p>` : '';
		});

		return formattedLines.join('\n');
	}

	function getSearchContext(content: string, searchTerm: string): string {
		if (!searchTerm) return '';

		const searchLower = searchTerm.toLowerCase();
		const contentLower = content.toLowerCase();
		const index = contentLower.indexOf(searchLower);

		if (index === -1) return '';

		// Get surrounding context (50 chars before and after)
		const start = Math.max(0, index - 50);
		const end = Math.min(content.length, index + searchTerm.length + 50);
		let context = content.slice(start, end);

		// Add ellipsis if we're not at the start/end
		if (start > 0) context = '...' + context;
		if (end < content.length) context = context + '...';

		return context;
	}

	function processDocuments(bundle: any): ProcessedDocument[] {
		if (!bundle.entry) return [];

		return bundle.entry
			.map((entry: any) => {
				const date = new Date(entry.resource.date);
				const content = decodeBase64(entry.resource.content[0].attachment.data);
				const author = entry.resource.author?.[0]?.display || 'Unknown Doctor';

				return {
					id: entry.resource.id,
					date,
					displayDate: formatDate(date),
					content,
					formattedContent: formatContent(content),
					searchContext: '',
					status: entry.resource.status,
					author,
					type: entry.resource.type
				};
			})
			.sort((a: ProcessedDocument, b: ProcessedDocument) => b.date.getTime() - a.date.getTime());
	}

	async function getAllDocuments(client: any, patientId: string): Promise<ProcessedDocument[]> {
		let allDocs: ProcessedDocument[] = [];
		let nextUrl = `DocumentReference?subject=Patient/${patientId}`;

		while (nextUrl) {
			try {
				const response = await client.request(nextUrl);
				const docs = processDocuments(response);
				allDocs = [...allDocs, ...docs];

				// Check if there's a next page
				const nextLink = response.link?.find((link: any) => link.relation === 'next');
				// Get just the relative path after /api/fhir/{workspace_id}/
				nextUrl = nextLink ? nextLink.url.split('/api/fhir/')[1].split('/').slice(1).join('/') : '';
			} catch (error) {
				console.error('Error fetching documents:', error);
				break;
			}
		}

		return allDocs;
	}

	function toggleAll() {
		allExpanded = !allExpanded;
		if (browser) {
			const details = document.querySelectorAll('details');
			details.forEach((detail) => {
				detail.open = allExpanded;
			});
		}
	}

	async function handleChatSubmit(message: string) {
		if (isLoading) return;
		isLoading = true;

		// Add user message to chat
		messages = [...messages, { role: 'user', content: message }];

		console.info(
			documents
				.map((doc, index) => {
					return `Document ${index + 1}:\n${JSON.stringify(doc, null, 2)}`;
				})
				.join('\n\n')
		);

		// Prepare system message with context
		const systemMessage = {
			role: 'system' as const,
			content: `You are a medical language model. 
			* Read the clinical notes
			* Identify the main decisions (e.g., prescribing a medication, ordering labs, advising lifestyle changes, etc.).
			* For each decision, explicitly state the reason (why it was done). Use context from the note to either quote or infer the rationale.
			
			---
			Context (Clinical Notes):
			${documents
				.map((doc, index) => {
					return `Document ${index + 1}:\n${JSON.stringify(doc, null, 2)}`;
				})
				.join('\n\n')}
			---`
		};

		let streamingMessage = { role: 'assistant' as const, content: '' };
		messages = [...messages, streamingMessage];

		try {
			await client.streamChat(
				[systemMessage, ...messages.slice(0, -1), { role: 'user', content: message }],
				(chunk) => {
					streamingMessage.content += chunk;
					messages = [...messages.slice(0, -1), streamingMessage];
				}
			);
		} catch (error) {
			console.error('Chat error:', error);
		} finally {
			isLoading = false;
		}
	}

	function clearChat() {
		messages = [];
	}

	$effect(() => {
		if (browser) {
			FHIR.oauth2
				.ready()
				.then(async (client) => {
					const patientId = client.getPatientId();

					// Get patient info
					const patientData = await client.request<Patient>(`Patient/${patientId}`);
					patient = patientData;

					if (patientId == null) {
						console.error('No patient ID found');
						return;
					}

					// Get all documents
					documents = await getAllDocuments(client, patientId);
					loading = false;
				})
				.catch((error) => {
					console.error('Failed to fetch data:', error);
					loading = false;
				});
		}
	});

	const filteredDocs = $derived(
		documents
			.map((doc) => {
				const searchLower = searchTerm.toLowerCase();
				const matches =
					doc.displayDate.toLowerCase().includes(searchLower) ||
					doc.content.toLowerCase().includes(searchLower) ||
					doc.author.toLowerCase().includes(searchLower);

				if (matches) {
					return {
						...doc,
						searchContext: getSearchContext(doc.content, searchTerm)
					};
				}
				return null;
			})
			.filter((doc): doc is ProcessedDocument => doc !== null)
	);
</script>

<Authenticated>
	{#if loading}
		<div class="flex justify-center items-center h-screen">
			<div class="card p-4">
				<p>Retrieving your medical records...</p>
				<div class="progress"></div>
			</div>
		</div>
	{:else}
		<div class="h-screen flex flex-col">
			<!-- Fixed Search Bar with max width -->
			<div class="w-full border-b-2 border-purple-600/10">
				<div class="container mx-auto max-w-[1400px] p-4">
					<div class="flex gap-4 items-center">
						<div class="relative w-full">
							<input
								type="search"
								placeholder="Search through medical records..."
								bind:value={searchTerm}
								class="w-full h-12 pl-4 pr-4 input"
							/>
						</div>
						<p class="text-lg">
							{filteredDocs.length} of {documents.length} documents
						</p>
						<button class="btn variant-filled h-full px-8" onclick={toggleAll}>
							{allExpanded ? 'Collapse All' : 'Expand All'}
						</button>
						<button
							class="btn variant-filled-secondary h-full px-8"
							class:variant-filled-primary={isOpen}
							onclick={() => (isOpen = !isOpen)}
						>
							AI Analysis
						</button>
					</div>
				</div>
			</div>

			<!-- Scrollable Content with max width -->
			<div class="flex-1 overflow-hidden bg-surface-100/65">
				<div class="container mx-auto max-w-[1400px] h-full">
					<div
						class="h-full grid"
						class:grid-cols-[300px_1fr]={!isOpen}
						class:grid-cols-[300px_1fr_450px]={isOpen}
					>
						<!-- Patient Info Sidebar -->
						{#if patient}
							<div class="p-4 overflow-y-auto">
								<div class="card p-4 space-y-4">
									<h2 class="h2">Patient Information</h2>
									<div class="space-y-2">
										<p>
											<strong>Name:</strong>
											{patient.name[0].given.join(' ')}
											{patient.name[0].family}
										</p>
										<p><strong>DOB:</strong> {patient.birthDate}</p>
										<p><strong>Gender:</strong> {patient.gender}</p>
										{#if patient.address?.[0]}
											<p>
												<strong>Address:</strong><br />
												{patient.address[0].line.join(', ')}<br />
												{patient.address[0].city}, {patient.address[0].state}
												{patient.address[0].postalCode}<br />
												{patient.address[0].country}
											</p>
										{/if}
										{#if patient.communication?.[0]}
											<p><strong>Language:</strong> {patient.communication[0].language.text}</p>
										{/if}
									</div>
								</div>
							</div>
						{/if}

						<!-- Documents List -->
						<div class="p-4 overflow-y-auto">
							<div class="space-y-4">
								{#each filteredDocs as doc}
									<div class="card p-4">
										<details open={allExpanded}>
											<summary class="cursor-pointer">
												<div class="flex justify-between items-center">
													<div>
														<h3 class="h3">{doc.displayDate}</h3>
														<p class="text-sm opacity-75">By {doc.author}</p>
														{#if searchTerm && doc.searchContext}
															<p class="mt-2 text-sm opacity-75">
																{doc.searchContext}
															</p>
														{/if}
													</div>
													<span class="badge variant-filled">{doc.status}</span>
												</div>
											</summary>
											<div class="mt-4">
												{@html doc.formattedContent}
											</div>
										</details>
									</div>
								{/each}
							</div>
						</div>

						<!-- Chat Panel -->
						{#if isOpen}
							<ChatPanel {messages} {isLoading} onSubmit={handleChatSubmit} onClear={clearChat} />
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</Authenticated>
