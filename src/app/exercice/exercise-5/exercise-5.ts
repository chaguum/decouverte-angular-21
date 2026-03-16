import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { getWorkshopTopic } from '../../workshop-topics';
import { Exercise5Result } from './components/exercise-5-result/exercise-5-result';
import { Exercise5Sandbox } from './components/exercise-5-sandbox/exercise-5-sandbox';

@Component({
  selector: 'app-exercise-5',
  imports: [Exercise5Result, Exercise5Sandbox],
  templateUrl: './exercise-5.html',
  styleUrl: './exercise-5.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise5 {
  private readonly route = inject(ActivatedRoute);

  protected readonly topic = getWorkshopTopic('ngrx-signal-store');
  protected readonly viewMode = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => (params.get('view') === 'result' ? 'result' : 'sandbox'))
    ),
    { initialValue: 'sandbox' as const }
  );
}
