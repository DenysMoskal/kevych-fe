'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useUserStore();
  const isHydrated = useUserStore((state) => state._hasHydrated);

  console.log('isAuthenticated:', isAuthenticated, 'isHydrated:', isHydrated);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isHydrated) return;

    const publicRoutes = ['/login', '/register'];

    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push('/login');
    }

    if (isAuthenticated && publicRoutes.includes(pathname)) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, pathname, router, isHydrated]);

  return <>{children}</>;
};
