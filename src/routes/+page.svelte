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
