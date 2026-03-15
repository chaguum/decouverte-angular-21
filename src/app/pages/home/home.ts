import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { WORKSHOP_TOPICS } from '../../workshop-topics';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, CardModule, RouterLink, TagModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected readonly topics = WORKSHOP_TOPICS;
}
