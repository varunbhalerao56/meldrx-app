<script lang="ts">
	import FHIR from 'fhirclient';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	let ready = $state(false);

	$effect(() => {
		if (browser) {
			console.log(window.location.href);

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
	<div class="flex justify-center items-center h-screen">
		<div class="card p-4">
			<p>OAuth2 Ready - Redirecting...</p>
			<div class="progress"></div>
		</div>
	</div>
{:else}
	<div class="flex justify-center items-center h-screen">
		<div class="card p-4">
			<p>Processing OAuth2....</p>
			<div class="progress"></div>
		</div>
	</div>
{/if}
