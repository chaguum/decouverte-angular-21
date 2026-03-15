import { Component } from '@angular/core';

import { TopicPlaceholder } from '../../shared/topic-placeholder/topic-placeholder';
import { getWorkshopTopic } from '../../workshop-topics';

@Component({
  selector: 'app-exercise-4',
  imports: [TopicPlaceholder],
  templateUrl: './exercise-4.html',
  styleUrl: './exercise-4.css'
})
export class Exercise4 {
  protected readonly topic = getWorkshopTopic('rxjs-signals-interop');
}
