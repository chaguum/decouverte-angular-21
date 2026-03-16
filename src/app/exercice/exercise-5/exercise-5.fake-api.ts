import { CatalogProduct } from './exercise-5.models';

const PRODUCTS: readonly CatalogProduct[] = [
  { id: 1, name: 'Clavier mecanique', category: 'Accessoire', price: 129, available: true },
  { id: 2, name: 'Souris verticale', category: 'Accessoire', price: 69, available: true },
  { id: 3, name: 'Ecran 27 pouces', category: 'Materiel', price: 289, available: false },
  { id: 4, name: 'Webcam 4K', category: 'Materiel', price: 159, available: true }
] as const;

export function fetchExercise5Products(options: {
  shouldFail?: boolean;
} = {}): Promise<readonly CatalogProduct[]> {
  const { shouldFail = false } = options;

  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Chargement impossible pour la demonstration.'));
        return;
      }

      resolve(PRODUCTS);
    }, 500);
  });
}
