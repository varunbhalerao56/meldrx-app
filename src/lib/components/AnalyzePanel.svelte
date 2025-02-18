<script lang="ts">
	import type { ChatMessage } from '$lib/services/openrouter';
	import AnalyzeData from './AnalyzeData.svelte';

	let { messages, rawData, isLoading, onClear } = $props<{
		messages: ChatMessage[];
		rawData: string;
		isLoading: boolean;
		onClear: () => void;
	}>();

	let currentMessage = $state('');
</script>

<div class="p-4 overflow-y-auto">
	<div class="card p-4 space-y-4">
		<div class="flex justify-end items-center">
			<button class="btn btn-sm variant-soft" onclick={onClear}>Close</button>
		</div>

		<!-- Raw Data -->
		<div class="space-y-2 h-[calc(100vh-205px)] overflow-y-auto">
			{#if isLoading == false}
				<AnalyzeData {rawData} />
			{/if}

			{#if isLoading}
				<div class="flex flex-col justify-center items-center">
					<div class="spinner-dual-ring mt-5 mb-3"></div>
					<div>Analyzing patient notes</div>
				</div>
			{/if}
		</div>
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
