export interface ProductMarket {
  market: string;
  division?: string;
  district?: string;
  location?: string;
  min: number;
  max: number;
}

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
  categoryName?: string;
  categoryIcon?: string;
  unit: string;
  description?: string;
  image?: string;
  emoji?: string;
  price?: number;
  change?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  markets?: ProductMarket[];
  prices?: ProductPrice[];
}

