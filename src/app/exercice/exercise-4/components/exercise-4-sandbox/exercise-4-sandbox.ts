import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  Exercise4ProductStreamService,
  SuggestedProduct
} from '../../exercise-4-product-stream.service';

@Component({
  selector: 'app-exercise-4-sandbox',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './exercise-4-sandbox.html',
  styleUrl: './exercise-4-sandbox.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise4Sandbox {
  private readonly title = inject(Title);
  private readonly productStream = inject(Exercise4ProductStreamService);
  private readonly searchTermSubject = new BehaviorSubject<string>('');

  protected searchTerm = '';

  protected readonly steps = [
    'Observer que la source de donnees est un Observable fourni par un service.',
    'Remplacer la consommation RxJS du composant par toSignal().',
    'Garder le flux source en Observable dans le service.',
    'Deriver le filtre local avec computed() plutot qu avec combineLatest().',
    'Conserver le meme rendu et la meme mise a jour du titre.'
  ] as const;

  protected readonly products$ = this.productStream.products$;
  protected readonly filteredProducts$ = combineLatest([
    this.products$,
    this.searchTermSubject.pipe(startWith(''))
  ]).pipe(
    map(([products, searchTerm]) => this.filterProducts(products, searchTerm))
  );
  protected readonly resultsCount$ = this.filteredProducts$.pipe(map((products) => products.length));
  protected readonly pageTitle$ = this.resultsCount$.pipe(
    map((count) => `Suggestions produits (${count})`)
  );

  constructor() {
    this.pageTitle$.pipe(takeUntilDestroyed()).subscribe((pageTitle) => {
      this.title.setTitle(pageTitle);
    });
  }

  protected onSearchChange(value: string): void {
    this.searchTerm = value;
    this.searchTermSubject.next(value);
  }

  private filterProducts(
    products: readonly SuggestedProduct[],
    searchTerm: string
  ): readonly SuggestedProduct[] {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      return (
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch)
      );
    });
  }
}
