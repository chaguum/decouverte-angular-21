import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TagModule } from 'primeng/tag';

import { WORKSHOP_TOPICS } from './workshop-topics';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TagModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'ATOS Angular 21 Workshop';
  protected readonly topics = WORKSHOP_TOPICS;
}
