import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Exercise1Result } from './components/exercise-1-result/exercise-1-result';
import { Exercise1SandboxModule } from './components/exercise-1-sandbox/exercise-1-sandbox.module';
import { getWorkshopTopic } from '../../workshop-topics';

@Component({
  selector: 'app-exercise-1',
  standalone: true,
  imports: [CommonModule, FormsModule, Exercise1Result, Exercise1SandboxModule],
  templateUrl: './exercise-1.html',
  styleUrl: './exercise-1.css'
})
export class Exercise1 {
  protected readonly topic = getWorkshopTopic('standalone');
  protected viewMode: 'sandbox' | 'result' = 'sandbox';
}
