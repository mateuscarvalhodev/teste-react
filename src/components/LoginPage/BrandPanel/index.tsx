import React from 'react';
import Image from 'next/image';

export const BrandPanel = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:w-4/5 text-white p-8'>
      <div className='text-center'>
        <Image
          src='/undraw.png'
          width={450}
          height={450}
          className='rounded-lg mx-auto'
          alt='logo'
          priority
        />
        <h1 className='mt-4 text-4xl font-bold text-violet-700'>
          Gestão de <span className='line-through text-purple-400'>Produtos</span> Online
        </h1>

      </div>
    </div>
  );
};