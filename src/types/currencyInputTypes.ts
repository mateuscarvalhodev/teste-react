import { UseFormRegisterReturn } from "react-hook-form";

export type CurrencyInputTypes =  {
  id: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  errorMessage?: string;
  
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};