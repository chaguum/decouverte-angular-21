import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

import { DashboardStatCard } from '../dashboard-stat-card/dashboard-stat-card';
import { LegacyQuickActionsPanel } from '../legacy-quick-actions-panel/legacy-quick-actions-panel';
import { QuickAction } from '../quick-action/quick-action';

@Component({
  selector: 'app-exercise-7-sandbox',
  imports: [DashboardStatCard, LegacyQuickActionsPanel, QuickAction],
  templateUrl: './exercise-7-sandbox.html',
  styleUrl: './exercise-7-sandbox.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise7Sandbox {
  @ViewChild('searchInput', { read: ElementRef })
  protected searchInput?: ElementRef<HTMLInputElement>;

  @ViewChildren(DashboardStatCard)
  protected cards?: QueryList<DashboardStatCard>;

  protected readonly stats = [
    { label: 'Recettes publiees', value: '18' },
    { label: 'Membres connectes', value: '7' },
    { label: 'Avis clients', value: '124' }
  ] as const;

  protected get cardsCount(): number {
    return this.cards?.length ?? 0;
  }

  protected get dashboardSummary(): string {
    return `${this.cardsCount} cartes detectees via @ViewChildren`;
  }

  protected focusSearch(): void {
    this.searchInput?.nativeElement.focus();
  }
}
