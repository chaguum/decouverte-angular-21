import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { Exercise2Result } from './components/exercise-2-result/exercise-2-result';
import { Exercise2Sandbox } from './components/exercise-2-sandbox/exercise-2-sandbox';
import { getWorkshopTopic } from '../../workshop-topics';

@Component({
  selector: 'app-exercise-2',
  standalone: true,
  imports: [Exercise2Result, Exercise2Sandbox],
  templateUrl: './exercise-2.html',
  styleUrl: './exercise-2.css'
})
export class Exercise2 {
  private readonly route = inject(ActivatedRoute);

  protected readonly topic = getWorkshopTopic('template-flow-let');
  protected readonly viewMode = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => (params.get('view') === 'result' ? 'result' : 'sandbox'))
    ),
    { initialValue: 'sandbox' as const }
  );
}
