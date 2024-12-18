'use client';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import api from '@/services/axiosinstance';
import { ProductCardProps } from '@/types/productType';
import { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios'
import { useRouter } from 'next/navigation'


export const Dashboard = () => {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [productsFiltered, setProductsFiltered] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter()
  const fetchProducts = useCallback(async (query: string = '') => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = query
        ? `/products/search?q=${query}`
        : `/products`;
      const response = await api.get(endpoint);
      setProducts(response.data.products);
      setProductsFiltered(response.data.products);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setError('Erro ao carregar produtos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProduct = useCallback((query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.brand?.toLowerCase().includes(lowercasedQuery) ||
        product.title?.toLowerCase().includes(lowercasedQuery)
    );
    setProductsFiltered(filtered);
    setCurrentPage(1);
  }, [products]);
  const totalPages = Math.ceil(productsFiltered.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return productsFiltered.slice(startIndex, endIndex);
  }, [productsFiltered, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const sortProducts = (type: 'title' | 'brand', direction: 'asc' | 'desc' = 'asc') => {
    const productsSorted = [...productsFiltered].sort((a, b) => {
      if (a[type] && b[type]) {
        const compareResult = a[type].localeCompare(b[type]);
        console.log({ compareResult })
        return direction === 'asc' ? compareResult : -compareResult;
      }
      return 1;
    });
    setProductsFiltered(productsSorted);
  }

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteProduct = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      console.log(`Produto ${id} deletado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao deletar produto ${id}:`, error);
      setError(`Erro ao deletar produto ${id}. Tente novamente.`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: ProductCardProps) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (id: number | undefined, updatedData: Partial<ProductCardProps>) => {
    setLoading(true);
    try {
      const response = await api.put(`/products/${id}`, updatedData);
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? { ...product, ...updatedData } : product))
      );
      setIsModalOpen(false);
      console.log(`Produto ${id} editado com sucesso:`, response.data);
    } catch (error) {
      console.error(`Erro ao editar produto ${id}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = async () => {
    console.log('aaaaa')
    const res = await axios.delete('/api/auth/logout')
    router.push(res.data.redirectTo)
  }


  // const filteredProducts = useMemo(() => productsFiltered, [productsFiltered]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Header onSearch={searchProduct} onSort={sortProducts} onLogout={handleLogout} />

      <div className='flex-grow container mx-auto px-4'>
        {loading ? (
          <p className='text-center'>Carregando produtos...</p>
        ) : error ? (
          <p className='text-center text-red-500'>{error}</p>
        ) : (
          <>
            <div className='p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onDelete={() => handleDeleteProduct(product.id!)}
                  />
                ))
              ) : (
                <p className='text-center'>Nenhum produto encontrado.</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Paginação fixa na parte inferior */}
      {totalPages > 1 && (
        <div className='fixed bottom-0 left-0 w-full bg-white py-4 shadow-md'>
          <div className='flex justify-center'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
