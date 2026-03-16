import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { getWorkshopTopic } from '../../workshop-topics';
import { Exercise6Result } from './components/exercise-6-result/exercise-6-result';
import { Exercise6Sandbox } from './components/exercise-6-sandbox/exercise-6-sandbox';

@Component({
  selector: 'app-exercise-6',
  imports: [Exercise6Result, Exercise6Sandbox],
  templateUrl: './exercise-6.html',
  styleUrl: './exercise-6.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise6 {
  private readonly route = inject(ActivatedRoute);

  protected readonly topic = getWorkshopTopic('signal-forms');
  protected readonly viewMode = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => (params.get('view') === 'result' ? 'result' : 'sandbox'))
    ),
    { initialValue: 'sandbox' as const }
  );
}
