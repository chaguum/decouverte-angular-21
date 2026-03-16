import { ChangeDetectionStrategy, Component } from '@angular/core';

interface StatCard {
  label: string;
  value: string;
  detail: string;
}

@Component({
  selector: 'app-exercise-7-heavy-stats',
  templateUrl: './exercise-7-heavy-stats.html',
  styleUrl: './exercise-7-heavy-stats.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise7HeavyStats {
  protected readonly stats: readonly StatCard[] = [
    {
      label: 'Temps moyen de lecture',
      value: '6 min 12 s',
      detail: 'Moyenne calculee sur les 30 derniers jours.'
    },
    {
      label: 'Taux d utilisation',
      value: '82 %',
      detail: 'Le produit est consulte tres regulierement en atelier.'
    },
    {
      label: 'Derniere mise a jour',
      value: 'Hier',
      detail: 'Le bloc de details a ete recalculé lors du dernier import.'
    },
    {
      label: 'Recommandation',
      value: 'A mettre en avant',
      detail: 'Bon candidat pour un panneau secondaire charge a la demande.'
    }
  ];
}
