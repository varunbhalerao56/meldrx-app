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
