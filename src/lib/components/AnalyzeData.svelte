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
</script>

{#if processedData}
	<div class="space-y-8">
		<!-- Conditions Section -->
		{#if processedData.conditions.length > 0}
			<section class="space-y-4">
				<h3 class="h3">Medical Conditions</h3>
				<div class="flex flex-col gap-4">
					{#each processedData.conditions as condition}
						<div class="card p-4 variant-outline">
							<header class="flex flex-col gap-2">
								<h4 class="h4">{condition.name}</h4>
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
					{#each processedData.treatmentPredictions as treatment}
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
							</div>
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
