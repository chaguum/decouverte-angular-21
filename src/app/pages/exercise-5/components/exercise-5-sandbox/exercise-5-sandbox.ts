import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { ProductFilter } from '../../exercise-5.models';
import { Exercise5ProductsService } from './exercise-5-products.service';

@Component({
  selector: 'app-exercise-5-sandbox',
  templateUrl: './exercise-5-sandbox.html',
  styleUrl: './exercise-5-sandbox.css',
  providers: [Exercise5ProductsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise5Sandbox implements OnInit {
  protected readonly filters = [
    { label: 'Tous', value: 'all' },
    { label: 'Favoris', value: 'favorites' },
    { label: 'Disponibles', value: 'available' }
  ] as const satisfies ReadonlyArray<{ label: string; value: ProductFilter }>;
  protected readonly service = inject(Exercise5ProductsService);

  ngOnInit(): void {
    void this.service.loadProducts();
  }

  protected setFilter(filter: ProductFilter): void {
    this.service.setFilter(filter);
  }
}
