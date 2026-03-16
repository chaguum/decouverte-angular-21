import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { fetchExercise5Products } from '../../exercise-5.fake-api';
import { CatalogProduct, LoadStatus, ProductFilter } from '../../exercise-5.models';

@Component({
  selector: 'app-exercise-5-sandbox',
  templateUrl: './exercise-5-sandbox.html',
  styleUrl: './exercise-5-sandbox.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise5Sandbox implements OnInit {
  protected readonly filters = [
    { label: 'Tous', value: 'all' },
    { label: 'Favoris', value: 'favorites' },
    { label: 'Disponibles', value: 'available' }
  ] as const satisfies ReadonlyArray<{ label: string; value: ProductFilter }>;

  protected products: readonly CatalogProduct[] = [];
  protected favoriteIds: readonly number[] = [];
  protected filter: ProductFilter = 'all';
  protected status: LoadStatus = 'idle';
  protected errorMessage: string | null = null;
  protected requestCount = 0;
  protected lastLoadedAt: string | null = null;

  protected get visibleProducts(): readonly CatalogProduct[] {
    switch (this.filter) {
      case 'favorites':
        return this.products.filter((product) => this.favoriteIds.includes(product.id));
      case 'available':
        return this.products.filter((product) => product.available);
      default:
        return this.products;
    }
  }

  protected get favoriteCount(): number {
    return this.favoriteIds.length;
  }

  protected get availableFavoritesCount(): number {
    return this.products.filter(
      (product) => this.favoriteIds.includes(product.id) && product.available
    ).length;
  }

  ngOnInit(): void {
    void this.loadProducts();
  }

  protected async loadProducts(shouldFail = false): Promise<void> {
    this.status = 'pending';
    this.errorMessage = null;
    this.requestCount += 1;

    try {
      this.products = await fetchExercise5Products({ shouldFail });
      this.status = 'fulfilled';
      this.lastLoadedAt = new Date().toLocaleTimeString('fr-FR');
    } catch (error) {
      this.status = 'error';
      this.errorMessage =
        error instanceof Error ? error.message : 'Une erreur inconnue est survenue.';
    }
  }

  protected setFilter(filter: ProductFilter): void {
    this.filter = filter;
  }

  protected toggleFavorite(productId: number): void {
    const isFavorite = this.favoriteIds.includes(productId);
    this.favoriteIds = isFavorite
      ? this.favoriteIds.filter((id) => id !== productId)
      : [...this.favoriteIds, productId];
  }
}
