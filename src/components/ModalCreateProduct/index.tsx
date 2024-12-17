// ModalForm.tsx
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import api from '@/services/axiosinstance';
import { Input } from '../ui/input';
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { ProductCardProps } from '@/types/productType';


type ModalFormProps = {
  open: boolean;
  onClose: () => void;
};

const ModalForm: React.FC<ModalFormProps> = ({ open, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductCardProps>();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/products/category-list');
        setCategories(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    if (open) {
      fetchCategories();
    }
  }, [open]);
  const onSubmit = async (data: ProductCardProps) => {
    try {
      setLoading(true);
      const response = await api.post('/products/add', data);
      console.log('Produto adicionado com sucesso:', response.data);
      reset();
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Adicionar Novo Produto</AlertDialogTitle>
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
            <Label htmlFor='price'>Preço</Label>
            <Input
              id='price'
              type='number'
              className='border-gray-300 focus:ring-purple-400 focus:border-purple-500 rounded-md px-3 py-2 text-sm'
              placeholder='Digite o preço'
              {...register('price', { required: true, valueAsNumber: true })}
            />
            {errors.price && <p className='text-red-500 text-sm'>Preço é obrigatório.</p>}
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
            <Label htmlFor='category'>Categoria</Label>
            <select
              id='category'
              className='w-full border border-gray-300 focus:ring-purple-400 focus:border-purple-500 rounded-md px-3 py-2 text-sm'
              {...register('category', { required: true })}
            >
              <option value=''>Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
};

export default ModalForm;