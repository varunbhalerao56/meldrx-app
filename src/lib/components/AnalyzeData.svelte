<!-- src/lib/components/AnalysisDisplay.svelte -->
<script lang="ts">
	import type { AnalysisData } from '$lib/models/analysis';

	let { rawData } = $props<{ rawData: string }>();

	function parseAnalysisData(rawData: string): AnalysisData | null {
		try {
			// First, try to parse the raw JSON string
			let parsed: AnalysisData;

			if (typeof rawData === 'string') {
				parsed = JSON.parse(rawData);
			} else {
				parsed = rawData;
			}

			// Validate and ensure all required fields are present
			return {
				conditions:
					parsed.conditions?.map((c) => ({
						name: c.name || 'Unknown Condition',
						severityLevel: c.severityLevel || 'Moderate',
						reasonForSeverity: c.reasonForSeverity || 'No reason provided',
						timelineStart: c.timelineStart || 'Unknown',
						timelineEnd: c.timelineEnd || 'Present',
						riskFactors: c.riskFactors || [],
						healthImpact: c.healthImpact || 'No impact specified',
						progressionPattern: c.progressionPattern || 'Stable'
					})) || [],

				followUpCare:
					parsed.followUpCare?.map((f) => ({
						careName: f.careName || 'Unknown Care',
						reasonForFollowUp: f.reasonForFollowUp || 'No reason specified',
						recommendedFrequency: f.recommendedFrequency || 'Not specified',
						priorityLevel: f.priorityLevel || 'Medium',
						lastVisitDate: f.lastVisitDate || 'Unknown',
						nextDueDate: f.nextDueDate || 'Not scheduled',
						complianceStatus: f.complianceStatus || 'Partially Compliant'
					})) || [],

				treatmentPredictions:
					parsed.treatmentPredictions?.map((t) => ({
						conditionTreated: t.conditionTreated || 'Unknown Condition',
						expectedOutcome: t.expectedOutcome || 'Uncertain',
						patientAdherence: t.patientAdherence || 'Moderate',
						supportingEvidence: t.supportingEvidence || 'No evidence provided',
						confidenceLevel: t.confidenceLevel || 'Moderate',
						timeframe: t.timeframe || 'Not specified'
					})) || [],

				medicationAdherence:
					parsed.medicationAdherence?.map((m) => ({
						medicationName: m.medicationName || 'Unknown Medication',
						adherenceLevel: m.adherenceLevel || 'Moderate',
						startDate: m.startDate || 'Unknown',
						endDate: m.endDate || 'Current',
						sideEffectsReported: m.sideEffectsReported || [],
						renewalPattern: m.renewalPattern || 'Regular'
					})) || [],

				preventiveCare:
					parsed.preventiveCare?.map((p) => ({
						serviceName: p.serviceName || 'Unknown Service',
						recommendedFrequency: p.recommendedFrequency || 'Not specified',
						lastServiceDate: p.lastServiceDate || 'Unknown',
						complianceLevel: p.complianceLevel || 'Adequate',
						nextDueDate: p.nextDueDate || 'Not scheduled'
					})) || []
			};
		} catch (error) {
			console.error('Error parsing analysis data:', error);
			return null;
		}
	}

	// Process the raw data
	const processedData = $derived(parseAnalysisData(rawData));

	function getBadgeVariant(level: string): string {
		const variants: Record<string, string> = {
			// Severity Levels
			Mild: 'variant-filled-success',
			Moderate: 'variant-filled-warning',
			Severe: 'variant-filled-error',
			Resolved: 'variant-filled',

			// Priority Levels
			Low: 'variant-filled-success',
			Medium: 'variant-filled-warning',
			High: 'variant-filled-error',
			Urgent: 'variant-filled-error',

			// Outcome & Adherence
			Favorable: 'variant-filled-success',
			Guarded: 'variant-filled-warning',
			Poor: 'variant-filled-error',
			Uncertain: 'variant-filled-surface',

			// Compliance
			Compliant: 'variant-filled-success',
			'Partially Compliant': 'variant-filled-warning',
			'Non-compliant': 'variant-filled-error',

			// Prevention
			Optimal: 'variant-filled-success',
			Adequate: 'variant-filled-warning',
			Suboptimal: 'variant-filled-error'
		};

		return variants[level] || 'variant-filled';
	}

	// Add this function to generate confidence indicators
	function getConfidenceIndicator(level: string): string {
		const confidenceLevels: Record<string, { width: string; color: string }> = {
			High: { width: 'w-3/4', color: 'bg-success-500' },
			Moderate: { width: 'w-1/2', color: 'bg-warning-500' },
			Low: { width: 'w-1/4', color: 'bg-error-500' }
		};

		return level in confidenceLevels
			? `<div class="flex items-center gap-2 mt-1">
				<span class="text-xs">Confidence:</span>
				<div class="h-1.5 w-16 bg-surface-200-700-token rounded-full overflow-hidden">
					<div class="h-full ${confidenceLevels[level].color} ${confidenceLevels[level].width}"></div>
				</div>
			</div>`
			: '';
	}

	// Track which cards have their info panel open
	let visibleInfoPanels = $state<Record<string, boolean>>({});

	// Toggle info panel visibility
	function toggleInfoPanel(id: string): void {
		visibleInfoPanels[id] = !visibleInfoPanels[id];
	}
</script>

{#if processedData}
	<div class="space-y-8">
		<!-- Conditions Section -->
		{#if processedData.conditions.length > 0}
			<section class="space-y-4">
				<h3 class="h3">Medical Conditions</h3>
				<div class="flex flex-col gap-4">
					{#each processedData.conditions as condition, i}
						<div class="card p-4 variant-outline">
							<header class="flex flex-col gap-2">
								<div class="flex justify-between">
									<h4 class="h4">{condition.name}</h4>
									<button
										class="btn btn-sm variant-ghost-surface"
										onclick={() => toggleInfoPanel(`condition-${i}`)}
									>
										<span class="material-symbols-outlined text-sm">Info</span>
									</button>
								</div>
								<div class="flex flex-wrap gap-2">
									<span class="badge {getBadgeVariant(condition.severityLevel)}"
										>{condition.severityLevel}</span
									>
									<span class="badge {getBadgeVariant(condition.progressionPattern)}"
										>{condition.progressionPattern}</span
									>
								</div>
							</header>
							<hr class="my-2" />
							<div class="space-y-2">
								<p>
									<strong>Timeline:</strong>
									{condition.timelineStart} - {condition.timelineEnd}
								</p>
								<p>{condition.reasonForSeverity}</p>
								<p>{condition.healthImpact}</p>
							</div>

							<!-- Add this info panel -->
							{#if visibleInfoPanels[`condition-${i}`]}
								<div class="mt-3 p-2 bg-surface-100-800-token rounded text-sm">
									<p><strong>Source:</strong> Analysis based on clinical documentation.</p>
									<p><strong>Method:</strong> AI pattern recognition from patient records.</p>
									<p>
										<strong>Confidence Level:</strong>
										{condition.severityLevel === 'Mild'
											? 'High'
											: condition.severityLevel === 'Moderate'
												? 'Moderate'
												: 'Variable'}
									</p>
									<p class="text-xs italic mt-1">
										This assessment is meant to assist, not replace, clinical judgment.
									</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Treatment Predictions Section -->
		{#if processedData.treatmentPredictions.length > 0}
			<section class="space-y-4">
				<h3 class="h3">Treatment Predictions</h3>
				<div class="flex flex-col gap-4">
					{#each processedData.treatmentPredictions as treatment, i}
						<div class="card p-4 variant-outline">
							<header class="flex flex-col gap-2">
								<h4 class="h4">{treatment.conditionTreated}</h4>
								<div class="flex flex-wrap gap-2">
									<span class="badge {getBadgeVariant(treatment.expectedOutcome)}"
										>Expected Outcome: {treatment.expectedOutcome}</span
									>
									<!-- <span class="badge {getBadgeVariant(treatment.confidenceLevel)}"
										>Confidence: {treatment.confidenceLevel}</span
									> -->
								</div>
							</header>
							<hr class="my-2" />
							<div class="space-y-2">
								<p><strong>Timeframe:</strong> {treatment.timeframe}</p>
								<p>
									<strong>Adherence:</strong>
									<span class="badge {getBadgeVariant(treatment.patientAdherence)}"
										>{treatment.patientAdherence}</span
									>
								</p>
								<p>{treatment.supportingEvidence}</p>

								<!-- Add this line to include the confidence indicator -->
								{@html getConfidenceIndicator(treatment.confidenceLevel)}
							</div>

							<!-- Add info button and panel -->
							<div class="flex justify-end mt-2">
								<button
									class="btn btn-sm variant-ghost-surface"
									onclick={() => {
										toggleInfoPanel(`treatment-${i}`);
									}}
								>
									<span class="material-symbols-outlined text-sm">info</span>
								</button>
							</div>

							{#if visibleInfoPanels[`treatment-${i}`]}
								<div class="mt-3 p-2 bg-surface-100-800-token rounded text-sm">
									<p>
										<strong>Source:</strong> Treatment prediction based on clinical guidelines and patient
										history.
									</p>
									<p>
										<strong>Method:</strong> AI analysis of similar patient outcomes and treatment protocols.
									</p>
									<p>
										<strong>Confidence Level:</strong>
										{treatment.confidenceLevel || 'Moderate'}
									</p>
									<p class="text-xs italic mt-1">
										This prediction is meant to assist, not replace, clinical judgment.
									</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Follow-up Care Section -->
		{#if processedData.followUpCare.length > 0}
			<section class="space-y-4">
				<h3 class="h3">Follow-up Care</h3>
				<div class="flex flex-col gap-4">
					{#each processedData.followUpCare as care}
						<div class="card p-4 variant-outline">
							<header class="flex flex-wrap gap-2">
								<h4 class="h4">{care.careName}</h4>
								<div class="flex flex-wrap gap-2">
									<span class="badge {getBadgeVariant(care.priorityLevel)}"
										>Priority: {care.priorityLevel}</span
									>
									<span class="badge {getBadgeVariant(care.complianceStatus)}"
										>Compliance: {care.complianceStatus}</span
									>
								</div>
							</header>
							<hr class="my-2" />
							<div class="space-y-2">
								<p>{care.reasonForFollowUp}</p>
								<p><strong>Frequency:</strong> {care.recommendedFrequency}</p>
								<p><strong>Last Visit:</strong> {care.lastVisitDate}</p>
								<p><strong>Next Due:</strong> {care.nextDueDate}</p>
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Medication Adherence Section -->
		{#if processedData.medicationAdherence.length > 0}
			<section class="space-y-4">
				<h3 class="h3">Medication Adherence</h3>
				<div class="flex flex-col gap-4">
					{#each processedData.medicationAdherence as medication}
						<div class="card p-4 variant-outline">
							<header class="flex flex-col gap-2">
								<h4 class="h4">{medication.medicationName}</h4>
								<div class="flex flex-wrap gap-2">
									<span class="badge {getBadgeVariant(medication.adherenceLevel)}"
										>Adherence: {medication.adherenceLevel}</span
									>
									<span class="badge {getBadgeVariant(medication.renewalPattern)}"
										>{medication.renewalPattern}</span
									>
								</div>
							</header>
							<hr class="my-2" />
							<div class="space-y-2">
								<p><strong>Period:</strong> {medication.startDate} - {medication.endDate}</p>
								{#if medication.sideEffectsReported.length > 0}
									<div class="space-y-1">
										<p class="font-semibold">Side Effects:</p>
										<div class="flex flex-wrap gap-2">
											{#each medication.sideEffectsReported as effect}
												<span class="chip variant-filled-warning">{effect}</span>
											{/each}
										</div>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Preventive Care Section -->
		{#if processedData.preventiveCare.length > 0}
			<section class="space-y-4">
				<h3 class="h3">Preventive Care</h3>
				<div class="flex flex-col gap-4">
					{#each processedData.preventiveCare as care}
						<div class="card p-4 variant-outline">
							<header class="flex flex-col gap-2">
								<h4 class="h4">{care.serviceName}</h4>

								<div class="flex flex-wrap gap-2">
									<span class="badge {getBadgeVariant(care.complianceLevel)}"
										>Compliance: {care.complianceLevel}</span
									>
								</div>
							</header>
							<hr class="my-2" />
							<div class="space-y-2">
								<p><strong>Frequency:</strong> {care.recommendedFrequency}</p>
								<p><strong>Last Service:</strong> {care.lastServiceDate}</p>
								<p><strong>Next Due:</strong> {care.nextDueDate}</p>
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}
	</div>
{:else}
	<div class="card p-4 variant-filled-error">
		<p>Error processing analysis data. Please check the console for details.</p>
	</div>
{/if}
