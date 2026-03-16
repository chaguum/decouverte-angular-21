import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState
} from '@ngrx/signals';

import { fetchExercise5Products } from './exercise-5.fake-api';
import { CatalogProduct, ProductFilter } from './exercise-5.models';
import { withStatus } from './exercise-5-status.feature';

type Exercise5State = {
  products: readonly CatalogProduct[];
  favoriteIds: readonly number[];
  filter: ProductFilter;
  requestCount: number;
  lastLoadedAt: string | null;
};

const initialState: Exercise5State = {
  products: [],
  favoriteIds: [],
  filter: 'all',
  requestCount: 0,
  lastLoadedAt: null
};

export const Exercise5ProductsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withStatus(),
  withComputed(({ favoriteIds, filter, products }) => ({
    favoriteProducts: computed(() =>
      products().filter((product) => favoriteIds().includes(product.id))
    ),
    visibleProducts: computed(() => {
      switch (filter()) {
        case 'favorites':
          return products().filter((product) => favoriteIds().includes(product.id));
        case 'available':
          return products().filter((product) => product.available);
        default:
          return products();
      }
    }),
    favoriteCount: computed(() => favoriteIds().length),
    availableFavoritesCount: computed(() =>
      products().filter(
        (product) => favoriteIds().includes(product.id) && product.available
      ).length
    )
  })),
  withMethods((store) => {
    const performLoad = async (force = false, shouldFail = false) => {
      if (!force && store.products().length > 0) {
        patchState(store, {
          status: 'fulfilled',
          errorMessage: null
        });
        return;
      }

      const nextRequestCount = store.requestCount() + 1;

      patchState(store, {
        status: 'pending',
        errorMessage: null,
        requestCount: nextRequestCount
      });

      try {
        const products = await fetchExercise5Products({ shouldFail });

        patchState(store, {
          products,
          lastLoadedAt: new Date().toLocaleTimeString('fr-FR'),
          status: 'fulfilled',
          errorMessage: null
        });
      } catch (error) {
        patchState(store, {
          status: 'error',
          errorMessage:
            error instanceof Error ? error.message : 'Une erreur inconnue est survenue.'
        });
      }
    };

    return {
      async loadProducts() {
        await performLoad(false);
      },
      async reloadProducts() {
        await performLoad(true);
      },
      async simulateErrorReload() {
        await performLoad(true, true);
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
      clearStore() {
        patchState(store, {
          ...initialState,
          status: 'idle',
          errorMessage: null
        });
      }
    };
  }),
  withHooks({
    onInit(store) {
      void store.loadProducts();
    }
  })
);
