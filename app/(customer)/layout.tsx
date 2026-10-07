'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

const navItems = [

  { name: 'Home', href: '/dashboard/' },
  { name: 'Complaints', href: '/dashboard/complaints' },
  { name: 'Outages', href: '/dashboard/outages' },
  { name: 'Payments', href: '/dashboard/payments' },
  { name: 'Profile', href: '/dashboard/profile' },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-slate-800 text-white flex items-center justify-between px-4 py-3">
        <Link href="/"> <h2 className="text-lg font-bold text-sky-400">PowerWatch</h2></Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded hover:bg-slate-700"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          w-60 h-full bg-slate-800 text-white
          flex flex-col py-5 gap-2
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <Link href="/"> <h2 className="text-center text-xl font-bold text-sky-400 mb-5 hidden md:block">
          PowerWatch
        </h2></Link>

        {/* Mobile close spacing */}
        <div className="md:hidden h-14" />

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`px-6 py-3 transition ${isActive
                ? 'bg-sky-400 text-slate-900 font-semibold'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}