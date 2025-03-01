<script lang="ts">
	import FHIR from 'fhirclient';
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let loading = true;
	let error: string | null = null;
	let currentUrl = '';

	onMount(() => {
		if (browser) {
			// Get the current URL
			currentUrl = window.location.href;

			try {
				// Get URL parameters
				const urlParams = new URLSearchParams(window.location.search);
				const iss = urlParams.get('iss');
				const launch = urlParams.get('launch');
				const client = urlParams.get('client');

				if (!iss) {
					error = "Missing 'iss' parameter";
					loading = false;
					return;
				}

				// Automatically login with the provided parameters
				FHIR.oauth2.authorize({
					clientId: client || env.PUBLIC_MELDRX_CLIENT_ID,
					scope: 'openid profile launch patient/*.read  ',
					redirectUri: `${env.PUBLIC_APP_BASE_URL}/login-callback`,
					iss: iss,
					launch: launch || undefined
				});
			} catch (err) {
				console.error('Login error:', err);
				error = err instanceof Error ? err.message : 'Unknown error occurred';
				loading = false;
			}
		}
	});

	// Manual login function as fallback
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

		{#if loading}
			<div class="flex justify-center">
				<p>Initializing login process...</p>
				<!-- You could add a spinner here -->
			</div>
		{:else if error}
			<div class="flex flex-col items-center">
				<p class="text-error mb-4">Error: {error}</p>
				<button type="button" class="btn variant-filled-primary text-lg py-3 px-6" on:click={login}>
					Try manual login
				</button>
			</div>
		{:else}
			<div class="flex justify-center">
				<button type="button" class="btn variant-filled-primary text-lg py-3 px-6" on:click={login}>
					Login to retrieve your patients
				</button>
			</div>
		{/if}

		<!-- Display current URL for debugging
		<div class="mt-6 p-4 bg-surface-200 rounded-md text-sm overflow-auto">
			<p class="font-semibold mb-2">Current URL:</p>
			<code class="break-all">{currentUrl}</code>
		</div> -->
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

		<a href="/b11-compliance" class="btn">
			<span class="material-symbols-outlined"></span>
			<span>B11 Compliance</span>
		</a>
		<p class="mt-2">© 2025 Orama. All rights reserved.</p>
	</footer>
</div>
