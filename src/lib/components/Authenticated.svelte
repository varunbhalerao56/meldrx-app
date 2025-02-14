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
