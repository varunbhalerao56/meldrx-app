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
