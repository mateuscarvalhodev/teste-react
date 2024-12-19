/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import api from '@/services/axiosinstance';
import { Input } from '../ui/input';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../ui/alert-dialog';
import { ProductCardProps } from '@/types/productType';
import { useCurrencyFormat } from '@/hooks/useCurrency';
import { CurrencyInputTypes } from '@/types/currencyInputTypes';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MultiSelectDropdown } from '@/components/ui/multi-select'

type ModalEditProps = {
  open: boolean;
  onClose: () => void;
  product: ProductCardProps | null;
  onSave: (id: number) => void;
  setProductState: React.Dispatch<React.SetStateAction<ProductCardProps[]>>
};

const CurrencyInput = ({ id, placeholder, value, onChange, errorMessage }: CurrencyInputTypes) => (
  <div>
    <Input
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='border-gray-300 focus:ring-purple-400 focus:border-purple-500 rounded-md px-3 py-2 text-sm'
    />
    {errorMessage && <p className='text-red-500 text-sm'>{errorMessage}</p>}
  </div>
);

function ModalEdit({ open, onClose, product, onSave, setProductState }: ModalEditProps) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProductCardProps>();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const { value: priceValue, handleChange: handlePriceChange, setValue: setPriceValue } = useCurrencyFormat('R$ 0,00');

  const { toast } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/products/category-list');
        setCategories(response.data);
      } catch (error) {
        toast({ title: 'Erro', description: 'Erro ao buscar categorias.', variant: 'destructive' });
      }
    };
    setSelectedCategories([])

    if (open) {
      fetchCategories();
    }

  }, [open, toast]);

  useEffect(() => {
    if (product) {
      reset(product);
      setPriceValue(`R$ ${product.price?.toFixed(2) ?? '0,00'}`);
    }
  }, [product, reset, setPriceValue]);

  const onSubmit = async (data: ProductCardProps) => {
    try {
      setLoading(true);
      const formattedPrice = Number(priceValue.replace(/[^\d]/g, '')) / 100;

      const payload: Partial<ProductCardProps> = { ...data, price: formattedPrice, category: selectedCategories };
      delete payload.id
      const { data: product } = await api.put<ProductCardProps>(`/products/${data.id}`, payload)
      console.log({ product })
      setProductState((prev) => {
        const filteredPrevProducts = prev.filter((prevProduct) => prevProduct.id !== product.id)
        return [...filteredPrevProducts, product]
      })

      toast({
        title: 'Sucesso',
        description: 'Produto atualizado com sucesso!',
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar produto. Tente novamente.',
        variant: 'destructive',
      });
      console.error('Erro ao atualizar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar Produto</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <Label htmlFor='title'>Título</Label>
            <Input
              id='title'
              className='border-gray-300 focus:ring-purple-400 focus:border-purple-500 rounded-md px-3 py-2 text-sm'
              placeholder='Digite o título'
              {...register('title', { required: true })}
            />
            {errors.title && <p className='text-red-500 text-sm'>Título é obrigatório.</p>}
          </div>
          <div>
            <Label htmlFor='brand'>Brand</Label>
            <Input
              id='brand'
              className='border-gray-300 focus:ring-purple-400 focus:border-purple-500 rounded-md px-3 py-2 text-sm'
              placeholder='Digite o brand'
              {...register('brand', { required: true })}
            />
            {errors.brand && <p className='text-red-500 text-sm'>Brand é obrigatório.</p>}
          </div>
          <div>
            <Label htmlFor='price'>Preço</Label>
            <CurrencyInput
              id='price'
              placeholder='Digite o preço'
              value={priceValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handlePriceChange(e);
                const numericValue = Number(e.target.value.replace(/[^\d]/g, '')) / 100;
                setValue('price', numericValue);
              }}
              errorMessage={errors.price?.message}
            />
          </div>
          <div>
            <Label htmlFor='description'>Descrição</Label>
            <Input
              id='description'
              className='border-gray-300 focus:ring-purple-400 focus:border-purple-500 rounded-md px-3 py-2 text-sm'
              placeholder='Digite a descrição'
              {...register('description')}
            />
          </div>
          <div>
            <MultiSelectDropdown categories={categories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
            {errors.category && <p className='text-red-500 text-sm'>Categoria é obrigatória.</p>}
          </div>
          <AlertDialogFooter>
            <Button type='button' variant='ghost' onClick={onClose}>
              Cancelar
            </Button>
            <Button className='bg-purple-500 hover:bg-purple-800' type='submit' disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ModalEdit;