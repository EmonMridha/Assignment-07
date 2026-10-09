import Link from 'next/link';

const HomePage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <header className="flex items-center justify-between border-b bg-white px-6 py-4 sm:px-10">
                <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
                    ⚡ PowerWatch
                </h1>
                <div className="flex gap-2">
                    <Link
                        href="/login"
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                    >
                        Register
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <main className="flex flex-1 flex-col items-center px-6 py-16 text-center sm:px-10">
                <h2 className="max-w-2xl text-3xl font-bold text-slate-800 sm:text-4xl lg:text-5xl">
                    Load Shedding & Power Management
                </h2>
                <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
                    Track power outages, report issues, and manage your electricity
                    bills — all in one place.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                        href="/login"
                        className="rounded-lg bg-slate-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700 sm:text-base"
                    >
                        Get Started
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-white sm:text-base"
                    >
                        Create Account
                    </Link>
                </div>

                {/* Feature cards */}
                <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                    <div className="rounded-xl border bg-white p-6 text-left shadow-sm">
                        <div className="text-2xl">🗓️</div>
                        <h3 className="mt-3 font-semibold text-slate-800">
                            View Schedules
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                            See upcoming load shedding in your area.
                        </p>
                    </div>

                    <div className="rounded-xl border bg-white p-6 text-left shadow-sm">
                        <div className="text-2xl">📢</div>
                        <h3 className="mt-3 font-semibold text-slate-800">
                            Report Outages
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                            Submit complaints and track resolution.
                        </p>
                    </div>

                    <div className="rounded-xl border bg-white p-6 text-left shadow-sm">
                        <div className="text-2xl">💳</div>
                        <h3 className="mt-3 font-semibold text-slate-800">
                            Pay Bills
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                            Secure payments via Stripe.
                        </p>
                    </div>
                </div>

                {/* How it works */}
                <section className="mt-16 w-full max-w-4xl">
                    <h3 className="text-center text-2xl font-bold text-slate-800 sm:text-3xl">
                        How It Works
                    </h3>
                    <p className="mt-2 text-center text-sm text-slate-600 sm:text-base">
                        Simple steps to manage your power services
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                step: '1',
                                title: 'Create Account',
                                desc: 'Register with email or Google in seconds.',
                            },
                            {
                                step: '2',
                                title: 'Select Your Zone',
                                desc: 'Choose your area to see relevant schedules.',
                            },
                            {
                                step: '3',
                                title: 'Track & Report',
                                desc: 'View outages or submit complaints anytime.',
                            },
                            {
                                step: '4',
                                title: 'Pay Bills',
                                desc: 'Secure Stripe payments from your dashboard.',
                            },
                        ].map((item) => (
                            <div
                                key={item.step}
                                className="relative rounded-xl border bg-white p-6 text-left shadow-sm"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                                    {item.step}
                                </div>
                                <h4 className="mt-4 font-semibold text-slate-800">{item.title}</h4>
                                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t bg-white px-6 py-4 text-center text-xs text-slate-500 sm:px-10">
                © {new Date().getFullYear()} PowerWatch. All rights reserved.
            </footer>
        </div>
    );
};

export default HomePage;