import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import Image from 'next/image';
import { ProductCardProps } from '@/types/productType';

const ProductCard = ({
  image,
  title,
  description,
  price,
  discountPercentage = 0,
  freeShipping = false,
  stock,
  rating = 0,
}: ProductCardProps) => {
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

  return (
    <Card className='w-full max-w-xs rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow'>
      <CardHeader className='p-0'>
        <div className='relative w-full h-48'>
          <Image
            src={image ?? ''}
            alt={title}
            layout='fill'
            objectFit='contain'
            className='bg-gray-50'
          />
        </div>
      </CardHeader>

      <CardContent className='p-4'>
        <h2 className='text-lg font-bold text-purple-700 line-clamp-2'>
          {title}
        </h2>

        {description && (
          <p className='text-sm text-gray-600 line-clamp-2 mt-2'>
            {description}
          </p>
        )}

        {freeShipping && (
          <div className='mt-2 mb-1 inline-block bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded'>
            Frete grátis
          </div>
        )}

        <div className='flex items-center justify-between mt-3'>
          <div>
            <div className='flex space-x-1 mt-2'>{hearts}</div>
            {hasDiscount && (
              <span className='text-gray-500 line-through text-sm'>
                R$ {price.toFixed(2)}
              </span>
            )}
            <div className='flex items-center'>
              <span className='text-xl font-bold text-purple-700'>
                R$ {discountedPrice}
              </span>
              {hasDiscount && (
                <span className='ml-2 text-xs text-white bg-purple-400 px-2 py-1 rounded'>
                  -{discountPercentage}%
                </span>
              )}
            </div>
          </div>
        </div>

        {stock !== undefined && stock > 0 && (
          <p className='text-xs text-gray-500 mt-2'>Restam {stock} unidades</p>
        )}
        {stock === 0 && (
          <p className='text-xs text-red-500 font-semibold mt-2'>Esgotado</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;