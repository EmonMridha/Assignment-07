import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
            <h1 className="text-6xl font-bold text-slate-800">404</h1>
            <p className="text-sm text-muted-foreground">
                This page could not be found.
            </p>
            <Link
                href="/"
                className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
                Go Home
            </Link>
        </div>
    );
}