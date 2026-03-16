import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import { Exercise5ProductsService } from '../../exercise-5-products.service';
import { CatalogProduct, LoadStatus, ProductFilter } from '../../exercise-5.models';

@Component({
  selector: 'app-exercise-5-sandbox',
  templateUrl: './exercise-5-sandbox.html',
  styleUrl: './exercise-5-sandbox.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise5Sandbox implements OnInit {
  private readonly productsService = inject(Exercise5ProductsService);

  protected readonly filters = [
    { label: 'Tous', value: 'all' },
    { label: 'Favoris', value: 'favorites' },
    { label: 'Disponibles', value: 'available' }
  ] as const satisfies ReadonlyArray<{ label: string; value: ProductFilter }>;

  protected readonly products = signal<readonly CatalogProduct[]>([]);
  protected readonly favoriteIds = signal<readonly number[]>([]);
  protected readonly filter = signal<ProductFilter>('all');
  protected readonly status = signal<LoadStatus>('idle');
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly requestCount = signal(0);
  protected readonly lastLoadedAt = signal<string | null>(null);

  protected readonly visibleProducts = computed(() => {
    switch (this.filter()) {
      case 'favorites':
        return this.products().filter((product) => this.favoriteIds().includes(product.id));
      case 'available':
        return this.products().filter((product) => product.available);
      default:
        return this.products();
    }
  });

  protected readonly totalProducts = computed(() => this.products().length);
  protected readonly favoriteCount = computed(() => this.favoriteIds().length);
  protected readonly availableFavoritesCount = computed(() =>
    this.products().filter(
      (product) => this.favoriteIds().includes(product.id) && product.available
    ).length
  );

  ngOnInit(): void {
    void this.loadProducts();
  }

  protected setFilter(filter: ProductFilter): void {
    this.filter.set(filter);
  }

  protected async loadProducts(): Promise<void> {
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

  protected toggleFavorite(productId: number): void {
    this.favoriteIds.update((ids) =>
      ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId]
    );
  }

  protected clearStore(): void {
    this.products.set([]);
    this.favoriteIds.set([]);
    this.filter.set('all');
    this.status.set('idle');
    this.errorMessage.set(null);
    this.requestCount.set(0);
    this.lastLoadedAt.set(null);
  }
}
