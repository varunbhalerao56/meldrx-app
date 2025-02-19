<script lang="ts">
	import type { ConsultationPrepData } from '$lib/models/consultation';

	let { rawData } = $props<{ rawData: string }>();

	function parseConsultationPrepData(rawData: string): ConsultationPrepData | null {
		try {
			// First, try to parse the raw JSON string
			let parsed: ConsultationPrepData;

			if (typeof rawData === 'string') {
				parsed = JSON.parse(rawData);
			} else {
				parsed = rawData;
			}

			// Validate and ensure all required fields are present
			return {
				patientSummary: {
					name: parsed.patientSummary?.name || 'Unknown Patient',
					age: parsed.patientSummary?.age || 0,
					currentMedications: parsed.patientSummary?.currentMedications || [],
					ongoingConditions: parsed.patientSummary?.ongoingConditions || [],
					analyzedPeriod: parsed.patientSummary?.analyzedPeriod || 'Unknown period'
				},
				consultationQuestions:
					parsed.consultationQuestions?.map((category) => ({
						category: category.category || 'General Questions',
						questions:
							category.questions?.map((q) => ({
								question: q.question || 'N/A',
								rationale: q.rationale || 'No rationale provided',
								source: q.source || 'Unknown date'
							})) || []
					})) || [],
				preventiveCareNeeds:
					parsed.preventiveCareNeeds?.map((care) => ({
						type: care.type || 'Unknown',
						description: care.description || 'No description',
						dueDate: care.dueDate || 'Not specified',
						lastCompleted: care.lastCompleted || 'Unknown'
					})) || []
			};
		} catch (error) {
			console.error('Error parsing consultation prep data:', error);
			return null;
		}
	}

	// Process the raw data
	const processedData = $derived(parseConsultationPrepData(rawData));

	function getBadgeVariant(category: string): string {
		const variants: Record<string, string> = {
			'Medication Management': 'variant-filled-primary',
			'Pain Assessment': 'variant-filled-warning',
			'Mental Health Status': 'variant-filled-tertiary',
			'Preventive Care': 'variant-filled-success',
			'Social Determinants': 'variant-filled-surface',
			'Symptom Management': 'variant-filled-error',
			'Specialty Follow-up': 'variant-filled-secondary',
			'General Health Changes': 'variant-filled'
		};

		return variants[category] || 'variant-filled';
	}
</script>

{#if processedData}
	<div class="space-y-8">
		<!-- Patient Summary Section -->
		<!-- <section class="space-y-4">
			<div class="card p-4 variant-glass">
				<h3 class="h3 mb-4">Patient Summary</h3>
				<div class="flex flex-col gap-4">
					<div>
						{#if processedData.patientSummary.ongoingConditions.length > 0}
							<div class="mb-2">
								<span class="font-bold">Ongoing Conditions:</span>
								<div class="flex flex-wrap gap-1 mt-3">
									{#each processedData.patientSummary.ongoingConditions as condition}
										<span class="badge variant-soft">{condition}</span>
									{/each}
								</div>
							</div>
						{/if}
						{#if processedData.patientSummary.currentMedications.length > 0}
							<div>
								<span class="font-bold">Current Medications:</span>
								<div class="flex flex-wrap gap-1 mt-3">
									{#each processedData.patientSummary.currentMedications as medication}
										<span class="badge variant-ringed-primary">{medication}</span>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</section> -->

		<!-- Consultation Questions Section -->
		<section class="space-y-4">
			<h3 class="h3">Consultation Questions</h3>
			<div class="flex flex-col gap-4">
				{#each processedData.consultationQuestions as category}
					<div class="card p-4 variant-outline">
						<header class="flex flex-row justify-between items-center mb-4">
							<h4 class="h4">{category.category}</h4>
						</header>
						<div class="space-y-3">
							{#each category.questions as question}
								<div class="card p-3 variant-soft">
									<div class="flex flex-row justify-between">
										<p class="font-semibold">{question.question}</p>
										<span class="badge text-xs">{question.source}</span>
									</div>
									{#if question.rationale}
										<p class="text-sm mt-2 opacity-75">{question.rationale}</p>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Preventive Care Section -->
		{#if processedData.preventiveCareNeeds && processedData.preventiveCareNeeds.length > 0}
			<section class="space-y-4">
				<h3 class="h3">Preventive Care Needs</h3>
				<div class="card p-4 variant-outline">
					<div class="space-y-2">
						{#each processedData.preventiveCareNeeds as care}
							<div
								class="grid grid-cols-[1fr_auto] gap-2 py-2 border-b border-surface-300-600-token"
							>
								<div>
									<p class="font-bold">{care.type}</p>
									<p class="text-sm">{care.description}</p>
								</div>
								<div class="text-right">
									<span class="badge variant-filled-primary">{care.dueDate}</span>
									<p class="text-xs mt-1">Last: {care.lastCompleted}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</section>
		{/if}
	</div>
{:else}
	<div class="card p-4 variant-filled-error">
		<p>Error processing consultation preparation data. Please check the console for details.</p>
	</div>
{/if}
