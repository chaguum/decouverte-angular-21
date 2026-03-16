import { computed, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { WORKSHOP_TOPICS } from './workshop-topics';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly router = inject(Router);
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
      map(() => this.router.url)
    ),
    { initialValue: this.router.url }
  );

  protected readonly title = 'ATOS Angular 21 Workshop';
  protected readonly topics = WORKSHOP_TOPICS;
  protected readonly currentExercisePath = computed(() => {
    const path = this.currentUrl().split('?')[0] ?? '';
    return /^\/exercise-\d+(?:-\d+)?$/.test(path) ? path : null;
  });
  protected readonly isExerciseRoute = computed(() => this.currentExercisePath() !== null);
  protected readonly exerciseViewMode = computed<'sandbox' | 'result'>(() => {
    const view = this.router.parseUrl(this.currentUrl()).queryParams['view'];
    return view === 'result' ? 'result' : 'sandbox';
  });
}
