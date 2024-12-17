import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = localStorage.getItem('isAuthenticated');

        if (authStatus === 'true') {
          setIsAuthenticated(true);
          await router.push('/dashboard');
        } else {
          setIsAuthenticated(false);
          await router.push('/');
        }
      } catch (error) {
        console.error('Auth error:', error);
        setIsAuthenticated(false);
        await router.push('/');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  return { loading, isAuthenticated };
};
