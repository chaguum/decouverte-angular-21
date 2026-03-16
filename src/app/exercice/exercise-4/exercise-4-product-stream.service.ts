import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, shareReplay } from 'rxjs/operators';

export type ProductCategory = 'hardware' | 'audio' | 'office';

export interface SuggestedProduct {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  available: boolean;
}

@Injectable({ providedIn: 'root' })
export class Exercise4ProductStreamService {
  private readonly seedProducts: readonly SuggestedProduct[] = [
    { id: 1, name: 'Clavier mecanique', category: 'hardware', price: 139, available: true },
    { id: 2, name: 'Souris verticale', category: 'hardware', price: 69, available: true },
    { id: 3, name: 'Casque antibruit', category: 'audio', price: 219, available: false },
    { id: 4, name: 'Lampe de bureau', category: 'office', price: 89, available: true }
  ];

  readonly products$: Observable<readonly SuggestedProduct[]> = of(this.seedProducts).pipe(
    delay(350),
    shareReplay({ bufferSize: 1, refCount: true })
  );
}
