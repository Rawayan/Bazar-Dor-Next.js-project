export interface ProductPrice {
  market: string;
  price: number;
  change: number;
}

export interface Product {
  id: number | string;
  name: string;
  slug: string;
  category: string;
  unit: string;
  description?: string;
  image?: string;
  emoji?: string;
  prices?: ProductPrice[];
  price?: number;
  change?: number;
}
