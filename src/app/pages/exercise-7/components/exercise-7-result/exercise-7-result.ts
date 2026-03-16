import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  signal,
  viewChild,
  viewChildren
} from '@angular/core';

import { DashboardStatCard } from '../dashboard-stat-card/dashboard-stat-card';
import { QuickAction } from '../quick-action/quick-action';
import { SignalQuickActionsPanel } from '../signal-quick-actions-panel/signal-quick-actions-panel';

@Component({
  selector: 'app-exercise-7-result',
  imports: [DashboardStatCard, QuickAction, SignalQuickActionsPanel],
  templateUrl: './exercise-7-result.html',
  styleUrl: './exercise-7-result.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise7Result {
  protected readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  protected readonly cards = viewChildren(DashboardStatCard);

  protected readonly stats = [
    { label: 'Recettes publiees', value: '18' },
    { label: 'Membres connectes', value: '7' },
    { label: 'Avis clients', value: '124' }
  ] as const;

  private readonly focusRequests = signal(0);

  protected readonly cardsCount = computed(() => this.cards().length);
  protected readonly dashboardSummary = computed(
    () => `${this.cardsCount()} cartes detectees via viewChildren()`
  );
  protected readonly titleSummary = computed(
    () => `Signal queries - ${this.cardsCount()} cartes`
  );

  constructor() {
    effect(() => {
      document.title = this.titleSummary();
    });

    effect(() => {
      if (this.focusRequests() === 0) {
        return;
      }

      this.searchInput()?.nativeElement.focus();
    });
  }

  protected focusSearch(): void {
    this.focusRequests.update((value) => value + 1);
  }
}
