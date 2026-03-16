import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState
} from '@ngrx/signals';

import { CatalogProduct, ProductFilter } from './exercise-5.models';
import { withStatus } from './exercise-5-status.feature';

type Exercise5StarterState = {
  favoriteIds: readonly number[];
  filter: ProductFilter;
  requestCount: number;
  lastLoadedAt: string | null;
};

const initialState: Exercise5StarterState = {
  favoriteIds: [],
  filter: 'all',
  requestCount: 0,
  lastLoadedAt: null
};

// Fichier a completer pendant l exercice.
// Objectif: transformer ce squelette en vrai NgRx Signal Store.
export const Exercise5ProductsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withStatus(),
  withComputed(({ favoriteIds }) => ({
    // TODO 1: ajouter withEntities<CatalogProduct>() dans le store
    // puis utiliser entities() dans ces derivees.
    visibleProducts: computed(() => [] as CatalogProduct[]),
    totalProducts: computed(() => 0),
    favoriteCount: computed(() => favoriteIds().length),
    availableFavoritesCount: computed(() => 0)
  })),
  withMethods((store) => ({
    // TODO 2: charger les produits avec fetchExercise5Products()
    // et stocker la collection avec setAllEntities().
    async loadProducts() {
      patchState(store, {
        status: 'idle',
        errorMessage: 'A vous de coder loadProducts() dans exercise-5-products.store.ts.'
      });
    },
    // TODO 3: forcer un nouveau chargement.
    async reloadProducts() {
      patchState(store, {
        status: 'idle',
        errorMessage: 'A vous de coder reloadProducts() dans exercise-5-products.store.ts.'
      });
    },
    // TODO 4: simuler un chargement en erreur.
    async simulateErrorReload() {
      patchState(store, {
        status: 'error',
        errorMessage: 'La simulation d erreur doit etre implemente dans le starter store.'
      });
    },
    // TODO 5: completer le toggle des favoris.
    toggleFavorite(productId: number) {
      const isFavorite = store.favoriteIds().includes(productId);

      patchState(store, {
        favoriteIds: isFavorite
          ? store.favoriteIds().filter((id) => id !== productId)
          : [...store.favoriteIds(), productId]
      });
    },
    setFilter(filter: ProductFilter) {
      patchState(store, { filter });
    },
    // TODO 6: vider aussi la collection d entities et reinitialiser le status.
    clearStore() {
      patchState(store, {
        ...initialState,
        status: 'idle',
        errorMessage: null
      });
    }
  })),
  withHooks({
    // TODO 7: appeler store.loadProducts() ici.
    onInit() {}
  })
);
