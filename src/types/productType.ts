export type ProductCardProps = {
  id: number;
  category?: string[];
  title: string;
  thumbnail: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  freeShipping?: boolean;
  stock?: number;
  images?: string[];
  rating?: number;
  brand: string;
};