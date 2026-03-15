import { Component } from '@angular/core';

import { TopicPlaceholder } from '../../shared/topic-placeholder/topic-placeholder';
import { getWorkshopTopic } from '../../workshop-topics';

@Component({
  selector: 'app-exercise-3',
  imports: [TopicPlaceholder],
  templateUrl: './exercise-3.html',
  styleUrl: './exercise-3.css'
})
export class Exercise3 {
  protected readonly topic = getWorkshopTopic('signals');
}
