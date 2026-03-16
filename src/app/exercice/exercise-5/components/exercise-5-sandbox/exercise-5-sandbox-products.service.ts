import { computed, inject, Injectable, signal } from '@angular/core';

import { Exercise5ProductsService } from '../../exercise-5-products.service';
import { CatalogProduct, LoadStatus, ProductFilter } from '../../exercise-5.models';

@Injectable()
export class Exercise5SandboxProductsService {
  private readonly productsService = inject(Exercise5ProductsService);

  readonly products = signal<readonly CatalogProduct[]>([]);
  readonly favoriteIds = signal<readonly number[]>([]);
  readonly filter = signal<ProductFilter>('all');
  readonly status = signal<LoadStatus>('idle');
  readonly errorMessage = signal<string | null>(null);
  readonly requestCount = signal(0);
  readonly lastLoadedAt = signal<string | null>(null);

  readonly visibleProducts = computed(() => {
    switch (this.filter()) {
      case 'favorites':
        return this.products().filter((product) => this.favoriteIds().includes(product.id));
      case 'available':
        return this.products().filter((product) => product.available);
      default:
        return this.products();
    }
  });

  readonly totalProducts = computed(() => this.products().length);
  readonly favoriteCount = computed(() => this.favoriteIds().length);
  readonly availableFavoritesCount = computed(() =>
    this.products().filter(
      (product) => this.favoriteIds().includes(product.id) && product.available
    ).length
  );

  async loadProducts(): Promise<void> {
    this.status.set('pending');
    this.errorMessage.set(null);
    this.requestCount.update((count) => count + 1);

    try {
      const products = await this.productsService.loadProducts();

      this.products.set(products);
      this.status.set('fulfilled');
      this.lastLoadedAt.set(new Date().toLocaleTimeString('fr-FR'));
    } catch (error) {
      this.status.set('error');
      this.errorMessage.set(
        error instanceof Error ? error.message : 'Une erreur inconnue est survenue.'
      );
    }
  }

  setFilter(filter: ProductFilter): void {
    this.filter.set(filter);
  }

  toggleFavorite(productId: number): void {
    this.favoriteIds.update((ids) =>
      ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId]
    );
  }

  clearStore(): void {
    this.products.set([]);
    this.favoriteIds.set([]);
    this.filter.set('all');
    this.status.set('idle');
    this.errorMessage.set(null);
    this.requestCount.set(0);
    this.lastLoadedAt.set(null);
  }
}
