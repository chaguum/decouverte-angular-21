import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState
} from '@ngrx/signals';

import { CatalogProduct, ProductFilter } from '../../exercise-5.models';
import { withStatus } from '../../exercise-5-status.feature';
import { Exercise5ProductsService } from '../../exercise-5-products.service';

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
    // TODO 1: ajouter withEntities<CatalogProduct>() dans le store,
    // puis utiliser entities() dans les derivees ci-dessous.
    visibleProducts: computed(() => [] as CatalogProduct[]),
    totalProducts: computed(() => 0),
    favoriteCount: computed(() => favoriteIds().length),
    availableFavoritesCount: computed(() => 0)
  })),
  withMethods((store, productsService = inject(Exercise5ProductsService)) => ({
    // TODO 2: completer loadProducts()
    // Attendu:
    // - ne rien faire si les produits sont deja presents
    // - passer le status a pending
    // - incrementer requestCount
    // - appeler productsService.loadProducts()
    // - stocker la collection avec setAllEntities(...)
    // - mettre a jour lastLoadedAt et status
    async loadProducts() {
      patchState(store, {
        status: 'idle',
        errorMessage:
          'A vous de coder loadProducts() dans components/exercise-5-sandbox/exercise-5-products.store.ts.'
      });
    },
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
    // TODO 3: vider aussi la collection d entities et remettre le status a idle.
    clearStore() {
      patchState(store, {
        ...initialState,
        status: 'idle',
        errorMessage: null
      });
    }
  })),
  withHooks({
    // TODO 4: appeler store.loadProducts() ici.
    onInit() {}
  })
);
