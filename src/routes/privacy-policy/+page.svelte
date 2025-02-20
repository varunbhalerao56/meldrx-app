<script lang="ts">
	// The TOC (table of contents) list for navigation
	const sections = [
		{ id: 'introduction', title: '1. Introduction' },
		{ id: 'information-we-collect', title: '2. Information We Collect' },
		{ id: 'how-we-use', title: '3. How We Use Your Information' },
		{ id: 'legal-basis', title: '4. Legal Basis for Processing' },
		{ id: 'how-we-share', title: '5. How We Share Your Information' },
		{ id: 'data-retention', title: '6. Data Retention' },
		{ id: 'data-security', title: '7. Data Security' },
		{ id: 'international-transfers', title: '8. International Data Transfers' },
		{ id: 'your-rights', title: '9. Your Rights' },
		{ id: 'childrens-privacy', title: "10. Children's Privacy" },
		{ id: 'changes', title: '11. Changes to This Privacy Policy' }
	];
</script>

<div class="container mx-auto max-w-[1400px] py-8 px-4">
	<div class="card p-4 md:p-10 mb-4">
		<header class="space-y-2 mb-10 text-center">
			<h1 class="h1">Orama Privacy Policy</h1>
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
			<section id="introduction" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">1. Introduction</h2>
				<div class="space-y-4">
					<p>
						Welcome to Orama ("we," "us," or "our"). We respect your privacy and are committed to
						protecting it through our compliance with this Privacy Policy. This policy explains how
						we collect, use, disclose, and safeguard your information when you use Orama, our
						associated mobile or web applications, and related services (collectively, the
						"Services").
					</p>
					<p>
						By accessing or using our Services, you agree to the terms of this Privacy Policy. If
						you disagree with any part of it, please discontinue use of the Services.
					</p>
				</div>
			</section>

			<section id="information-we-collect" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					2. Information We Collect
				</h2>
				<div class="space-y-6">
					<div>
						<h3 class="h3 mb-3">Personal and Health Information</h3>
						<ul class="list-disc list-outside ml-6 space-y-2">
							<li>
								<strong>Patient Data:</strong> We may collect data such as patient name, date of birth,
								medical history, health records, prescription details, or other health information that
								you or authorized healthcare providers share with us.
							</li>
							<li>
								<strong>User Account Information:</strong> If you create an account, we may collect details
								such as your name, email address, and any other information you choose to provide.
							</li>
						</ul>
					</div>

					<div>
						<h3 class="h3 mb-3">Integration with MeldRx</h3>
						<p>
							Our Services integrate with MeldRx, which may provide us with additional patient data,
							including but not limited to health records, appointment history, and diagnostic
							reports. This data is only accessed with your authorization or the authorization of an
							appropriate healthcare professional.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">Usage Data</h3>
						<ul class="list-disc list-outside ml-6 space-y-2">
							<li>
								<strong>Device Information:</strong> We may automatically collect information about the
								device you use to access Orama, including IP address, operating system, and browser type.
							</li>
							<li>
								<strong>App Interaction:</strong> We may collect details of your interactions with our
								Services, such as pages viewed, features used, and the time you spend on specific pages
								or features.
							</li>
						</ul>
					</div>

					<div>
						<h3 class="h3 mb-3">Cookies and Tracking Technologies</h3>
						<p>
							We may use cookies, web beacons, and similar technologies to track usage patterns,
							remember user preferences, and improve your overall experience. You may disable
							cookies in your browser settings, but note that certain features of the Services may
							become unavailable.
						</p>
					</div>
				</div>
			</section>

			<section id="how-we-use" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					3. How We Use Your Information
				</h2>
				<div class="space-y-6">
					<div>
						<h3 class="h3 mb-3">Service Provision</h3>
						<p>
							We process patient health data to provide our core functionality: AI-driven analysis
							of medical and health-related data to generate insights and assist healthcare
							providers in decision-making.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">AI Analysis</h3>
						<p>
							We use AI algorithms to analyze patient data. These insights are intended to
							support—but not replace—professional medical judgment.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">User Account Management</h3>
						<p>
							We use your account information to administer your account, provide customer support,
							and communicate updates or service-related announcements.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">Service Improvement</h3>
						<p>
							We analyze aggregated, de-identified usage data to improve our algorithms,
							troubleshoot issues, and develop new features.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">Legal Compliance</h3>
						<p>
							We may use or disclose your information to comply with applicable laws, regulations,
							court orders, or lawful requests from governmental authorities.
						</p>
					</div>
				</div>
			</section>

			<section id="legal-basis" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					4. Legal Basis for Processing
				</h2>
				<p class="mb-4">
					Where required by law (e.g., under GDPR), we rely on the following legal bases for
					processing:
				</p>
				<ul class="list-disc list-outside ml-6 space-y-2">
					<li>
						<strong>Consent:</strong> You have given explicit consent for us to process your health data.
					</li>
					<li>
						<strong>Contract:</strong> Processing is necessary to fulfill our contractual obligations
						to you (e.g., providing the Services).
					</li>
					<li>
						<strong>Legitimate Interests:</strong> We process data for our legitimate interests, such
						as improving and securing our Services, without overriding your fundamental rights.
					</li>
					<li>
						<strong>Legal Obligation:</strong> We may process data to meet legal requirements, including
						health data protection rules.
					</li>
				</ul>
			</section>

			<section id="how-we-share" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					5. How We Share Your Information
				</h2>
				<div class="space-y-6">
					<div>
						<h3 class="h3 mb-3">With Third-Party Service Providers</h3>
						<p>
							We may share your information with trusted third-party vendors who help us operate our
							Services (e.g., cloud hosting providers, data analytics platforms). They will only
							have access to information needed to perform their specific tasks and are
							contractually obligated to maintain its confidentiality.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">With MeldRx</h3>
						<p>
							Your data may be transferred to or from MeldRx to enable seamless integration and
							enhance healthcare analysis. MeldRx's use of your data is governed by their privacy
							policies, and we are not responsible for how they handle your information once shared.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">Legal Obligations</h3>
						<p>
							We may disclose your information if required by law, subpoena, or other legal process,
							or if we believe disclosure is necessary to protect our rights, property, or safety.
						</p>
					</div>

					<div>
						<h3 class="h3 mb-3">Business Transfers</h3>
						<p>
							In the event of a merger, acquisition, or sale of all or a portion of our assets, your
							information may be transferred to the acquiring entity.
						</p>
					</div>
				</div>
			</section>

			<section id="data-retention" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">6. Data Retention</h2>
				<p>
					We retain your personal and health data as long as necessary to fulfill the purposes
					outlined in this Privacy Policy or as required by law. We may also retain anonymized or
					aggregated data indefinitely for statistical analysis and product improvement.
				</p>
			</section>

			<section id="data-security" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">7. Data Security</h2>
				<p>
					We employ administrative, technical, and physical safeguards designed to protect your data
					from unauthorized access, alteration, disclosure, or destruction. However, no security
					system is impenetrable; we cannot guarantee the absolute security of your data.
				</p>
			</section>

			<section id="international-transfers" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					8. International Data Transfers
				</h2>
				<p>
					If you use Orama from outside our primary country of operation, your data may be
					transferred to and processed in countries that have different data protection laws. We
					will ensure appropriate safeguards are in place to protect your data in accordance with
					this Privacy Policy.
				</p>
			</section>

			<section id="your-rights" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">9. Your Rights</h2>
				<p>
					Depending on your jurisdiction, you may have certain rights regarding your personal
					information, such as the right to request access, correction, or deletion of your data. To
					exercise these rights, contact us at the information provided below. We will respond in
					accordance with applicable laws.
				</p>
			</section>

			<section id="childrens-privacy" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">10. Children's Privacy</h2>
				<p>
					Orama is not directed to individuals under the age of 18. If you believe we have
					inadvertently collected personal information from a minor, please contact us so we can
					delete the information and terminate any related accounts.
				</p>
			</section>

			<section id="changes" class="mb-12">
				<h2 class="h2 pb-2 border-b border-surface-400-500-token mb-4">
					11. Changes to This Privacy Policy
				</h2>
				<p>
					We may update this Privacy Policy from time to time. The "Effective Date" at the top of
					this page indicates when the policy was last revised. Your continued use of Orama after
					any changes implies your acceptance of the updated policy.
				</p>
			</section>
		</div>

		<div class="divider my-10"></div>

		<footer class="text-center space-y-6">
			<!-- <div class="flex flex-col sm:flex-row justify-center gap-4">
				<button class="btn variant-filled">Contact Us</button>
				<button class="btn variant-soft">Download PDF</button>
			</div> -->
			<p class="text-sm opacity-75">© 2025 Orama. All rights reserved.</p>
		</footer>
	</div>
</div>
