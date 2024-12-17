'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

import { BrandPanel } from '@/components/LoginPage/BrandPanel';
import { LoginForm } from '@/components/LoginPage/LoginForm';
import { Loader } from '@/components/Loader';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  // const router = useRouter();
  const { loading: authLoading } = useAuth();

  // useEffect(() => {
  //   if (!authLoading && isAuthenticated) {
  //     router.push('/dashboard');
  //   }
  // }, [authLoading, isAuthenticated, router]);

  if (authLoading) {
    return <Loader />;
  }

  // if (isAuthenticated) {
  //   return null;
  // }

  return (
    <div className='flex items-center justify-center h-screen bg-white'>
      <div className='flex flex-col md:flex-row w-full h-full'>

        <BrandPanel />
        <div className='flex items-center justify-center w-full md:w-3/5 p-8'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}