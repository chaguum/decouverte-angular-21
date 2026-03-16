import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ProductFilter } from '../../exercise-5.models';
import { Exercise5ProductsStore } from '../../exercise-5-products.store';

@Component({
  selector: 'app-exercise-5-result',
  templateUrl: './exercise-5-result.html',
  styleUrl: './exercise-5-result.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise5Result {
  protected readonly filters = [
    { label: 'Tous', value: 'all' },
    { label: 'Favoris', value: 'favorites' },
    { label: 'Disponibles', value: 'available' }
  ] as const satisfies ReadonlyArray<{ label: string; value: ProductFilter }>;

  protected readonly store = inject(Exercise5ProductsStore);

  protected setFilter(filter: ProductFilter): void {
    this.store.setFilter(filter);
  }
}
