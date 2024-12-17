'use client';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import api from '@/services/axiosinstance';
import { ProductCardProps } from '@/types/productType';
import { useEffect, useState } from 'react';

export const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const dataProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };
    dataProducts();
  }, []);
  return (
    <div>
      <Header />
      <div className='container mx-auto px-4'>
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {products.map((product: ProductCardProps) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              discountPercentage={product.discountPercentage}
              freeShipping={product.freeShipping}
              stock={product.stock}
              image={product.images?.[0] ?? ''}
              images={product.images}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;