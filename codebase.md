# .gitignore

```
node_modules

# Output
.output
.vercel
.netlify
.wrangler
/.svelte-kit
/build

# OS
.DS_Store
Thumbs.db

# Env
.env
.env.*
!.env.example
!.env.test

# Vite
vite.config.js.timestamp-*
vite.config.ts.timestamp-*

```

# .npmrc

```
engine-strict=true

```

# .prettierignore

```
# Package Managers
package-lock.json
pnpm-lock.yaml
yarn.lock

```

# .prettierrc

```
{
	"useTabs": true,
	"singleQuote": true,
	"trailingComma": "none",
	"printWidth": 100,
	"plugins": ["prettier-plugin-svelte"],
	"overrides": [
		{
			"files": "*.svelte",
			"options": {
				"parser": "svelte"
			}
		}
	]
}

```

# package.json

```json
{
	"name": "meldrx-app",
	"private": true,
	"version": "0.0.1",
	"type": "module",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"prepare": "svelte-kit sync || echo ''",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
		"format": "prettier --write .",
		"lint": "prettier --check ."
	},
	"devDependencies": {
		"@skeletonlabs/skeleton": "^2.11.0",
		"@skeletonlabs/tw-plugin": "^0.4.1",
		"@sveltejs/adapter-auto": "^4.0.0",
		"@sveltejs/kit": "^2.16.0",
		"@sveltejs/vite-plugin-svelte": "^5.0.0",
		"autoprefixer": "10.4.20",
		"postcss": "8.5.2",
		"prettier": "^3.4.2",
		"prettier-plugin-svelte": "^3.3.3",
		"svelte": "^5.0.0",
		"svelte-check": "^4.0.0",
		"tailwindcss": "^3.4.17",
		"typescript": "^5.0.0",
		"vite": "^6.0.0"
	},
	"dependencies": {
		"ai-digest": "^1.0.8",
		"fhirclient": "^2.5.4"
	}
}

```

# postcss.config.cjs

```cjs
module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	},
}
```

# README.md

```md
# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

\`\`\`bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
\`\`\`

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

\`\`\`bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
\`\`\`

## Building

To create a production version of your app:

\`\`\`bash
npm run build
\`\`\`

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

```

# src/app.d.ts

```ts
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

```

# src/app.html

```html
<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<link rel="icon" href="%sveltekit.assets%/favicon.png" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	%sveltekit.head%
</head>



<body data-sveltekit-preload-data="hover" data-theme="skeleton">
	<div style="display: contents">%sveltekit.body%</div>
</body>

</html>
```

# src/app.postcss

```postcss
@tailwind base;
@tailwind components;
@tailwind utilities;
@tailwind variants;
```

# src/lib/components/Authenticated.svelte

```svelte
<script lang="ts">
	type Link = {
		text: string;
		to: string;
	};

	// const links: Link[] = [
	// 	{ text: 'patient information', to: '/me' },
	// 	{ text: 'observations', to: '/observations' },
	// 	{ text: 'token', to: '/token' }
	// ];
</script>

<div>
	<div>
		<!-- {#each links as link}
			<a href={link.to} style="margin-left: 1rem; font-size: 2rem;">{link.text}</a>
		{/each} -->
	</div>
	<slot />
</div>

```

# src/lib/components/ChatPanel.svelte

```svelte
<script lang="ts">
	import type { ChatMessage } from '$lib/services/openrouter';

	let { messages, isLoading, onSubmit, onClear } = $props<{
		messages: ChatMessage[];
		isLoading: boolean;
		onSubmit: (message: string) => void;
		onClear: () => void;
	}>();

	let currentMessage = $state('');

	function handleSubmit(event: Event) {
		event.preventDefault();
		if (!currentMessage.trim() || isLoading) return;

		onSubmit(currentMessage);
		currentMessage = '';
	}
</script>

<div class="p-4 overflow-y-auto">
	<div class="card p-4 space-y-4">
		<div class="flex justify-between items-center">
			<h3 class="h3">AI Assistant</h3>
			<button class="btn btn-sm variant-soft" onclick={onClear}>Clear</button>
		</div>

		<!-- Chat messages -->
		<div class="space-y-2 h-[calc(100vh-385px)] overflow-y-auto">
			{#each messages as message}
				<div class="card p-3 {message.role === 'user' ? 'variant-soft' : 'variant-filled'}">
					<p class="whitespace-pre-wrap">{message.content}</p>
				</div>
			{/each}
			{#if isLoading}
				<div class="flex justify-center">
					<div class="spinner-dual-ring"></div>
				</div>
			{/if}
		</div>

		<!-- Chat input -->
		<form class="flex flex-col gap-2" onsubmit={handleSubmit}>
			<textarea
				bind:value={currentMessage}
				placeholder="Ask about the medical decisions..."
				class="textarea p-2"
				rows="4"
				disabled={isLoading}
			>
			</textarea>

			<button type="submit" class="btn variant-filled" disabled={isLoading}> Send </button>
		</form>
	</div>
</div>

<style>
	.spinner-dual-ring {
		width: 24px;
		height: 24px;
		border: 3px solid #919191;
		border-radius: 50%;
		border-top-color: transparent;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>

```

# src/lib/services/openrouter.ts

```ts
export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export class OpenRouterClient {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://openrouter.ai/api/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  getPromptMessage(clinicalNotes: string): string {
    return `# Clinical Notes Analysis Prompt

      Analyze the provided clinical notes and generate a comprehensive JSON report following the structure and definitions below:

      ## Analysis Requirements

      ### Clinical Notes
      ${clinicalNotes}

      ### Output Formatjson
      {
        "conditions": [
          {
            "name": "string",                // Name of the medical condition
            "severityLevel": "string",       // Values: ["Mild", "Moderate", "Severe", "Resolved"]
            "reasonForSeverity": "string",   // Explanation for severity assessment
            "timelineStart": "date",         // First mention/diagnosis date
            "timelineEnd": "date",           // Last mention or "present"
            "documentSources": ["string"],   // List of document IDs where condition is mentioned
            "riskFactors": ["string"],       // Associated risk factors
            "healthImpact": "string",        // Impact on patient's health
            "progressionPattern": "string"   // Values: ["Improving", "Stable", "Worsening", "Resolved"]
          }
        ],
        "followUpCare": [
          {
            "careName": "string",            // Name of recommended follow-up
            "reasonForFollowUp": "string",   // Why this follow-up is needed
            "recommendedFrequency": "string", // How often follow-up should occur
            "priorityLevel": "string",       // Values: ["Low", "Medium", "High", "Urgent"]
            "lastVisitDate": "date",         // Date of last related visit
            "nextDueDate": "date",           // When next follow-up is due
            "documentSources": ["string"],   // List of document IDs mentioning this follow-up
            "complianceStatus": "string"     // Values: ["Compliant", "Partially Compliant", "Non-compliant"]
          }
        ],
        "treatmentPredictions": [
          {
            "conditionTreated": "string",    // Condition being treated
            "expectedOutcome": "string",     // Values: ["Favorable", "Guarded", "Poor", "Uncertain"]
            "patientAdherence": "string",    // Values: ["High", "Moderate", "Low"]
            "documentSources": ["string"],   // Supporting documentation IDs
            "supportingEvidence": "string",  // Evidence for prediction
            "confidenceLevel": "string",     // Values: ["High", "Moderate", "Low"]
            "timeframe": "string"            // Expected timeframe for outcome
          }
        ],
        "medicationAdherence": [
          {
            "medicationName": "string",      // Name and dosage of medication
            "adherenceLevel": "string",      // Values: ["High", "Moderate", "Low"]
            "startDate": "date",             // When medication was started
            "endDate": "date",               // When medication ended or "current"
            "sideEffectsReported": ["string"], // Any reported side effects
            "renewalPattern": "string",      // Values: ["Regular", "Irregular", "Discontinued"]
            "documentSources": ["string"]    // Supporting documentation IDs
          }
        ],
        "preventiveCare": [
          {
            "serviceName": "string",         // Name of preventive service
            "recommendedFrequency": "string", // How often service should occur
            "lastServiceDate": "date",       // Date of last service
            "complianceLevel": "string",     // Values: ["Optimal", "Adequate", "Suboptimal"]
            "nextDueDate": "date",           // When next service is due
            "documentSources": ["string"]    // Supporting documentation IDs
          }
        ],
        "socialFactors": {
          "educationLevel": "string",        // Highest education achieved
          "insuranceStatus": "string",       // Current insurance coverage
          "employmentStatus": "string",      // Values: ["Employed", "Unemployed", "Retired", "Disabled"]
          "supportNetwork": ["string"],      // Available support systems
          "careBarriers": ["string"],        // Identified barriers to care
          "documentSources": ["string"]      // Supporting documentation IDs
        }
      }

      ## Scale Definitions

      ### Severity Levels
      - Mild: Minimal impact on daily life, easily managed
      - Moderate: Notable impact on daily life, requires regular management
      - Severe: Significant impact on daily life, requires intensive management
      - Resolved: Condition no longer active

      ### Priority Levels
      - Low: Routine follow-up acceptable
      - Medium: Should be addressed within normal timeframes
      - High: Requires close monitoring
      - Urgent: Immediate attention needed

      ### Outcome Expectations
      - Favorable: High likelihood of positive outcome
      - Guarded: Uncertain but leaning positive
      - Poor: High likelihood of negative outcome
      - Uncertain: Insufficient data to predict

      ### Adherence/Compliance Levels
      - High: >90% compliance with treatment plan
      - Moderate: 60-90% compliance
      - Low: <60% compliance

      ### Confidence Levels
      - High: Strong evidence supporting assessment
      - Moderate: Some evidence with some uncertainty
      - Low: Limited evidence or significant uncertainty

      ## Analysis Guidelines

      1. Base all assessments on explicit evidence from the clinical notes
      2. Include specific document IDs and dates for all sources
      3. Note any conflicting information or uncertainties
      4. Consider temporal patterns and trends
      5. Account for social and environmental factors
      6. Document any gaps in information that affect confidence levels

      ## Required Analyses

      For each section, provide:
      1. Comprehensive review of all relevant documentation
      2. Temporal analysis of patterns and trends
      3. Evidence-based assessment using provided scales
      4. Clear documentation of sources and reasoning
      5. Identification of any information gaps
      6. Assessment of confidence in conclusions

      The output should be properly formatted JSON suitable for programmatic processing and UI display.`;
  }

  async streamChat(messages: ChatMessage[], onChunk: (chunk: string) => void): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Medical Notes Analysis'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-sonnet', // Updated model ID
          messages: messages,
          stream: true,
          temperature: 1,
          max_tokens: 100000
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenRouter API Error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content;
              if (content) onChunk(content);
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
      throw error;
    }
  }
}

```

# src/routes/+layout.svelte

```svelte
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import '../app.postcss';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

{@render children()}

```

# src/routes/+page.svelte

```svelte
<script lang="ts">
	import FHIR from 'fhirclient';
	import { env } from '$env/dynamic/public';

	function login(): void {
		FHIR.oauth2.authorize({
			clientId: env.PUBLIC_MELDRX_CLIENT_ID,
			scope: 'openid profile fhirUser patient/*.read launch launch/patient',
			redirectUri: `${env.PUBLIC_APP_BASE_URL}/login-callback`,
			iss: env.PUBLIC_MELDRX_WORKSPACE_URL
		});
	}
</script>

<div class="flex min-h-screen items-center justify-center p-4">
	<div class="card p-8 space-y-8 w-full max-w-2xl">
		<div class="text-center space-y-4">
			<h1 class="h1">Your Medical History Explorer</h1>
			<p class="text-lg">
				Find out why certain choices were made for your patients by logging into your EHR system and
				using our FHIR compliant tool
			</p>
		</div>

		<div class="flex justify-center">
			<button type="button" class="btn variant-filled-primary text-lg py-3 px-6" onclick={login}>
				Login to retrieve your patients
			</button>
		</div>
	</div>
</div>

```

# src/routes/login-callback/+page.svelte

```svelte
<script lang="ts">
	import FHIR from 'fhirclient';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	let ready = $state(false);

	$effect(() => {
		if (browser) {
			FHIR.oauth2
				.ready()
				.then((client) => {
					ready = true;
					goto('/me', { replaceState: true });
				})
				.catch((error) => {
					console.error('OAuth2 error:', error);
					ready = false;
				});
		}
	});
</script>

{#if ready}
	OAuth2 Ready - Redirecting...
{:else}
	Processing OAuth2...
{/if}

```

# src/routes/me/+page.svelte

```svelte
<script lang="ts">
	import FHIR from 'fhirclient';
	import { browser } from '$app/environment';
	import Authenticated from '$lib/components/Authenticated.svelte';
	import ChatDrawer from '$lib/components/ChatPanel.svelte';
	import { OpenRouterClient, type ChatMessage } from '$lib/services/openrouter';
	import ChatPanel from '$lib/components/ChatPanel.svelte';
	import { env } from '$env/dynamic/public';

	// State management with runes (updated)
	let patient = $state<Patient | null>(null);
	let documents = $state<ProcessedDocument[]>([]);
	let loading = $state(true);
	let searchTerm = $state('');
	let allExpanded = $state(false);
	let isOpen = $state(false);
	let messages = $state<ChatMessage[]>([]);
	let isLoading = $state(false);

	const client = new OpenRouterClient(env.PUBLIC_OPEN_ROUTER);

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

```

# src/routes/observations/+page.svelte

```svelte
<script lang="ts">
	import FHIR from 'fhirclient';
	import Authenticated from '$lib/components/Authenticated.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	type ObservationComponent = {
		code: {
			text: string;
		};
		valueQuantity: {
			value: number;
			unit: string;
		};
	};

	type Observation = {
		resourceType: string;
		code: {
			text: string;
		};
		effectiveDateTime?: string;
		valueCodeableConcept?: {
			text: string;
		};
		valueQuantity?: {
			value: number;
			unit: string;
		};
		component?: ObservationComponent[];
	};

	type BundleEntry = {
		resource: {
			resourceType: string;
			entry?: BundleEntry[];
		} & Partial<Observation>;
	};

	type Bundle = {
		entry?: BundleEntry[];
	};

	const categories = [
		'social-history',
		'vital-signs',
		'imaging',
		'laboratory',
		'procedure',
		'survey',
		'exam',
		'therapy',
		'activity'
	];

	let loading = $state(false);
	let category = $state(categories[0]);
	let observations = $state<Observation[] | null>(null);
	let lastCategory = categories[0]; // Track last category

	async function loadObservations() {
		if (loading) return;
		loading = true;
		observations = null;

		try {
			const client = await FHIR.oauth2.ready();
			const patientId = client.getPatientId();
			const bundle = await client.request<Bundle>(
				`Observation?subject=${encodeURIComponent('Patient/' + patientId)}&category=${category}`
			);

			// 	`Observation?subject=${encodeURIComponent('Patient/' + patientId)}&category=${category}`

			console.log(bundle);

			if (!bundle.entry) return;

			if (bundle.entry.every((x) => x?.resource?.resourceType === 'Bundle')) {
				observations = bundle.entry
					.map((x) => ('entry' in x.resource ? x.resource.entry || [] : []))
					.flat()
					.map((x) => x?.resource)
					.filter((x): x is Observation => x?.resourceType === 'Observation' && x !== undefined);
			} else {
				observations = bundle.entry
					.map((x) => x?.resource)
					.filter((x): x is Observation => x?.resourceType === 'Observation' && x !== undefined);
			}
		} finally {
			loading = false;
		}
	}

	function handleCategoryChange() {
		if (category !== lastCategory) {
			lastCategory = category;
			loadObservations();
		}
	}

	onMount(() => {
		if (browser) {
			loadObservations();
		}
	});

	$effect(() => {
		if (browser) {
			handleCategoryChange();
		}
	});
</script>

<Authenticated>
	<h1>Patient Observations</h1>

	<select bind:value={category}>
		{#each categories as cat}
			<option value={cat}>{cat}</option>
		{/each}
	</select>

	{#if loading}
		<div>Loading...</div>
	{/if}

	{#if observations}
		<ul>
			{#each observations as ob}
				<li>
					{#if ob.valueCodeableConcept}
						{ob.code.text} - {ob.valueCodeableConcept.text}
					{:else if ob.component}
						[{ob.effectiveDateTime}] - {ob.code.text}
						<ul>
							{#each ob.component as comp}
								<li>
									{comp.code.text} - {comp.valueQuantity.value}({comp.valueQuantity.unit})
								</li>
							{/each}
						</ul>
					{:else if ob.valueQuantity}
						[{ob.effectiveDateTime}] {ob.code.text} - {ob.valueQuantity.value}({ob.valueQuantity
							.unit})
					{:else}
						{ob.code.text}
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</Authenticated>

```

# src/routes/token/+page.svelte

```svelte
<script lang="ts">
	import FHIR from 'fhirclient';

	import Authenticated from '$lib/components/Authenticated.svelte';

	let token = $state<string | null>(null);

	$effect(() => {
		FHIR.oauth2.ready().then((client) => {
			if (!client) return;
			const authHeader = client.getAuthorizationHeader();
			if (authHeader) {
				token = authHeader.split(' ')[1];
			}
		});
	});
</script>

<Authenticated>
	<h1>Token</h1>

	{#if token}
		<code>{token}</code>
	{:else}
		<div>Loading...</div>
	{/if}
</Authenticated>

```

# static/favicon.png

This is a binary file of the type: Image

# svelte.config.js

```js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;

```

# tailwind.config.ts

```ts
import { join } from 'path'
import type { Config } from 'tailwindcss'
import { skeleton } from '@skeletonlabs/tw-plugin'

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {},
	},
	plugins: [
		skeleton({
			themes: {
				preset: [
					{
						name: 'skeleton',
						enhancements: true,
					},
				],
			},
		}),
	],
} satisfies Config;

```

# tsconfig.json

```json
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true,
		"moduleResolution": "bundler"
	}
	// Path aliases are handled by https://svelte.dev/docs/kit/configuration#alias
	// except $lib which is handled by https://svelte.dev/docs/kit/configuration#files
	//
	// If you want to overwrite includes/excludes, make sure to copy over the relevant includes/excludes
	// from the referenced tsconfig.json - TypeScript does not merge them in
}
```

# vite.config.ts

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()]
});

```

