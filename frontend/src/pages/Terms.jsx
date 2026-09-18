import NavBar from '../components/ui/NavBar'
import Footer from '../components/ui/Footer'

export default function Terms() {
    return (
        <div className="min-h-screen bg-surface-raised text-surface-white">
            <NavBar />
            <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-8">
                <h1 className="font-heading text-4xl text-primary">Terms of Service</h1>
                <p className="text-text-caption text-sm">Last updated: September 2026</p>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">1. Acceptance</h2>
                    <p className="text-text-caption text-sm leading-relaxed">By using Tindog, you agree to these Terms of Service. If you do not agree, please do not use the Website.</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">2. Eligibility</h2>
                    <p className="text-text-caption  text-sm leading-relaxed">You must be at least 18 years old to create an account. By registering, you confirm that you are the owner or legal guardian of the dog you are registering.</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">3. Acceptable Use</h2>
                    <p className="text-text-caption  text-sm leading-relaxed">Tindog is a platform for connecting dog owners. You agree not to use the platform for any unlawful purpose, to harass other users, or to provide false information about yourself or your dog.</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">4. Content</h2>
                    <p className="text-text-caption  text-sm leading-relaxed">You are responsible for the content you post, including your dog's photos and bio. We reserve the right to remove any content that violates these terms.</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">5. Account Termination</h2>
                    <p className="text-text-caption  text-sm leading-relaxed">We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time from your profile settings.</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">6. Contact</h2>
                    <p className="text-text-caption text-sm leading-relaxed">For any questions about these terms, contact us at "...".</p>
                </section>
            </div>
            <Footer />
        </div>
    )
}