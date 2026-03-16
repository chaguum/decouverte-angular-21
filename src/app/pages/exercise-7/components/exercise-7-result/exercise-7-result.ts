import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Exercise7HeavyStats } from '../exercise-7-heavy-stats/exercise-7-heavy-stats';

@Component({
  selector: 'app-exercise-7-result',
  imports: [Exercise7HeavyStats],
  templateUrl: './exercise-7-result.html',
  styleUrl: './exercise-7-result.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise7Result {}
