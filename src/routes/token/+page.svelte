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
