'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

/**
 * Higher-Order Component to protect routes that require authentication
 * Redirects to /login if user is not authenticated
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return function ProtectedRoute(props: P) {
    const router = useRouter();
    const { user, isLoading } = useUser();

    useEffect(() => {
      // Only redirect if we're done loading and user is not logged in
      if (!isLoading && !user?.isLoggedIn) {
        router.push('/login');
      }
    }, [user, isLoading, router]);

    // Show loading state while checking authentication
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-neutral-500 text-sm">Verificando sesión...</p>
          </div>
        </div>
      );
    }

    // Don't render the component if user is not authenticated
    if (!user?.isLoggedIn) {
      return null;
    }

    // Render the protected component
    return <Component {...props} />;
  };
}
