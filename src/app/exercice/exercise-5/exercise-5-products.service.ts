import { Injectable } from '@angular/core';

import { fetchExercise5Products } from './exercise-5.fake-api';
import { CatalogProduct } from './exercise-5.models';

@Injectable({ providedIn: 'root' })
export class Exercise5ProductsService {
  loadProducts(): Promise<readonly CatalogProduct[]> {
    return fetchExercise5Products();
  }
}
