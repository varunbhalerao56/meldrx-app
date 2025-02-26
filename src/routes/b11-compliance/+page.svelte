<script>
	import { page } from '$app/stores';
	import ModelInfo from '$lib/components/ModelInfo.svelte';
</script>

<div class="container mx-auto p-4 max-w-3xl">
	<h1 class="h1 mb-4">B11 Compliance Information</h1>

	<div class="card p-6 variant-glass mb-6">
		<h2 class="h2 mb-4">About Our AI System</h2>
		<ModelInfo />
	</div>

	<div class="card p-6 variant-glass mb-6">
		<h2 class="h2 mb-4">Transparency & Accountability</h2>
		<div class="space-y-4">
			<section>
				<h3 class="h3 mb-2">Data Sources</h3>
				<p>
					Our AI system is trained on a diverse dataset of anonymized clinical notes, medical
					literature, and treatment guidelines. All training data has been carefully reviewed to
					ensure patient privacy and clinical accuracy.
				</p>
			</section>

			<section>
				<h3 class="h3 mb-2">Model Development</h3>
				<p>
					Our model was developed by a team of AI researchers in collaboration with practicing
					clinicians. The model undergoes regular testing and validation to ensure accuracy and
					fairness across different patient populations.
				</p>
			</section>

			<section>
				<h3 class="h3 mb-2">Confidence Indicators</h3>
				<p>
					Throughout our application, you'll notice confidence indicators that show the reliability
					of AI-generated insights. These indicators are based on:
				</p>
				<ul class="list-disc pl-6 mt-2">
					<li>Data quality and completeness</li>
					<li>Statistical confidence in pattern recognition</li>
					<li>Alignment with established medical guidelines</li>
					<li>Validation by clinical experts</li>
				</ul>
			</section>
		</div>
	</div>

	<div class="card p-6 variant-glass mb-6">
		<h2 class="h2 mb-4">Intended Use & Limitations</h2>
		<div class="space-y-4">
			<section>
				<h3 class="h3 mb-2">Intended Use</h3>
				<p>This AI system is designed to assist healthcare professionals by:</p>
				<ul class="list-disc pl-6 mt-2">
					<li>Summarizing patient records</li>
					<li>Identifying potential patterns in clinical data</li>
					<li>Suggesting possible treatment options based on clinical guidelines</li>
					<li>Highlighting areas that may require further investigation</li>
				</ul>
			</section>

			<section>
				<h3 class="h3 mb-2">Limitations</h3>
				<p>Users should be aware of the following limitations:</p>
				<ul class="list-disc pl-6 mt-2">
					<li>
						The AI has a knowledge cutoff date and may not reflect the most recent medical research
					</li>
					<li>The system cannot access patient-specific information outside of what is provided</li>
					<li>
						AI-generated insights should always be verified by qualified healthcare professionals
					</li>
					<li>The system is not designed to make final diagnostic or treatment decisions</li>
				</ul>
			</section>
		</div>
	</div>

	<div class="flex justify-center mt-8">
		<button onclick={() => history.back()} class="btn variant-filled-primary">Go Back</button>
	</div>
</div>
