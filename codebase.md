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

	let { messages, rawData, isLoading, onClear } = $props<{
		messages: ChatMessage[];
		rawData: string;
		isLoading: boolean;
		onClear: () => void;
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
			{#if isLoading == false}
				<AnalyzeData {rawData} />
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
	import AnalyzePanel from '$lib/components/AnalyzePanel.svelte';

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

	async function analyzeRecords() {
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
		rawData = '';
		messages = [];
		isOpen = false;
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
								isOpen = !isOpen;
								rawData = '';
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
							<AnalyzePanel {messages} {rawData} {isLoading} onClear={clearChat} />
						{/if}
					</div>
				</div>
			</div>
		</div>
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

