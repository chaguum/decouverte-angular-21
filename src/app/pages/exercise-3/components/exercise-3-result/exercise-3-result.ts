import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

type ProductCategory = 'all' | 'hardware' | 'audio' | 'office';

interface Product {
  id: number;
  name: string;
  category: Exclude<ProductCategory, 'all'>;
  price: number;
  available: boolean;
}

@Component({
  selector: 'app-exercise-3-result',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './exercise-3-result.html',
  styleUrl: './exercise-3-result.css'
})
export class Exercise3Result {
  private readonly title = inject(Title);

  protected readonly searchTerm = signal('');
  protected readonly selectedCategory = signal<ProductCategory>('all');

  protected readonly categoryOptions = [
    { label: 'Toutes les categories', value: 'all' },
    { label: 'Hardware', value: 'hardware' },
    { label: 'Audio', value: 'audio' },
    { label: 'Office', value: 'office' }
  ] as const;

  protected readonly products = signal<Product[]>([
    { id: 1, name: 'Clavier mecanique', category: 'hardware', price: 139, available: true },
    { id: 2, name: 'Souris verticale', category: 'hardware', price: 69, available: true },
    { id: 3, name: 'Casque antibruit', category: 'audio', price: 219, available: false },
    { id: 4, name: 'Webcam 4K', category: 'office', price: 149, available: true }
  ]);

  protected readonly filteredProducts = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const category = this.selectedCategory();

    return this.products().filter((product) => {
      const matchesSearch =
        search.length === 0 ||
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search);
      const matchesCategory = category === 'all' || product.category === category;

      return matchesSearch && matchesCategory;
    });
  });

  protected readonly resultsCount = computed(() => this.filteredProducts().length);
  protected readonly availableProductsCount = computed(
    () => this.filteredProducts().filter((product) => product.available).length
  );
  protected readonly pageTitle = computed(() => `Catalogue produits (${this.resultsCount()})`);

  constructor() {
    effect(() => {
      this.title.setTitle(this.pageTitle());
    });
  }

  protected resetFilters(): void {
    this.searchTerm.set('');
    this.selectedCategory.set('all');
  }
}
