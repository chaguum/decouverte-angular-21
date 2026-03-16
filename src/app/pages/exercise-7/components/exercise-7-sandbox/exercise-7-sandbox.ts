import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Exercise7HeavyStats } from '../exercise-7-heavy-stats/exercise-7-heavy-stats';
import { Exercise7LoadLogPanel } from '../exercise-7-load-log-panel/exercise-7-load-log-panel';

@Component({
  selector: 'app-exercise-7-sandbox',
  imports: [Exercise7HeavyStats, Exercise7LoadLogPanel],
  templateUrl: './exercise-7-sandbox.html',
  styleUrl: './exercise-7-sandbox.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise7Sandbox {
  protected readonly showDetails = signal(false);

  protected toggleDetails(): void {
    this.showDetails.update((value) => !value);
  }
}
