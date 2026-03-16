import { ChangeDetectionStrategy, Component } from '@angular/core';
import { recordExercise7Log } from '../../exercise-7-load-log';

interface StatCard {
  label: string;
  value: string;
  detail: string;
}

recordExercise7Log(
  'eager',
  'Sandbox: le fichier du composant detaille a ete charge des l ouverture de la page.'
);

@Component({
  selector: 'app-exercise-7-heavy-stats',
  templateUrl: './exercise-7-heavy-stats.html',
  styleUrl: './exercise-7-heavy-stats.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Exercise7HeavyStats {
  constructor() {
    recordExercise7Log('instance', 'Sandbox: le composant detaille a ete instancie apres le clic.');
  }

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
