import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { Exercise1Result } from './components/exercise-1-result/exercise-1-result';
import { Exercise1SandboxModule } from './components/exercise-1-sandbox/exercise-1-sandbox.module';
import { getWorkshopTopic } from '../../workshop-topics';

@Component({
  selector: 'app-exercise-1',
  standalone: true,
  imports: [Exercise1Result, Exercise1SandboxModule],
  templateUrl: './exercise-1.html',
  styleUrl: './exercise-1.css'
})
export class Exercise1 {
  private readonly route = inject(ActivatedRoute);

  protected readonly topic = getWorkshopTopic('standalone');
  protected readonly viewMode = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => (params.get('view') === 'result' ? 'result' : 'sandbox'))
    ),
    { initialValue: 'sandbox' as const }
  );
}
