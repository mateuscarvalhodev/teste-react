import React, { useState, useEffect, useCallback } from 'react';
import ModalForm from '../ModalCreateProduct';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { ProductCardProps } from '@/types/productType';


type HeaderProps = {
  onSearch: (query: string) => void;
  onSort: (type: 'title' | 'brand', order: 'asc' | 'desc') => void;
  onLogout: () => void;
  setProductsState: React.Dispatch<React.SetStateAction<ProductCardProps[]>>
};

export const Header = ({ onSearch, onSort, onLogout, setProductsState }: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('Ordenar por');

  const handleSearch = useCallback(() => {
    onSearch(searchQuery);
  }, [onSearch, searchQuery]);

  const handleSort = (sortBy: 'title' | 'brand', order: 'asc' | 'desc' = 'asc') => {
    setSelectedSort(sortBy);
    onSort(sortBy, order);
  };

  const handleLogout = async () => {
    onLogout()
  }

  useEffect(() => {
    handleSearch();
  }, [searchQuery, handleSearch]);

  return (
    <header className='bg-white border-b border-gray-200 py-2 w-full'>
      <nav className='max-w-screen-xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between w-full space-y-4 sm:space-y-0'>
        <div className='flex items-center space-x-4'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search by title or brand...'
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className='border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className='inline-flex justify-center items-center border border-gray-300 px-3 py-2 rounded-md hover:bg-purple-500'
              >
                {selectedSort}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-32'>
              <DropdownMenuItem onClick={() => handleSort('title')}>Nome Crescente</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('title', 'desc')}>Nome Decrescente</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('brand')}>Brand Crescente</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('brand', 'desc')}>Brand Decrescente</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex items-center space-x-4'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='bg-purple-700 text-white font-semibold px-4 py-2 rounded-md flex items-center hover:bg-purple-600 transition'
          >
            Adicione um novo produto
          </button>
        </div>
        <button
          onClick={() => handleLogout()}
          className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition'
        >
          Logout
        </button>
      </nav>

      <ModalForm open={isModalOpen} onClose={() => setIsModalOpen(false)} setProductsState={setProductsState} />
    </header>
  );
};

export default Header;