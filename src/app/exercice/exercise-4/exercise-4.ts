import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { getWorkshopTopic } from '../../workshop-topics';
import { Exercise4Result } from './components/exercise-4-result/exercise-4-result';
import { Exercise4Sandbox } from './components/exercise-4-sandbox/exercise-4-sandbox';

@Component({
  selector: 'app-exercise-4',
  imports: [Exercise4Result, Exercise4Sandbox],
  templateUrl: './exercise-4.html',
  styleUrl: './exercise-4.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise4 {
  private readonly route = inject(ActivatedRoute);

  protected readonly topic = getWorkshopTopic('rxjs-signals-interop');
  protected readonly viewMode = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => (params.get('view') === 'result' ? 'result' : 'sandbox'))
    ),
    { initialValue: 'sandbox' as const }
  );
}
