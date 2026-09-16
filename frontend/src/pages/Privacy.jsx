import NavBar from '../components/ui/NavBar'
import Footer from '../components/ui/Footer'

export default function Privacy() {
    return (
        <div className="min-h-screen bg-surface-raised text-surface-white">
            <NavBar />
            <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-8">
                <h1 className="font-heading text-4xl text-primary">Privacy Policy</h1>
                <p className="text-text-caption text-sm">Last updated: September 2026</p>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">1. Data We Collect</h2>
                    <p className="text-text-caption text-sm leading-relaxed">We collect information you provide when creating an account (name, email, date of birth, city) and your dog's profile (name, breed, age, gender, size, bio). We also collect usage data such as swipes and matches to improve the service.</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">2. How We Use Your Data</h2>
                    <p className="text-text-caption text-sm leading-relaxed">Your data is used solely to operate Tindog such as matching your dog with other dogs nearby, enabling chat between matched users, and improving our matching algorithm. We do not sell your personal data to third parties.</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">3. Data Storage</h2>
                    <p className="text-text-caption text-sm leading-relaxed">Your data is stored securely on our servers, and profile photos are kept in our media storage. We are working on automating full data deletion after profile inactivity. In the meantime, you can request manual deletion at any time by contacting us.</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">4. Your Rights</h2>
                    <p className="text-text-caption text-sm leading-relaxed">You have the right to access, correct, or delete your personal data. To exercise these rights, contact us.</p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-heading text-xl">5. Contact</h2>
                    <p className="text-text-caption text-sm leading-relaxed">For any privacy-related questions, reach us at "...".</p>
                </section>
            </div>
            <Footer />
        </div>
    )
}