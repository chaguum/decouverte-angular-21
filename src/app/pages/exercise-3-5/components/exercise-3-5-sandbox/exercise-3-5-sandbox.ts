import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { Exercise35SandboxSummary } from '../exercise-3-5-sandbox-summary/exercise-3-5-sandbox-summary';

type ProductCategory = 'all' | 'hardware' | 'audio' | 'office';

interface Product {
  id: number;
  name: string;
  category: Exclude<ProductCategory, 'all'>;
  price: number;
  available: boolean;
}

@Component({
  selector: 'app-exercise-3-5-sandbox',
  imports: [FormsModule, Exercise35SandboxSummary],
  templateUrl: './exercise-3-5-sandbox.html',
  styleUrl: './exercise-3-5-sandbox.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise35Sandbox {
  private readonly title = inject(Title);

  protected readonly searchTerm = signal('');
  protected readonly selectedCategory = signal<ProductCategory>('all');
  protected readonly availableOnly = signal(false);

  protected readonly steps = [
    'Garder le parent en Signals, il est deja moderne.',
    'Ouvrir le composant enfant de resume et remplacer @Input par input().',
    'Remplacer @Output et EventEmitter par output().',
    'Conserver la meme communication avec le parent pour le filtre "uniquement disponibles".',
    'Verifier que le compteur, le titre de page et la liste repondent toujours aux filtres.'
  ] as const;

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
    const onlyAvailable = this.availableOnly();

    return this.products().filter((product) => {
      const matchesSearch =
        search.length === 0 ||
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search);
      const matchesCategory = category === 'all' || product.category === category;
      const matchesAvailability = !onlyAvailable || product.available;

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  });

  protected readonly resultsCount = computed(() => this.filteredProducts().length);
  protected readonly pageTitle = computed(() => `Catalogue produits (${this.resultsCount()})`);

  constructor() {
    effect(() => {
      this.title.setTitle(this.pageTitle());
    });
  }
}
