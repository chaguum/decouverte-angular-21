import { ChangeDetectionStrategy, Component } from '@angular/core';

import { exercise7LogEntries, exercise7LogSummary } from '../../exercise-7-load-log';

@Component({
  selector: 'app-exercise-7-load-log-panel',
  templateUrl: './exercise-7-load-log-panel.html',
  styleUrl: './exercise-7-load-log-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise7LoadLogPanel {
  protected readonly logEntries = exercise7LogEntries;
  protected readonly logSummary = exercise7LogSummary;
}
