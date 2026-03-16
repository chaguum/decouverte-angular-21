import { Component } from '@angular/core';

import { TopicPlaceholder } from '../../shared/topic-placeholder/topic-placeholder';
import { getWorkshopTopic } from '../../workshop-topics';

@Component({
  selector: 'app-exercise-5',
  imports: [TopicPlaceholder],
  templateUrl: './exercise-5.html',
  styleUrl: './exercise-5.css'
})
export class Exercise5 {
  protected readonly topic = getWorkshopTopic('ngrx-signal-store');
}
