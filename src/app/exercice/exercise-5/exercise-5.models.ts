export type ProductFilter = 'all' | 'favorites' | 'available';

export type LoadStatus = 'idle' | 'pending' | 'fulfilled' | 'error';

export interface CatalogProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
}
