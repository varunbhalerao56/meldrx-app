<script>
	// These are props that can be passed to the component
	export let modelName = 'Claude 3.5 Sonnet';
	export let modelProvider = 'Anthropic via OpenRouter';
	export let lastUpdated = 'February 2025';
</script>

<div class="card p-4 variant-glass">
	<h4 class="h4 mb-2">AI Model Information</h4>
	<div class="space-y-2 text-sm">
		<p><strong>Model:</strong> {modelName}</p>
		<p><strong>Provider:</strong> {modelProvider}</p>
		<p><strong>Last Updated:</strong> {lastUpdated}</p>
		<p>
			<strong>Purpose:</strong> This model analyzes clinical notes to identify patterns and generate
			insights. It is designed to assist clinical decision-making, not replace professional judgment.
		</p>
		<p>
			<strong>Limitations:</strong> This model has a knowledge cutoff and may not reflect the most recent
			medical guidelines. Always verify clinical information before making treatment decisions.
		</p>
	</div>
</div>
