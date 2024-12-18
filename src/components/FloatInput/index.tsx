import { FloatingInputProps } from '@/types/floatingInputTypes';
import React from 'react';

const FloatingInput = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error = false,
}: FloatingInputProps) => {
  return (
    <div className='relative mb-4'>
      <input
        type={type}
        id={id}
        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm 
        text-gray-900 bg-transparent rounded-lg border 
        appearance-none focus:outline-none focus:ring-0 peer
        ${error ?
            'border-red-500 focus:border-red-500' :
            'border-gray-300 dark:border-gray-600 focus:border-purple-600 dark:focus:border-purple-500'
          }
        `}
        placeholder=' '
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className={`absolute text-sm 
        ${error ? 'text-red-500 peer-focus:text-red-500' : 'text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 dark:peer-focus:text-blue-500'} 
        duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white 
        dark: px-2 peer-focus:px-2 
        peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
        peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
        peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;