import { Component } from '@angular/core';

import { TopicPlaceholder } from '../../shared/topic-placeholder/topic-placeholder';
import { getWorkshopTopic } from '../../workshop-topics';

@Component({
  selector: 'app-exercise-7',
  imports: [TopicPlaceholder],
  templateUrl: './exercise-7.html',
  styleUrl: './exercise-7.css'
})
export class Exercise7 {
  protected readonly topic = getWorkshopTopic('defer');
}
