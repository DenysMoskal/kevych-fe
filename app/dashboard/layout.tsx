'use client';

import { useUserStore } from '@/store';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useUserStore();
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="px-4 cursor-pointer   py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            Log out
          </button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
