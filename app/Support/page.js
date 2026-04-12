import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      <main className="pt-28 pb-16 px-6">
        <section className="max-w-6xl mx-auto">
          <div className="bg-[#161b27] border border-[#1f2937] rounded-3xl p-10 shadow-2xl shadow-black/40">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.3em] text-blue-400 mb-4">Support Center</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                  Get the help you need, fast.
                </h1>
                <p className="mt-6 text-gray-400 text-base leading-8 max-w-2xl">
                  Our support team is ready to assist with developer onboarding, profile issues, project guidance, and anything else related to your experience on Butt Networks.
                </p>
              </div>

              <div className="rounded-3xl border border-[#24304b] bg-[#0f172a] p-8 shadow-2xl shadow-blue-900/10">
                <p className="text-sm text-blue-300 uppercase tracking-[0.2em] mb-4">Need help?</p>
                <h2 className="text-2xl font-semibold text-white mb-4">Contact our team</h2>
                <div className="space-y-4 text-sm text-[#cbd5e1]">
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <a href="mailto:support@buttnetworks.com" className="text-blue-400 hover:text-blue-300 transition">support@buttnetworks.com</a>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Response time</p>
                    <p>Usually within 1 business day.</p>
                  </div>
                </div>
                <a
                  href="mailto:support@buttnetworks.com"
                  className="mt-8 inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-[#1e90ff] to-[#3ea6ff] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:opacity-95 transition"
                >
                  Email Support
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-[#1f2937] bg-[#111827] p-8 shadow-xl shadow-black/20">
              <p className="text-sm text-blue-400 uppercase tracking-[0.2em] mb-4">FAQ</p>
              <h3 className="text-xl font-semibold text-white mb-4">Account access</h3>
              <p className="text-gray-400 text-sm leading-7">Troubles with logging in, account settings, or profile access? Reach out and we’ll help restore your access securely.</p>
            </div>
            <div className="rounded-3xl border border-[#1f2937] bg-[#111827] p-8 shadow-xl shadow-black/20">
              <p className="text-sm text-blue-400 uppercase tracking-[0.2em] mb-4">Support</p>
              <h3 className="text-xl font-semibold text-white mb-4">Developer profiles</h3>
              <p className="text-gray-400 text-sm leading-7">Need help updating your profile, adding projects, or showcasing your skills? Our team can help you optimize your presence.</p>
            </div>
            <div className="rounded-3xl border border-[#1f2937] bg-[#111827] p-8 shadow-xl shadow-black/20">
              <p className="text-sm text-blue-400 uppercase tracking-[0.2em] mb-4">Resources</p>
              <h3 className="text-xl font-semibold text-white mb-4">Hiring guidance</h3>
              <p className="text-gray-400 text-sm leading-7">Looking to hire a developer? We can guide you through the process, from posting your project to selecting the ideal match.</p>
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-[#1f2937] bg-[#161b27] p-10 shadow-2xl shadow-black/30">
            <h2 className="text-3xl font-bold text-white mb-4">Need immediate assistance?</h2>
            <p className="text-gray-400 leading-8 mb-8 max-w-3xl">
              If your issue is urgent, send us a message using the support email and include your account details. We’ll prioritize your inquiry and get back to you with a solution.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl bg-[#0f172a] border border-[#1c2a44] p-6">
                <p className="text-sm text-blue-300 uppercase tracking-[0.2em] mb-3">Support Hours</p>
                <p className="text-white font-semibold">Mon - Fri</p>
                <p className="text-gray-400">9:00 AM - 7:00 PM</p>
              </div>
              <div className="rounded-3xl bg-[#0f172a] border border-[#1c2a44] p-6">
                <p className="text-sm text-blue-300 uppercase tracking-[0.2em] mb-3">Response estimate</p>
                <p className="text-white font-semibold">Within 24 hours</p>
                <p className="text-gray-400">Faster for verified users.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
