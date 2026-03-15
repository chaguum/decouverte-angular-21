import { Component } from '@angular/core';

import { TopicPlaceholder } from '../../shared/topic-placeholder/topic-placeholder';
import { getWorkshopTopic } from '../../workshop-topics';

@Component({
  selector: 'app-exercise-6',
  imports: [TopicPlaceholder],
  templateUrl: './exercise-6.html',
  styleUrl: './exercise-6.css'
})
export class Exercise6 {
  protected readonly topic = getWorkshopTopic('ngrx-signal-store');
}
