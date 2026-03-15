import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

import { WorkshopTopic } from '../../workshop-topics';

@Component({
  selector: 'app-topic-placeholder',
  imports: [CardModule, DividerModule, TagModule],
  templateUrl: './topic-placeholder.html',
  styleUrl: './topic-placeholder.css'
})
export class TopicPlaceholder {
  readonly topic = input.required<WorkshopTopic>();
}
