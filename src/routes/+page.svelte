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

		<a href="/b11-compliance" class="btn">
			<span class="material-symbols-outlined"></span>
			<span>B11 Compliance</span>
		</a>
		<p class="mt-2">© 2025 Orama. All rights reserved.</p>
	</footer>
</div>
