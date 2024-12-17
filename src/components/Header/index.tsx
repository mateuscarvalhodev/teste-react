import React, { useState } from 'react';
import ModalForm from '../ModalCreateProduct';

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className='bg-white border-b border-gray-200 py-2 w-full'>
      <nav className='max-w-screen-xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between w-full space-y-4 sm:space-y-0'>
        <div className='flex items-center space-x-4'>
          <input
            type='text'
            placeholder='Search by title or brand...'
            className='border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
          <button className='inline-flex justify-center items-center border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50'>
            Sort by
            <svg className='ml-2 h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <path d='M19 9l-7 7-7-7' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </button>
        </div>
        <div className='flex items-center space-x-4'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='bg-purple-700 text-white font-semibold px-4 py-2 rounded-md flex items-center hover:bg-purple-600 transition'
          >
            Adicione um novo produto
          </button>
        </div>
        <button className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition'>Logout</button>
      </nav>

      <ModalForm open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;