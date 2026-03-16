import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { getWorkshopTopic } from '../../workshop-topics';
import { Exercise35Result } from './components/exercise-3-5-result/exercise-3-5-result';
import { Exercise35Sandbox } from './components/exercise-3-5-sandbox/exercise-3-5-sandbox';

@Component({
  selector: 'app-exercise-3-5',
  imports: [Exercise35Result, Exercise35Sandbox],
  templateUrl: './exercise-3-5.html',
  styleUrl: './exercise-3-5.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise35 {
  private readonly route = inject(ActivatedRoute);

  protected readonly topic = getWorkshopTopic('signals-input-output');
  protected readonly viewMode = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => (params.get('view') === 'result' ? 'result' : 'sandbox'))
    ),
    { initialValue: 'sandbox' as const }
  );
}
