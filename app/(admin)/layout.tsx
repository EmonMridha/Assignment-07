'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Users', href: '/admin/users' },
  { name: 'Zones', href: '/admin/zones' },
  { name: 'Outages', href: '/admin/outages' },
  { name: 'Complaints', href: '/admin/complaints' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-slate-900 px-4 py-3 text-white md:hidden">
        <h2 className="text-lg font-bold text-sky-400">Admin</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded p-2 hover:bg-slate-700"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-60 bg-slate-900 text-white
          flex flex-col py-5 gap-2
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0
        `}
      >
        <h2 className="hidden text-center text-xl font-bold text-sky-400 mb-5 md:block">
          Admin Dashboard
        </h2>
        <div className="h-14 md:hidden" />

        {navItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`px-6 py-3 transition ${
                isActive
                  ? 'bg-sky-400 text-slate-900 font-semibold'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </aside>

      <main className="flex-1 overflow-x-hidden p-4 pt-20 md:p-8 md:pt-8">
        {children}
      </main>
    </div>
  );
}