import { useState } from 'react';

export const useCurrencyFormat = (initialValue: string = 'R$ 0,00') => {
  const [value, setValue] = useState<string>(initialValue);

  const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    const formatted = (Number(numericValue) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatCurrency(inputValue);
    setValue(formattedValue);
  };

  return { value, setValue, handleChange };
};