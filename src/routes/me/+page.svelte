<script lang="ts">
	import FHIR from 'fhirclient';
	import Authenticated from '$lib/components/Authenticated.svelte';
	import { browser } from '$app/environment';

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

	type ResourceType = {
		resourceType: string;
		[key: string]: any;
	};

	type BundleEntry = {
		resource: ResourceType;
	};

	type Bundle = {
		entry?: BundleEntry[];
	};

	let patient = $state<Patient | null>(null);

	$effect(() => {
		if (browser) {
			FHIR.oauth2
				.ready()
				.then(async (client) => {
					const patientId = client.getPatientId();
					const relativePath = `Patient?_id=${encodeURIComponent(patientId!)}`;

					// Get the FHIR server’s base URL from the client
					const baseUrl = client.state.serverUrl.replace(/\/+$/, ''); // Trim trailing slashes just in case

					// Combine them to see the exact URL that will be requested
					const fullUrl = `${baseUrl}/${relativePath}`;

					// Log the URL (helpful for debugging)
					console.log('Full request URL:', fullUrl);

					const data = await client.request(
						`DocumentReference?subject=${encodeURIComponent('Patient/' + patientId)}`
					);

					console.info(data);

					return client.request<Bundle>(`${relativePath}`);
				})
				.then((bundle) => {
					if (!bundle.entry) return;

					console.log(bundle);

					if (bundle.entry.every((x) => x?.resource?.resourceType === 'Bundle')) {
						const possiblePatient = bundle.entry
							.map((x) => ('entry' in x.resource ? x.resource.entry || [] : []))
							.flat()
							.map((x) => x.resource)
							.find((x) => x?.resourceType === 'Patient');

						if (possiblePatient && isPatient(possiblePatient)) {
							patient = possiblePatient;
						}
					} else {
						const possiblePatient = bundle.entry
							.map((x) => x.resource)
							.find((x) => x?.resourceType === 'Patient');

						if (possiblePatient && isPatient(possiblePatient)) {
							patient = possiblePatient;
						}
					}
				});
		}
	});

	function isPatient(x: any): x is Patient {
		return (
			x?.resourceType === 'Patient' &&
			typeof x.id === 'string' &&
			Array.isArray(x.name) &&
			Array.isArray(x.address) &&
			Array.isArray(x.communication)
		);
	}
</script>

<Authenticated>
	<h1>Patient Information</h1>

	{#if patient}
		<ul>
			<li>
				<strong>id</strong> - {patient.id}
			</li>
			<li>
				<strong>name</strong> - {patient.name[0].given.join(', ')}
				{patient.name[0].family}
			</li>
			<li>
				<strong>date of birth</strong> - {patient.birthDate}
			</li>
			<li>
				<strong>gender</strong> - {patient.gender}
			</li>
			<li>
				<strong>address</strong> - {patient.address.map(
					(addr) =>
						`${addr.line.join(', ')}, ${addr.city}, ${addr.state}, ${addr.postalCode}, ${addr.country}.`
				)[0]}
			</li>
			<li>
				<strong>communication</strong> - {patient.communication
					.map((comms) => comms.language.text)
					.join(', ')}
			</li>
		</ul>
	{:else}
		<div>Loading...</div>
	{/if}
</Authenticated>
