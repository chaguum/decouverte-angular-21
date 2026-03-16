import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  QueryList
} from '@angular/core';

import { QuickAction } from '../quick-action/quick-action';

@Component({
  selector: 'app-legacy-quick-actions-panel',
  imports: [],
  templateUrl: './legacy-quick-actions-panel.html',
  styleUrl: './legacy-quick-actions-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegacyQuickActionsPanel implements AfterContentInit {
  @ContentChild('panelTitle', { read: ElementRef })
  protected panelTitle?: ElementRef<HTMLElement>;

  @ContentChildren(QuickAction)
  protected projectedActions?: QueryList<QuickAction>;

  protected projectedTitleDetected = false;
  protected projectedActionsCount = 0;

  ngAfterContentInit(): void {
    this.projectedTitleDetected = !!this.panelTitle;
    this.projectedActionsCount = this.projectedActions?.length ?? 0;
  }
}
