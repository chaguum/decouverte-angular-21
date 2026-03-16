import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  contentChild,
  contentChildren,
  effect
} from '@angular/core';

import { QuickAction } from '../quick-action/quick-action';

@Component({
  selector: 'app-signal-quick-actions-panel',
  imports: [],
  templateUrl: './signal-quick-actions-panel.html',
  styleUrl: './signal-quick-actions-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalQuickActionsPanel {
  protected readonly panelTitle = contentChild<ElementRef<HTMLElement>>('panelTitle');
  protected readonly projectedActions = contentChildren(QuickAction);

  protected readonly projectedTitleDetected = computed(() => !!this.panelTitle());
  protected readonly projectedActionsCount = computed(() => this.projectedActions().length);
  protected readonly projectionSummary = computed(() => {
    const titleStatus = this.projectedTitleDetected()
      ? 'Titre projete detecte'
      : 'Pas de titre projete';

    return `${titleStatus} - ${this.projectedActionsCount()} action(s) rapide(s)`;
  });

  constructor() {
    effect(() => {
      console.log(`[Signal queries] Projection: ${this.projectionSummary()}`);
    });
  }
}
