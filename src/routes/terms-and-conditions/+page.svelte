<script lang="ts">
	// The TOC (table of contents) list for navigation
	const sections = [
		{ id: 'acceptance', title: '1. Acceptance of Terms' },
		{ id: 'description', title: '2. Description of Services' },
		{ id: 'eligibility', title: '3. Eligibility' },
		{ id: 'use', title: '4. Use of Services' },
		{ id: 'medical-disclaimer', title: '5. Medical Disclaimer' },
		{ id: 'intellectual-property', title: '6. Intellectual Property' },
		{ id: 'third-party', title: '7. Third-Party Services' },
		{ id: 'modifications', title: '8. Modifications to the Services' },
		{ id: 'disclaimer', title: '9. Disclaimer of Warranties' },
		{ id: 'limitation', title: '10. Limitation of Liability' },
		{ id: 'indemnification', title: '11. Indemnification' },
		{ id: 'termination', title: '12. Termination' },
		{ id: 'governing-law', title: '13. Governing Law and Dispute Resolution' },
		{ id: 'changes', title: '14. Changes to These Terms' }
	];
</script>

<div class="container mx-auto max-w-[1400px] py-8 px-4">
	<div class="card p-4 md:p-10 mb-4">
		<header class="space-y-2 mb-10 text-center">
			<h1 class="h1">Orama Terms & Conditions</h1>
			<p class="text-lg opacity-75">Effective Date: February 20, 2025</p>
		</header>

		<!-- Table of Contents - visible on larger screens, fixed position -->
		<div class="hidden lg:block fixed right-8 top-32 w-64 card p-4 max-h-[80vh] overflow-y-auto">
			<h3 class="h3 mb-4">Contents</h3>
			<nav>
				<ul class="list-none space-y-2">
					{#each sections as section}
						<li>
							<a
								href="#{section.id}"
								class="block p-2 hover:bg-surface-hover-token rounded transition-colors"
							>
								{section.title}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<!-- Main content - with more space on larger screens to accommodate TOC -->
		<div class="lg:mr-72">
			<section id="acceptance" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">1. Acceptance of Terms</h2>
				<p>
					By accessing or using Orama (the "App") and any related services (the "Services"), you
					agree to be bound by these Terms & Conditions (the "Terms"). If you do not agree, please
					do not use Orama.
				</p>
			</section>

			<section id="description" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					2. Description of Services
				</h2>
				<p>
					Orama provides AI-driven analysis of patient data, including data obtained via MeldRx, to
					assist healthcare professionals and patients in understanding health-related information.
					These analyses are not a substitute for professional medical advice, diagnosis, or
					treatment.
				</p>
			</section>

			<section id="eligibility" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">3. Eligibility</h2>
				<p>
					By using Orama, you represent that you are at least 18 years old and are legally capable
					of entering into binding contracts. If you are using Orama on behalf of another individual
					(e.g., a patient), you warrant that you have obtained all necessary consents and
					authorizations to share their data.
				</p>
			</section>

			<section id="use" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">4. Use of Services</h2>
				<div class="space-y-4">
					<div>
						<h3 class="h3 mb-2">Authorized Use</h3>
						<p>
							You agree to use Orama solely for lawful and medical-related purposes, in compliance
							with all applicable regulations (e.g., HIPAA, GDPR).
						</p>
					</div>
					<div>
						<h3 class="h3 mb-2">Accuracy of Information</h3>
						<p>
							You are responsible for ensuring that any information provided, including patient
							health data, is accurate, current, and complete.
						</p>
					</div>
					<div>
						<h3 class="h3 mb-2">User Accounts</h3>
						<p>
							You may need to create an account to access certain features. You are responsible for
							maintaining the confidentiality of your login credentials and for all activities under
							your account.
						</p>
					</div>
				</div>
			</section>

			<section id="medical-disclaimer" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">5. Medical Disclaimer</h2>
				<p>
					Orama's AI analyses and insights are intended for informational purposes only. Always seek
					the advice of a qualified healthcare professional for questions regarding a medical
					condition. Orama does not replace medical judgment, diagnosis, or treatment.
				</p>
			</section>

			<section id="intellectual-property" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">6. Intellectual Property</h2>
				<p>
					All content, features, and functionality in Orama (including text, graphics, logos,
					images, and software) belong to us or our licensors and are protected by intellectual
					property laws. You agree not to reproduce, distribute, or create derivative works without
					our express written permission.
				</p>
			</section>

			<section id="third-party" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">7. Third-Party Services</h2>
				<p>
					Orama may link to or integrate with third-party platforms like MeldRx. These third-party
					services have their own terms and policies, and we are not responsible for their content
					or data practices.
				</p>
			</section>

			<section id="modifications" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					8. Modifications to the Services
				</h2>
				<p>
					We reserve the right to change, suspend, or discontinue any aspect of Orama at any time
					without notice. We will not be liable if any part of the Services is unavailable at any
					time.
				</p>
			</section>

			<section id="disclaimer" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					9. Disclaimer of Warranties
				</h2>
				<div class="space-y-4">
					<div>
						<h3 class="h3 mb-2">As Is</h3>
						<p>
							Orama and its Services are provided on an "as is" and "as available" basis, without
							warranties of any kind.
						</p>
					</div>
					<div>
						<h3 class="h3 mb-2">No Guarantee</h3>
						<p>
							We do not warrant that the Services will be uninterrupted, error-free, or free of
							viruses.
						</p>
					</div>
					<div>
						<h3 class="h3 mb-2">Limitations</h3>
						<p>
							We disclaim all implied warranties, including warranties of merchantability, fitness
							for a particular purpose, and non-infringement.
						</p>
					</div>
				</div>
			</section>

			<section id="limitation" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					10. Limitation of Liability
				</h2>
				<p>
					To the maximum extent permitted by law, Orama, its directors, employees, and affiliates
					shall not be liable for any indirect, incidental, special, consequential, or punitive
					damages (including loss of profits, data, or goodwill) resulting from your use of—or
					inability to use—Orama or its Services.
				</p>
			</section>

			<section id="indemnification" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">11. Indemnification</h2>
				<p>
					You agree to indemnify and hold Orama, its affiliates, officers, agents, and employees
					harmless from any claims, liabilities, damages, judgments, or expenses arising out of your
					use of the Services, breach of these Terms, or violation of any third party rights.
				</p>
			</section>

			<section id="termination" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">12. Termination</h2>
				<p>
					We may suspend or terminate your access to Orama at any time, with or without notice, for
					any reason, including violations of these Terms. Upon termination, the rights granted to
					you under these Terms will immediately cease.
				</p>
			</section>

			<section id="governing-law" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					13. Governing Law and Dispute Resolution
				</h2>
				<p>
					These Terms are governed by the laws of [Your Jurisdiction]. Any dispute arising out of or
					in connection with these Terms shall be resolved exclusively in the courts located in
					[Your Jurisdiction]. You waive any objections to venue in such courts.
				</p>
			</section>

			<section id="changes" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					14. Changes to These Terms
				</h2>
				<p>
					We may amend these Terms at our discretion. When we do, we will update the "Effective
					Date" above. Your continued use of Orama after changes become effective indicates your
					acceptance of the revised Terms.
				</p>
			</section>
		</div>

		<div class="divider my-10"></div>

		<footer class="text-center space-y-6">
			<!-- <div class="flex flex-col sm:flex-row justify-center gap-4">
				<a href="/privacy-policy" class="btn variant-soft">Privacy Policy</a>
				<button class="btn variant-filled">Contact Us</button>
				<button class="btn variant-soft">Download PDF</button>
			</div> -->
			<p class="text-sm opacity-75">© 2025 Orama. All rights reserved.</p>
		</footer>
	</div>
</div>
