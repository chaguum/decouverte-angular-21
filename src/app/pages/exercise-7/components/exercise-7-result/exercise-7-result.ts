import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Exercise7DeferredStats } from '../exercise-7-deferred-stats/exercise-7-deferred-stats';
import { Exercise7LoadLogPanel } from '../exercise-7-load-log-panel/exercise-7-load-log-panel';

@Component({
  selector: 'app-exercise-7-result',
  imports: [Exercise7DeferredStats, Exercise7LoadLogPanel],
  templateUrl: './exercise-7-result.html',
  styleUrl: './exercise-7-result.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise7Result {}
