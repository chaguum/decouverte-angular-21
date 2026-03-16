import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-stat-card',
  templateUrl: './dashboard-stat-card.html',
  styleUrl: './dashboard-stat-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardStatCard {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
}
