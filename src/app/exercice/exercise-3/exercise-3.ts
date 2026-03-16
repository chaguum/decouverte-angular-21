import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { Exercise3Result } from './components/exercise-3-result/exercise-3-result';
import { Exercise3Sandbox } from './components/exercise-3-sandbox/exercise-3-sandbox';
import { getWorkshopTopic } from '../../workshop-topics';

@Component({
  selector: 'app-exercise-3',
  standalone: true,
  imports: [Exercise3Result, Exercise3Sandbox],
  templateUrl: './exercise-3.html',
  styleUrl: './exercise-3.css'
})
export class Exercise3 {
  private readonly route = inject(ActivatedRoute);

  protected readonly topic = getWorkshopTopic('signals');
  protected readonly viewMode = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => (params.get('view') === 'result' ? 'result' : 'sandbox'))
    ),
    { initialValue: 'sandbox' as const }
  );
}
