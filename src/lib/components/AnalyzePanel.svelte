<script lang="ts">
	import type { ChatMessage } from '$lib/services/openrouter';
	import AnalyzeData from './AnalyzeData.svelte';
	import ConsultationPrep from './ConsultationPrep.svelte';
	import ModelInfo from './ModelInfo.svelte';

	let { messages, rawData, isLoading, onClear, type } = $props<{
		messages: ChatMessage[];
		rawData: string;
		isLoading: boolean;
		onClear: () => void;
		type: string;
	}>();

	let currentMessage = $state('');
	let showModelInfo = $state(false);

	function toggleModelInfo() {
		showModelInfo = !showModelInfo;
	}
</script>

<div class="h-full flex flex-col">
	<div class="flex justify-end items-center gap-2 mt-5">
		<button class="btn btn-sm variant-soft-primary" onclick={toggleModelInfo}>
			{showModelInfo ? 'Hide Model Info' : 'Show Model Info'}
		</button>
		<button class="btn btn-sm variant-soft" onclick={onClear}>Close</button>
	</div>

	{#if showModelInfo}
		<ModelInfo />
	{/if}

	<!-- Raw Data -->
	<div class="space-y-2 h-[calc(100vh-205px)] overflow-y-auto">
		{#if isLoading == false && type == 'analyze'}
			<AnalyzeData {rawData} />
		{/if}

		{#if isLoading == false && type == 'prep'}
			<ConsultationPrep {rawData} />
		{/if}

		{#if isLoading}
			<div class="flex flex-col justify-center items-center">
				<div class="spinner-dual-ring mt-5 mb-3"></div>
				<div>Analyzing patient notes</div>
				<div class="text-sm opacity-75 mt-2">This may take up to a minute</div>
			</div>
		{/if}
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
