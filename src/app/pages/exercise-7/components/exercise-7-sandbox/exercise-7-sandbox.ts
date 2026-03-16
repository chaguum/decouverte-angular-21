import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Exercise7HeavyStats } from '../exercise-7-heavy-stats/exercise-7-heavy-stats';

@Component({
  selector: 'app-exercise-7-sandbox',
  imports: [Exercise7HeavyStats],
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
