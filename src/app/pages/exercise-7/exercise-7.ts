import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { getWorkshopTopic } from '../../workshop-topics';
import { Exercise7Result } from './components/exercise-7-result/exercise-7-result';
import { Exercise7Sandbox } from './components/exercise-7-sandbox/exercise-7-sandbox';

@Component({
  selector: 'app-exercise-7',
  imports: [Exercise7Result, Exercise7Sandbox],
  templateUrl: './exercise-7.html',
  styleUrl: './exercise-7.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise7 {
  private readonly route = inject(ActivatedRoute);

  protected readonly topic = getWorkshopTopic('signal-queries');
  protected readonly viewMode = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => (params.get('view') === 'result' ? 'result' : 'sandbox'))
    ),
    { initialValue: 'sandbox' as const }
  );
}
