import { ChangeDetectionStrategy, Component } from '@angular/core';

interface DeferredStatCard {
  label: string;
  value: string;
  detail: string;
}

// Artificial delay for the workshop so the @loading block is visible.
await new Promise((resolve) => window.setTimeout(resolve, 1200));

@Component({
  selector: 'app-exercise-7-deferred-stats',
  templateUrl: './exercise-7-deferred-stats.html',
  styleUrl: './exercise-7-deferred-stats.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise7DeferredStats {
  protected readonly stats: readonly DeferredStatCard[] = [
    {
      label: 'Temps moyen de lecture',
      value: '6 min 12 s',
      detail: 'Le chunk detaille a ete charge uniquement apres interaction.'
    },
    {
      label: 'Taux d utilisation',
      value: '82 %',
      detail: 'Ce panneau etait un bon candidat pour un chargement differe.'
    },
    {
      label: 'Derniere mise a jour',
      value: 'Hier',
      detail: 'Le bloc secondaire n alourdissait pas le rendu initial.'
    },
    {
      label: 'Etat du chargement',
      value: 'Chunk charge',
      detail: 'Le placeholder a ete remplace apres le telechargement du code.'
    }
  ];
}
