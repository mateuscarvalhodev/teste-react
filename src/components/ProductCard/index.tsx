import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import Image from 'next/image';
import { ProductCardProps } from '@/types/productType';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

interface ProductCardPropsWithActions extends ProductCardProps {
  onDelete: () => void;
  onEdit: (id: number) => void;
}

const ProductCard = ({
  thumbnail,
  brand,
  title,
  description,
  price,
  discountPercentage = 0,
  freeShipping = false,
  stock,
  rating = 0,
  onDelete,
  onEdit,
  id
}: ProductCardPropsWithActions) => {
  const hasDiscount = discountPercentage > 0;
  const discountedPrice = hasDiscount
    ? (price * (1 - discountPercentage / 100)).toFixed(2)
    : price.toFixed(2);

  const hearts = Array.from({ length: 5 }, (_, i) => {
    const heartIndex = i + 1;
    if (rating >= heartIndex) {
      return <span key={i} className='text-purple-700 text-xl'>♥</span>;
    } else if (rating >= heartIndex - 0.5) {
      return <span key={i} className='text-purple-300 text-xl'>♥</span>;
    } else {
      return <span key={i} className='text-gray-300 text-xl'>♥</span>;
    }
  });

  const handleEditClick = (id: number) => {
    onEdit(id);
  };
  return (
    <Card className='min-w-full max-w-full min-h-full max-h-full rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow flex flex-col'>
      <CardHeader className='p-0 relative'>
        <div className='relative w-full h-48'>
          <Image
            src={thumbnail ?? ''}
            alt={title}
            layout='fill'
            objectFit='contain'
            className='bg-gray-50'
          />
        </div>

        <div className='absolute top-2 right-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='bg-purple-100 hover:bg-purple-800 rounded-full'>
                <MoreHorizontal className='w-5 h-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-32'>
              <DropdownMenuItem onClick={() => handleEditClick(id)}>Editar</DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className='text-red-500'>
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className='p-4 flex-grow flex flex-col'>
        <h2 className='text-lg font-bold text-purple-700 line-clamp-2'>{title}</h2>

        {description && <p className='text-sm text-gray-600 line-clamp-2 mt-2'>{description}</p>}

        {freeShipping && (
          <div className='mt-2 mb-1 inline-block bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded'>
            Frete grátis
          </div>
        )}

        <div className='mt-3'>
          <div className='flex space-x-1'>{hearts}</div>
        </div>

        <span className='text-xs text-purple-500 mt-2'>{brand}</span>
        <div className='flex items-center justify-between mt-3'>
          <div>
            {hasDiscount && (
              <span className='text-gray-500 line-through text-sm'>R$ {price.toFixed(2)}</span>
            )}
            <div className='flex items-center'>
              <span className='text-xl font-bold text-purple-700'>R$ {discountedPrice}</span>
              {hasDiscount && (
                <span className='ml-2 text-xs text-white bg-purple-400 px-2 py-1 rounded'>
                  -{discountPercentage}%
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <div className='p-4  border-gray-200'>
        {stock !== undefined && stock > 0 && (
          <p className='text-xs text-gray-500'>
            {stock === 1 ? 'Resta 1 unidade' : `Restam ${stock} unidades`}
          </p>
        )}
        {stock === 0 && <p className='text-xs text-red-500 font-semibold'>Esgotado</p>}
      </div>
    </Card>
  );
};

export default ProductCard;