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

# src/lib/components/AnalyzeData.svelte

```svelte
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

```

# src/lib/components/AnalyzePanel.svelte

```svelte
<script lang="ts">
	import type { ChatMessage } from '$lib/services/openrouter';
	import AnalyzeData from './AnalyzeData.svelte';
	import ConsultationPrep from './ConsultationPrep.svelte';

	let { messages, rawData, isLoading, onClear, type } = $props<{
		messages: ChatMessage[];
		rawData: string;
		isLoading: boolean;
		onClear: () => void;
		type: string;
	}>();

	let currentMessage = $state('');
</script>

<div class="p-4 overflow-y-auto">
	<div class="card p-4 space-y-4">
		<div class="flex justify-end items-center">
			<button class="btn btn-sm variant-soft" onclick={onClear}>Close</button>
		</div>

		<!-- Raw Data -->
		<div class="space-y-2 h-[calc(100vh-205px)] overflow-y-auto">
			{#if isLoading == false && type == 'analyze'}
				<AnalyzeData {rawData} />
			{/if}

			{#if isLoading == false && type == 'prep'}
				<ConsultationPrep {rawData} />
			{/if}

			{#if isLoading}
				<div class="flex flex-col justify-center items-center">
					<div class="spinner-dual-ring mt-5 mb-3"></div>
					<div>Analyzing patient notes</div>
				</div>
			{/if}
		</div>
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

# src/lib/components/ConsultationPrep.svelte

```svelte
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

```

# src/lib/models/analysis.ts

```ts
// src/lib/types/analysis.ts

export type Condition = {
    name: string;
    severityLevel: 'Mild' | 'Moderate' | 'Severe' | 'Resolved';
    reasonForSeverity: string;
    timelineStart: string;
    timelineEnd: string;
    riskFactors: string[];
    healthImpact: string;
    progressionPattern: 'Improving' | 'Stable' | 'Worsening' | 'Resolved';
};

export type FollowUpCare = {
    careName: string;
    reasonForFollowUp: string;
    recommendedFrequency: string;
    priorityLevel: 'Low' | 'Medium' | 'High' | 'Urgent';
    lastVisitDate: string;
    nextDueDate: string;
    complianceStatus: 'Compliant' | 'Partially Compliant' | 'Non-compliant';
};

export type TreatmentPrediction = {
    conditionTreated: string;
    expectedOutcome: 'Favorable' | 'Guarded' | 'Poor' | 'Uncertain';
    patientAdherence: 'High' | 'Moderate' | 'Low';
    supportingEvidence: string;
    confidenceLevel: 'High' | 'Moderate' | 'Low';
    timeframe: string;
};

export type MedicationAdherence = {
    medicationName: string;
    adherenceLevel: 'High' | 'Moderate' | 'Low';
    startDate: string;
    endDate: string;
    sideEffectsReported: string[];
    renewalPattern: 'Regular' | 'Irregular' | 'Discontinued';
};

export type PreventiveCare = {
    serviceName: string;
    recommendedFrequency: string;
    lastServiceDate: string;
    complianceLevel: 'Optimal' | 'Adequate' | 'Suboptimal';
    nextDueDate: string;
};

export type AnalysisData = {
    conditions: Condition[];
    followUpCare: FollowUpCare[];
    treatmentPredictions: TreatmentPrediction[];
    medicationAdherence: MedicationAdherence[];
    preventiveCare: PreventiveCare[];
};
```

# src/lib/models/consultation.ts

```ts
// src/lib/models/consultationPrep.ts

export type PatientSummary = {
    name: string;
    age: number;
    currentMedications: string[];
    ongoingConditions: string[];
    analyzedPeriod: string;
};

export type ConsultationQuestion = {
    question: string;
    rationale: string;
    source: string;
};

export type QuestionCategory = {
    category: string;
    questions: ConsultationQuestion[];
};

export type PreventiveCareNeed = {
    type: string;
    description: string;
    dueDate: string;
    lastCompleted: string;
};

export type ConsultationPrepData = {
    patientSummary: PatientSummary;
    consultationQuestions: QuestionCategory[];
    preventiveCareNeeds: PreventiveCareNeed[];
};
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

  getConsultationPrepPrompt(clinicalNotes: string): string {
    return `
    SYSTEM: YOU ARE AN ASSISTANT THAT ONLY SPEAKS JSON. DO NOT WRITE NORMAL TEXT.

    # Consultation Preparation Assistant

    Analyze the provided clinical notes and generate a focused set of questions to help a physician prepare for the upcoming consultation. Follow these specific guidelines:

    ## Analysis Requirements

    ### Clinical Notes
    ${clinicalNotes}
    
    ### Rules
    1. Only consider records from the last 3 years based on the most recent record date
    2. Do not include questions about conditions that appear to be cured or resolved
    3. Focus on ongoing management, medication adherence, and follow-up needs
    4. Keep questions concise and direct (avoid phrases like "I see" or "I notice")
    5. Include the source date for each question
    
    ### Output Format Json
    {
      "patientSummary": {
        "name": "string",
        "age": "number",
        "currentMedications": ["string"],
        "ongoingConditions": ["string"],
        "analyzedPeriod": "string"
      },
      "consultationQuestions": [
        {
          "category": "string",          // e.g., "Medication Management", "Mental Health", etc.
          "questions": [
            {
              "question": "string",      // Short, direct question
              "rationale": "string",     // Brief explanation of relevance
              "source": "string"         // Date of relevant record
            }
          ]
        }
      ],
      "preventiveCareNeeds": [
        {
          "type": "string",              // e.g., "Immunization", "Screening"
          "description": "string",
          "dueDate": "string",
          "lastCompleted": "string"
        }
      ]
    }

    ## Question Categories
    Generate questions in these categories as relevant:
    1. Medication Management
    2. Pain Assessment
    3. Mental Health Status
    4. Preventive Care
    5. Social Determinants
    6. Symptom Management
    7. Specialty Follow-up
    8. General Health Changes

    ## Analysis Guidelines
    1. Determine the 3-year timeframe from most recent record
    2. Identify active medications and related questions
    3. Note ongoing conditions requiring follow-up
    4. Include recent assessments needing follow-up
    5. Keep questions concise and specific
    6. Reference source record date for each question
    7. Focus only on relevant, actionable information
    8. Prioritize questions based on clinical importance

    The output should be properly formatted JSON suitable for programmatic processing. Do not include any explanatory text outside the JSON structure.
    `;
  }

  getPromptMessage(clinicalNotes: string): string {
    return `

      SYSTEM: YOU ARE AN ASSISTANT THAT ONLY SPEAKS JSON. DO NOT WRITE NORMAL TEXT.

      # Clinical Notes Analysis Prompt

      Analyze the provided clinical notes and generate a comprehensive JSON report following the structure and definitions below:

      ## Analysis Requirements

      ### Clinical Notes
      ${clinicalNotes}
      
      ### Output Format Json
      {
        "conditions": [                      // List of medical conditions, do not include duplicates of the same conditions and like employment or medication reviews
          {
            "name": "string",                // Name of the medical condition
            "severityLevel": "string",       // Values: ["Mild", "Moderate", "Severe", "Resolved"]
            "reasonForSeverity": "string",   // Explanation for severity assessment
            "timelineStart": "date",         // First mention/diagnosis date
            "timelineEnd": "date",           // Last mention or "present"
            "riskFactors": ["string"],       // Associated risk factors
            "healthImpact": "string",        // Impact on patient's health
            "progressionPattern": "string"   // Values: ["Improving", "Stable", "Worsening", "Resolved"]
          }
        ],
        "followUpCare": [                   // Recommended follow-up care list, do not include duplicates
          {
            "careName": "string",            // Name of recommended follow-up
            "reasonForFollowUp": "string",   // Why this follow-up is needed
            "recommendedFrequency": "string", // How often follow-up should occur
            "priorityLevel": "string",       // Values: ["Low", "Medium", "High", "Urgent"]
            "lastVisitDate": "date",         // Date of last related visit
            "nextDueDate": "date",           // When next follow-up is due
            "complianceStatus": "string"     // Values: ["Compliant", "Partially Compliant", "Non-compliant"]
          }
        ],
        "treatmentPredictions": [            // List of treatment predictions, do not include duplicates
          {
            "conditionTreated": "string",    // Condition being treated
            "expectedOutcome": "string",     // Values: ["Favorable", "Guarded", "Poor", "Uncertain"]
            "patientAdherence": "string",    // Values: ["High", "Moderate", "Low"]
            "supportingEvidence": "string",  // Evidence for prediction
            "confidenceLevel": "string",     // Values: ["High", "Moderate", "Low"]
            "timeframe": "string"            // Expected timeframe for outcome
          }
        ],
        "medicationAdherence": [              // List of medication adherence records
          {
            "medicationName": "string",      // Name and dosage of medication
            "adherenceLevel": "string",      // Values: ["High", "Moderate", "Low"]
            "startDate": "date",             // When medication was started
            "endDate": "date",               // When medication ended or "current"
            "sideEffectsReported": ["string"], // Any reported side effects
            "renewalPattern": "string",      // Values: ["Regular", "Irregular", "Discontinued"]
          }
        ],
        "preventiveCare": [                  // List of preventive care services
          {
            "serviceName": "string",         // Name of preventive service
            "recommendedFrequency": "string", // How often service should occur
            "lastServiceDate": "date",       // Date of last service
            "complianceLevel": "string",     // Values: ["Optimal", "Adequate", "Suboptimal"]
            "nextDueDate": "date",           // When next service is due
          }
        ],
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

      1. Base all assessments on explicit evidence from the clinical notes d
      2. Include specific document IDs and dates for all sources
      3. Note any conflicting information or uncertainties
      4. Consider temporal patterns and trends
      5. Account for social and environmental factors
      6. Document any gaps in information that affect confidence levels
      7. Do not repeat the same condition / follow-up care / treatment predictions in the list unless there are distinct aspects to discuss

      ## Required Analyses

      For each section, provide:
      1. Comprehensive review of all relevant documentation
      2. Temporal analysis of patterns and trends
      3. Evidence-based assessment using provided scales
      4. Clear documentation of sources and reasoning
      5. Identification of any information gaps
      6. Assessment of confidence in conclusions

      The output should be properly formatted JSON suitable for programmatic processing and UI display.
      `;
  }

  async chat(messages: ChatMessage[]): Promise<string> {
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
          model: 'anthropic/claude-3-sonnet',
          messages: messages,
          stream: false,
          temperature: 1,
          max_tokens: 100000
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenRouter API Error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.error(data);

      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
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

<div class="container mx-auto min-h-screen flex flex-col items-center justify-center p-4">
	<div class="card p-8 w-full max-w-2xl">
		<header class="text-center mb-10">
			<h1 class="h1 mb-4">Welcome to Orama</h1>
			<p class="text-lg">
				Find out why certain choices were made for your patients by logging into your EHR system and
				using our FHIR compliant tool
			</p>
		</header>

		<div class="flex justify-center">
			<button type="button" class="btn variant-filled-primary text-lg py-3 px-6" onclick={login}>
				Login to retrieve your patients
			</button>
		</div>
	</div>

	<footer class="mt-5 text-center text-sm opacity-75">
		<a href="/privacy-policy" class="btn">
			<span class="material-symbols-outlined"></span>
			<span>Privacy Policy</span>
		</a>
		<a href="/terms-and-conditions" class="btn">
			<span class="material-symbols-outlined"></span>
			<span>Terms & Conditions</span>
		</a>
		<p class="mt-2">© 2025 Orama. All rights reserved.</p>
	</footer>
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
	import AnalyzePanel from '$lib/components/AnalyzePanel.svelte';
	import { goto } from '$app/navigation';

	// State management with runes
	let patient = $state<Patient | null>(null);
	let documents = $state<ProcessedDocument[]>([]);
	let loading = $state(true);
	let searchTerm = $state('');
	let allExpanded = $state(false);
	let isOpen = $state(false);
	let messages = $state<ChatMessage[]>([]);
	let isLoading = $state(false);
	let rawData = $state('');

	let type = $state('');

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

	async function logout() {
		if (browser) {
			try {
				window.location.href = '/';
			} catch (error) {
				console.error('Logout error:', error);
			}
		}
	}

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

	async function analyzeRecords() {
		clearSidebarData();

		type = 'analyze';
		if (isLoading) return;
		isLoading = true;

		let docs = documents
			.map((doc, index) => {
				return `Document ${index + 1}:\n${JSON.stringify(doc, null, 2)}`;
			})
			.join('\n\n');

		try {
			const promptMessage = client.getPromptMessage(docs);
			const analysis = await client.chat([
				{
					role: 'system',
					content: promptMessage
				}
			]);

			console.info(analysis);

			// Save raw analysis data
			rawData = analysis;

			// Add the analysis to messages
			messages = [...messages, { role: 'assistant', content: analysis }];
		} catch (error) {
			console.error('Analysis error:', error);
		} finally {
			isLoading = false;
		}
	}

	async function consultationPrep() {
		clearSidebarData();

		type = 'prep';
		if (isLoading) return;
		isLoading = true;

		let docs = documents
			.map((doc, index) => {
				return `Document ${index + 1}:\n${JSON.stringify(doc, null, 2)}`;
			})
			.join('\n\n');

		console.info(docs);

		try {
			const promptMessage = client.getConsultationPrepPrompt(docs);
			const analysis = await client.chat([
				{
					role: 'system',
					content: promptMessage
				}
			]);

			console.info(analysis);

			// Save raw analysis data
			rawData = analysis;

			// Add the analysis to messages
			messages = [...messages, { role: 'assistant', content: analysis }];
		} catch (error) {
			console.error('Analysis error:', error);
		} finally {
			isLoading = false;
		}
	}

	function closeAndClear() {
		rawData = '';
		messages = [];
		isOpen = false;
	}

	function clearSidebarData() {
		rawData = '';
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
							onclick={async () => {
								isOpen = true;
								rawData = '';
								type = 'prep';
								await consultationPrep();
							}}
						>
							Consultation Prep
						</button>
						<button
							class="btn variant-filled-secondary h-full px-8"
							class:variant-filled-primary={isOpen}
							onclick={async () => {
								isOpen = true;
								rawData = '';
								type = 'analyze';
								await analyzeRecords();
							}}
						>
							Analyze Records
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
						class:grid-cols-[300px_1fr_500px]={isOpen}
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

								<button
									class="btn w-full mt-5"
									onclick={async () => {
										await logout();
									}}
								>
									Logout
								</button>
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
							<AnalyzePanel {messages} {rawData} {isLoading} onClear={closeAndClear} {type} />
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</Authenticated>

```

# src/routes/privacy-policy/+page.svelte

```svelte
<script lang="ts">
	// The TOC (table of contents) list for navigation
	const sections = [
		{ id: 'introduction', title: '1. Introduction' },
		{ id: 'information-we-collect', title: '2. Information We Collect' },
		{ id: 'how-we-use', title: '3. How We Use Your Information' },
		{ id: 'legal-basis', title: '4. Legal Basis for Processing' },
		{ id: 'how-we-share', title: '5. How We Share Your Information' },
		{ id: 'data-retention', title: '6. Data Retention' },
		{ id: 'data-security', title: '7. Data Security' },
		{ id: 'international-transfers', title: '8. International Data Transfers' },
		{ id: 'your-rights', title: '9. Your Rights' },
		{ id: 'childrens-privacy', title: "10. Children's Privacy" },
		{ id: 'changes', title: '11. Changes to This Privacy Policy' }
	];
</script>

<div class="container mx-auto max-w-[1400px] py-8 px-4">
	<div class="card p-4 md:p-10 mb-4">
		<header class="space-y-2 mb-10 text-center">
			<h1 class="h1">Orama Privacy Policy</h1>
			<p class="text-lg opacity-75">Effective Date: February 20, 2025</p>
		</header>

		<!-- Table of Contents - visible on larger screens, fixed position -->
		<div class="hidden lg:block fixed right-8 top-32 w-64 card p-4 max-h-[80vh] overflow-y-auto">
			<h3 class="h3 mb-4">Contents</h3>
			<nav>
				<ul class="list-none space-y-2">
					{#each sections as section}
						<li>
							<a
								href="#{section.id}"
								class="block p-2 hover:bg-surface-hover-token rounded transition-colors"
							>
								{section.title}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<!-- Main content - with more space on larger screens to accommodate TOC -->
		<div class="lg:mr-72">
			<section id="introduction" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">1. Introduction</h2>
				<div class="space-y-4">
					<p>
						Welcome to Orama ("we," "us," or "our"). We respect your privacy and are committed to
						protecting it through our compliance with this Privacy Policy. This policy explains how
						we collect, use, disclose, and safeguard your information when you use Orama, our
						associated mobile or web applications, and related services (collectively, the
						"Services").
					</p>
					<p>
						By accessing or using our Services, you agree to the terms of this Privacy Policy. If
						you disagree with any part of it, please discontinue use of the Services.
					</p>
				</div>
			</section>

			<section id="information-we-collect" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					2. Information We Collect
				</h2>
				<div class="space-y-6">
					<div>
						<h3 class="h3 mb-3">Personal and Health Information</h3>
						<ul class="list-disc list-outside ml-6 space-y-2">
							<li>
								<strong>Patient Data:</strong> We may collect data such as patient name, date of birth,
								medical history, health records, prescription details, or other health information that
								you or authorized healthcare providers share with us.
							</li>
							<li>
								<strong>User Account Information:</strong> If you create an account, we may collect details
								such as your name, email address, and any other information you choose to provide.
							</li>
						</ul>
					</div>

					<div>
						<h3 class="h3 mb-3">Integration with MeldRx</h3>
						<p>
							Our Services integrate with MeldRx, which may provide us with additional patient data,
							including but not limited to health records, appointment history, and diagnostic
							reports. This data is only accessed with your authorization or the authorization of an
							appropriate healthcare professional.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">Usage Data</h3>
						<ul class="list-disc list-outside ml-6 space-y-2">
							<li>
								<strong>Device Information:</strong> We may automatically collect information about the
								device you use to access Orama, including IP address, operating system, and browser type.
							</li>
							<li>
								<strong>App Interaction:</strong> We may collect details of your interactions with our
								Services, such as pages viewed, features used, and the time you spend on specific pages
								or features.
							</li>
						</ul>
					</div>

					<div>
						<h3 class="h3 mb-3">Cookies and Tracking Technologies</h3>
						<p>
							We may use cookies, web beacons, and similar technologies to track usage patterns,
							remember user preferences, and improve your overall experience. You may disable
							cookies in your browser settings, but note that certain features of the Services may
							become unavailable.
						</p>
					</div>
				</div>
			</section>

			<section id="how-we-use" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					3. How We Use Your Information
				</h2>
				<div class="space-y-6">
					<div>
						<h3 class="h3 mb-3">Service Provision</h3>
						<p>
							We process patient health data to provide our core functionality: AI-driven analysis
							of medical and health-related data to generate insights and assist healthcare
							providers in decision-making.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">AI Analysis</h3>
						<p>
							We use AI algorithms to analyze patient data. These insights are intended to
							support—but not replace—professional medical judgment.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">User Account Management</h3>
						<p>
							We use your account information to administer your account, provide customer support,
							and communicate updates or service-related announcements.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">Service Improvement</h3>
						<p>
							We analyze aggregated, de-identified usage data to improve our algorithms,
							troubleshoot issues, and develop new features.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">Legal Compliance</h3>
						<p>
							We may use or disclose your information to comply with applicable laws, regulations,
							court orders, or lawful requests from governmental authorities.
						</p>
					</div>
				</div>
			</section>

			<section id="legal-basis" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					4. Legal Basis for Processing
				</h2>
				<p class="mb-4">
					Where required by law (e.g., under GDPR), we rely on the following legal bases for
					processing:
				</p>
				<ul class="list-disc list-outside ml-6 space-y-2">
					<li>
						<strong>Consent:</strong> You have given explicit consent for us to process your health data.
					</li>
					<li>
						<strong>Contract:</strong> Processing is necessary to fulfill our contractual obligations
						to you (e.g., providing the Services).
					</li>
					<li>
						<strong>Legitimate Interests:</strong> We process data for our legitimate interests, such
						as improving and securing our Services, without overriding your fundamental rights.
					</li>
					<li>
						<strong>Legal Obligation:</strong> We may process data to meet legal requirements, including
						health data protection rules.
					</li>
				</ul>
			</section>

			<section id="how-we-share" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					5. How We Share Your Information
				</h2>
				<div class="space-y-6">
					<div>
						<h3 class="h3 mb-3">With Third-Party Service Providers</h3>
						<p>
							We may share your information with trusted third-party vendors who help us operate our
							Services (e.g., cloud hosting providers, data analytics platforms). They will only
							have access to information needed to perform their specific tasks and are
							contractually obligated to maintain its confidentiality.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">With MeldRx</h3>
						<p>
							Your data may be transferred to or from MeldRx to enable seamless integration and
							enhance healthcare analysis. MeldRx's use of your data is governed by their privacy
							policies, and we are not responsible for how they handle your information once shared.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">Legal Obligations</h3>
						<p>
							We may disclose your information if required by law, subpoena, or other legal process,
							or if we believe disclosure is necessary to protect our rights, property, or safety.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">Business Transfers</h3>
						<p>
							In the event of a merger, acquisition, or sale of all or a portion of our assets, your
							information may be transferred to the acquiring entity.
						</p>
					</div>
				</div>
			</section>

			<section id="data-retention" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">6. Data Retention</h2>
				<p>
					We retain your personal and health data as long as necessary to fulfill the purposes
					outlined in this Privacy Policy or as required by law. We may also retain anonymized or
					aggregated data indefinitely for statistical analysis and product improvement.
				</p>
			</section>

			<section id="data-security" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">7. Data Security</h2>
				<p>
					We employ administrative, technical, and physical safeguards designed to protect your data
					from unauthorized access, alteration, disclosure, or destruction. However, no security
					system is impenetrable; we cannot guarantee the absolute security of your data.
				</p>
			</section>

			<section id="international-transfers" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					8. International Data Transfers
				</h2>
				<p>
					If you use Orama from outside our primary country of operation, your data may be
					transferred to and processed in countries that have different data protection laws. We
					will ensure appropriate safeguards are in place to protect your data in accordance with
					this Privacy Policy.
				</p>
			</section>

			<section id="your-rights" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">9. Your Rights</h2>
				<p>
					Depending on your jurisdiction, you may have certain rights regarding your personal
					information, such as the right to request access, correction, or deletion of your data. To
					exercise these rights, contact us at the information provided below. We will respond in
					accordance with applicable laws.
				</p>
			</section>

			<section id="childrens-privacy" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">10. Children's Privacy</h2>
				<p>
					Orama is not directed to individuals under the age of 18. If you believe we have
					inadvertently collected personal information from a minor, please contact us so we can
					delete the information and terminate any related accounts.
				</p>
			</section>

			<section id="changes" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					11. Changes to This Privacy Policy
				</h2>
				<p>
					We may update this Privacy Policy from time to time. The "Effective Date" at the top of
					this page indicates when the policy was last revised. Your continued use of Orama after
					any changes implies your acceptance of the updated policy.
				</p>
			</section>
		</div>

		<div class="divider my-10"></div>

		<footer class="text-center space-y-6">
			<!-- <div class="flex flex-col sm:flex-row justify-center gap-4">
				<button class="btn variant-filled">Contact Us</button>
				<button class="btn variant-soft">Download PDF</button>
			</div> -->
			<p class="text-sm opacity-75">© 2025 Orama. All rights reserved.</p>
		</footer>
	</div>
</div>

```

# src/routes/terms-and-conditions/+page.svelte

```svelte
<script lang="ts">
	// The TOC (table of contents) list for navigation
	const sections = [
		{ id: 'acceptance', title: '1. Acceptance of Terms' },
		{ id: 'description', title: '2. Description of Services' },
		{ id: 'eligibility', title: '3. Eligibility' },
		{ id: 'use', title: '4. Use of Services' },
		{ id: 'medical-disclaimer', title: '5. Medical Disclaimer' },
		{ id: 'intellectual-property', title: '6. Intellectual Property' },
		{ id: 'third-party', title: '7. Third-Party Services' },
		{ id: 'modifications', title: '8. Modifications to the Services' },
		{ id: 'disclaimer', title: '9. Disclaimer of Warranties' },
		{ id: 'limitation', title: '10. Limitation of Liability' },
		{ id: 'indemnification', title: '11. Indemnification' },
		{ id: 'termination', title: '12. Termination' },
		{ id: 'governing-law', title: '13. Governing Law and Dispute Resolution' },
		{ id: 'changes', title: '14. Changes to These Terms' }
	];
</script>

<div class="container mx-auto max-w-[1400px] py-8 px-4">
	<div class="card p-4 md:p-10 mb-4">
		<header class="space-y-2 mb-10 text-center">
			<h1 class="h1">Orama Terms & Conditions</h1>
			<p class="text-lg opacity-75">Effective Date: February 20, 2025</p>
		</header>

		<!-- Table of Contents - visible on larger screens, fixed position -->
		<div class="hidden lg:block fixed right-8 top-32 w-64 card p-4 max-h-[80vh] overflow-y-auto">
			<h3 class="h3 mb-4">Contents</h3>
			<nav>
				<ul class="list-none space-y-2">
					{#each sections as section}
						<li>
							<a
								href="#{section.id}"
								class="block p-2 hover:bg-surface-hover-token rounded transition-colors"
							>
								{section.title}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<!-- Main content - with more space on larger screens to accommodate TOC -->
		<div class="lg:mr-72">
			<section id="acceptance" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">1. Acceptance of Terms</h2>
				<p>
					By accessing or using Orama (the "App") and any related services (the "Services"), you
					agree to be bound by these Terms & Conditions (the "Terms"). If you do not agree, please
					do not use Orama.
				</p>
			</section>

			<section id="description" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					2. Description of Services
				</h2>
				<p>
					Orama provides AI-driven analysis of patient data, including data obtained via MeldRx, to
					assist healthcare professionals and patients in understanding health-related information.
					These analyses are not a substitute for professional medical advice, diagnosis, or
					treatment.
				</p>
			</section>

			<section id="eligibility" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">3. Eligibility</h2>
				<p>
					By using Orama, you represent that you are at least 18 years old and are legally capable
					of entering into binding contracts. If you are using Orama on behalf of another individual
					(e.g., a patient), you warrant that you have obtained all necessary consents and
					authorizations to share their data.
				</p>
			</section>

			<section id="use" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">4. Use of Services</h2>
				<div class="space-y-4">
					<div>
						<h3 class="h3 mb-2">Authorized Use</h3>
						<p>
							You agree to use Orama solely for lawful and medical-related purposes, in compliance
							with all applicable regulations (e.g., HIPAA, GDPR).
						</p>
					</div>
					<div>
						<h3 class="h3 mb-2">Accuracy of Information</h3>
						<p>
							You are responsible for ensuring that any information provided, including patient
							health data, is accurate, current, and complete.
						</p>
					</div>
					<div>
						<h3 class="h3 mb-2">User Accounts</h3>
						<p>
							You may need to create an account to access certain features. You are responsible for
							maintaining the confidentiality of your login credentials and for all activities under
							your account.
						</p>
					</div>
				</div>
			</section>

			<section id="medical-disclaimer" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">5. Medical Disclaimer</h2>
				<p>
					Orama's AI analyses and insights are intended for informational purposes only. Always seek
					the advice of a qualified healthcare professional for questions regarding a medical
					condition. Orama does not replace medical judgment, diagnosis, or treatment.
				</p>
			</section>

			<section id="intellectual-property" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">6. Intellectual Property</h2>
				<p>
					All content, features, and functionality in Orama (including text, graphics, logos,
					images, and software) belong to us or our licensors and are protected by intellectual
					property laws. You agree not to reproduce, distribute, or create derivative works without
					our express written permission.
				</p>
			</section>

			<section id="third-party" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">7. Third-Party Services</h2>
				<p>
					Orama may link to or integrate with third-party platforms like MeldRx. These third-party
					services have their own terms and policies, and we are not responsible for their content
					or data practices.
				</p>
			</section>

			<section id="modifications" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					8. Modifications to the Services
				</h2>
				<p>
					We reserve the right to change, suspend, or discontinue any aspect of Orama at any time
					without notice. We will not be liable if any part of the Services is unavailable at any
					time.
				</p>
			</section>

			<section id="disclaimer" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					9. Disclaimer of Warranties
				</h2>
				<div class="space-y-4">
					<div>
						<h3 class="h3 mb-2">As Is</h3>
						<p>
							Orama and its Services are provided on an "as is" and "as available" basis, without
							warranties of any kind.
						</p>
					</div>
					<div>
						<h3 class="h3 mb-2">No Guarantee</h3>
						<p>
							We do not warrant that the Services will be uninterrupted, error-free, or free of
							viruses.
						</p>
					</div>
					<div>
						<h3 class="h3 mb-2">Limitations</h3>
						<p>
							We disclaim all implied warranties, including warranties of merchantability, fitness
							for a particular purpose, and non-infringement.
						</p>
					</div>
				</div>
			</section>

			<section id="limitation" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					10. Limitation of Liability
				</h2>
				<p>
					To the maximum extent permitted by law, Orama, its directors, employees, and affiliates
					shall not be liable for any indirect, incidental, special, consequential, or punitive
					damages (including loss of profits, data, or goodwill) resulting from your use of—or
					inability to use—Orama or its Services.
				</p>
			</section>

			<section id="indemnification" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">11. Indemnification</h2>
				<p>
					You agree to indemnify and hold Orama, its affiliates, officers, agents, and employees
					harmless from any claims, liabilities, damages, judgments, or expenses arising out of your
					use of the Services, breach of these Terms, or violation of any third party rights.
				</p>
			</section>

			<section id="termination" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">12. Termination</h2>
				<p>
					We may suspend or terminate your access to Orama at any time, with or without notice, for
					any reason, including violations of these Terms. Upon termination, the rights granted to
					you under these Terms will immediately cease.
				</p>
			</section>

			<section id="governing-law" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					13. Governing Law and Dispute Resolution
				</h2>
				<p>
					These Terms are governed by the laws of [Your Jurisdiction]. Any dispute arising out of or
					in connection with these Terms shall be resolved exclusively in the courts located in
					[Your Jurisdiction]. You waive any objections to venue in such courts.
				</p>
			</section>

			<section id="changes" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					14. Changes to These Terms
				</h2>
				<p>
					We may amend these Terms at our discretion. When we do, we will update the "Effective
					Date" above. Your continued use of Orama after changes become effective indicates your
					acceptance of the revised Terms.
				</p>
			</section>
		</div>

		<div class="divider my-10"></div>

		<footer class="text-center space-y-6">
			<!-- <div class="flex flex-col sm:flex-row justify-center gap-4">
				<a href="/privacy-policy" class="btn variant-soft">Privacy Policy</a>
				<button class="btn variant-filled">Contact Us</button>
				<button class="btn variant-soft">Download PDF</button>
			</div> -->
			<p class="text-sm opacity-75">© 2025 Orama. All rights reserved.</p>
		</footer>
	</div>
</div>

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

