import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-exercise-3-5-result-summary',
  templateUrl: './exercise-3-5-result-summary.html',
  styleUrl: './exercise-3-5-result-summary.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise35ResultSummary {
  readonly resultsCount = input.required<number>();
  readonly pageTitle = input.required<string>();
  readonly availableOnly = input.required<boolean>();
  readonly availableOnlyChange = output<boolean>();

  protected onToggle(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.availableOnlyChange.emit(inputElement.checked);
  }
}
