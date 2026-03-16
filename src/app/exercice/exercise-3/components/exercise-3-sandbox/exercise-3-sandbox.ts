import { Component, inject, OnInit } from '@angular/core';
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
  selector: 'app-exercise-3-sandbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './exercise-3-sandbox.html',
  styleUrl: './exercise-3-sandbox.css'
})
export class Exercise3Sandbox implements OnInit {
  private readonly title = inject(Title);

  protected searchTerm = '';
  protected selectedCategory: ProductCategory = 'all';
  protected displayedProducts: Product[] = [];
  protected resultsCount = 0;
  protected availableProductsCount = 0;
  protected pageTitle = 'Catalogue produits (0)';
  protected showOutOfSyncWarning = false;

  protected readonly steps = [
    'Transformer searchTerm et selectedCategory en signals.',
    'Transformer la liste filtree en computed plutot qu en recalcul manuel.',
    'Creer les compteurs et le titre de page en computed.',
    'Utiliser un effect pour synchroniser le titre de page.',
    'Tester le bouton de reset: la sandbox peut se desynchroniser, le resultat non.'
  ] as const;

  protected readonly categoryOptions = [
    { label: 'Toutes les categories', value: 'all' },
    { label: 'Hardware', value: 'hardware' },
    { label: 'Audio', value: 'audio' },
    { label: 'Office', value: 'office' }
  ] as const;

  protected readonly products: Product[] = [
    { id: 1, name: 'Clavier mecanique', category: 'hardware', price: 139, available: true },
    { id: 2, name: 'Souris verticale', category: 'hardware', price: 69, available: true },
    { id: 3, name: 'Casque antibruit', category: 'audio', price: 219, available: false },
    { id: 4, name: 'Webcam 4K', category: 'office', price: 149, available: true }
  ];

  ngOnInit(): void {
    this.refreshDerivedState();
  }

  protected onSearchChange(value: string): void {
    this.searchTerm = value;
    this.refreshDerivedState();
  }

  protected onCategoryChange(value: ProductCategory): void {
    this.selectedCategory = value;
    this.refreshDerivedState();
  }

  protected resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.showOutOfSyncWarning = true;
  }

  private get filteredProducts(): Product[] {
    const search = this.searchTerm.trim().toLowerCase();

    return this.products.filter((product) => {
      const matchesSearch =
        search.length === 0 ||
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search);
      const matchesCategory =
        this.selectedCategory === 'all' || product.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  private refreshDerivedState(): void {
    this.displayedProducts = this.filteredProducts;
    this.resultsCount = this.displayedProducts.length;
    this.availableProductsCount = this.displayedProducts.filter((product) => product.available).length;
    this.pageTitle = `Catalogue produits (${this.resultsCount})`;
    this.title.setTitle(this.pageTitle);
    this.showOutOfSyncWarning = false;
  }
}
