import { Component } from '@angular/core';

import { TopicPlaceholder } from '../../shared/topic-placeholder/topic-placeholder';
import { getWorkshopTopic } from '../../workshop-topics';

@Component({
  selector: 'app-exercise-2',
  imports: [TopicPlaceholder],
  templateUrl: './exercise-2.html',
  styleUrl: './exercise-2.css'
})
export class Exercise2 {
  protected readonly topic = getWorkshopTopic('template-flow-let');
}
