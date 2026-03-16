import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-exercise-3-5-sandbox-summary',
  templateUrl: './exercise-3-5-sandbox-summary.html',
  styleUrl: './exercise-3-5-sandbox-summary.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise35SandboxSummary {
  @Input({ required: true }) resultsCount = 0;
  @Input({ required: true }) pageTitle = '';
  @Input({ required: true }) availableOnly = false;

  @Output() readonly availableOnlyChange = new EventEmitter<boolean>();

  protected onToggle(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.availableOnlyChange.emit(input.checked);
  }
}
