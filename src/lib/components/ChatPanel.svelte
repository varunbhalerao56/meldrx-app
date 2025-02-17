<script lang="ts">
	import type { ChatMessage } from '$lib/services/openrouter';

	let { messages, isLoading, onSubmit, onClear } = $props<{
		messages: ChatMessage[];
		isLoading: boolean;
		onSubmit: (message: string) => void;
		onClear: () => void;
	}>();

	let currentMessage = $state('');

	function handleSubmit(event: Event) {
		event.preventDefault();
		if (!currentMessage.trim() || isLoading) return;

		onSubmit(currentMessage);
		currentMessage = '';
	}
</script>

<div class="p-4 overflow-y-auto">
	<div class="card p-4 space-y-4">
		<div class="flex justify-between items-center">
			<h3 class="h3">AI Assistant</h3>
			<button class="btn btn-sm variant-soft" onclick={onClear}>Clear</button>
		</div>

		<!-- Chat messages -->
		<div class="space-y-2 h-[calc(100vh-385px)] overflow-y-auto">
			{#each messages as message}
				<div class="card p-3 {message.role === 'user' ? 'variant-soft' : 'variant-filled'}">
					<p class="whitespace-pre-wrap">{message.content}</p>
				</div>
			{/each}
			{#if isLoading}
				<div class="flex justify-center">
					<div class="spinner-dual-ring"></div>
				</div>
			{/if}
		</div>

		<!-- Chat input -->
		<form class="flex flex-col gap-2" onsubmit={handleSubmit}>
			<textarea
				bind:value={currentMessage}
				placeholder="Ask about the medical decisions..."
				class="textarea p-2"
				rows="4"
				disabled={isLoading}
			>
			</textarea>

			<button type="submit" class="btn variant-filled" disabled={isLoading}> Send </button>
		</form>
	</div>
</div>

<style>
	.spinner-dual-ring {
		width: 24px;
		height: 24px;
		border: 3px solid #919191;
		border-radius: 50%;
		border-top-color: transparent;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
