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

# src/lib/components/Authenticated.svelte

```svelte
<script lang="ts">
	type Link = {
		text: string;
		to: string;
	};

	const links: Link[] = [
		{ text: 'patient information', to: '/me' },
		{ text: 'observations', to: '/observations' },
		{ text: 'token', to: '/token' }
	];
</script>

<div>
	<div>
		{#each links as link}
			<a href={link.to} style="margin-left: 1rem; font-size: 2rem;">{link.text}</a>
		{/each}
	</div>
	<slot />
</div>

```

# src/lib/index.ts

```ts
// place files you want to import through the `$lib` alias in this folder.

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
		console.log(`${env.PUBLIC_APP_BASE_URL}/login-callback`);

		FHIR.oauth2.authorize({
			clientId: env.PUBLIC_MELDRX_CLIENT_ID,
			// clientSecret: env.PUBLIC_MELDRX_CLIENT_SECRET,
			scope: 'openid profile fhirUser patient/*.read launch launch/patient',
			redirectUri: `${env.PUBLIC_APP_BASE_URL}/login-callback`,

			iss: env.PUBLIC_MELDRX_WORKSPACE_URL
		});
	}
</script>

<h1>Welcome</h1>
<div>
	<button type="button" class="btn btn-xl" onclick={login}>Login</button>
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

```

# src/routes/observations/+page.svelte

```svelte
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

