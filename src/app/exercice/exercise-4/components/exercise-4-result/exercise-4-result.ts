import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';

import { Exercise4ProductStreamService } from '../../exercise-4-product-stream.service';

@Component({
  selector: 'app-exercise-4-result',
  imports: [FormsModule],
  templateUrl: './exercise-4-result.html',
  styleUrl: './exercise-4-result.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise4Result {
  private readonly title = inject(Title);
  private readonly productStream = inject(Exercise4ProductStreamService);

  protected readonly searchTerm = signal('');
  protected readonly products = toSignal(this.productStream.products$, {
    initialValue: []
  });

  protected readonly filteredProducts = computed(() => {
    const normalizedSearch = this.searchTerm().trim().toLowerCase();

    return this.products().filter((product) => {
      return (
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch)
      );
    });
  });

  protected readonly resultsCount = computed(() => this.filteredProducts().length);
  protected readonly pageTitle = computed(() => `Suggestions produits (${this.resultsCount()})`);
  protected readonly isLoading = computed(
    () => this.products().length === 0 && this.searchTerm().trim().length === 0
  );

  constructor() {
    effect(() => {
      this.title.setTitle(this.pageTitle());
    });
  }
}
