export type WorkshopTopicId =
  | 'standalone'
  | 'template-flow-let'
  | 'signals'
  | 'signals-input-output'
  | 'rxjs-signals-interop'
  | 'ngrx-signal-store'
  | 'signal-forms'
  | 'signal-queries';

export interface WorkshopTopic {
  readonly order: number;
  readonly id: WorkshopTopicId;
  readonly label: string;
  readonly path: string;
  readonly summary: string;
  readonly readmePath: string;
}

export const WORKSHOP_TOPICS: readonly WorkshopTopic[] = [
  {
    order: 1,
    id: 'standalone',
    label: 'Standalone',
    path: '/exercise-1',
    summary: 'Base de modernisation Angular: architecture sans NgModule et providers applicatifs.',
    readmePath: '/themes/exercise-1/README_standalone.md'
  },
  {
    order: 2,
    id: 'template-flow-let',
    label: 'Controle de flux et @let',
    path: '/exercise-2',
    summary: 'Nouvelle syntaxe template pour structurer les vues et rendre les templates plus lisibles.',
    readmePath: '/themes/exercise-2/README_control-flow-and-let.md'
  },
  {
    order: 3,
    id: 'signals',
    label: 'Signals',
    path: '/exercise-3',
    summary: 'Signals, computed, effect, input, output et model pour le state moderne Angular.',
    readmePath: '/themes/exercise-3/README_signals.md'
  },
  {
    order: 3.5,
    id: 'signals-input-output',
    label: 'Signals et input/output',
    path: '/exercise-3-5',
    summary: 'Faire circuler un state Signals entre parent et enfant, puis moderniser la communication avec input() et output().',
    readmePath: '/themes/exercise-3-5/README_signals-input-output.md'
  },
  {
    order: 4,
    id: 'rxjs-signals-interop',
    label: 'Interop RxJS et Signals',
    path: '/exercise-4',
    summary: 'Passer d un codebase RxJS existant vers une approche hybride sans perdre en clarte.',
    readmePath: '/themes/exercise-4/README_rxjs-signals-interop.md'
  },
  {
    order: 5,
    id: 'ngrx-signal-store',
    label: 'NgRx Signal Store',
    path: '/exercise-5',
    summary: 'Structurer un state partage avec withState, withComputed, withMethods, withHooks et withStatus.',
    readmePath: '/themes/exercise-5/README_ngrx-signal-store.md'
  },
  {
    order: 6,
    id: 'signal-forms',
    label: 'Signal Forms',
    path: '/exercise-6',
    summary: 'Construire un formulaire pilote par signals avec un modele de formulaire, du binding et de la validation.',
    readmePath: '/themes/exercise-6/README_signal-forms.md'
  },
  {
    order: 7,
    id: 'signal-queries',
    label: 'Signal queries',
    path: '/exercise-7',
    summary: 'Moderniser ViewChild et ContentChild avec des queries signal, puis les combiner avec computed et effect.',
    readmePath: '/themes/exercise-7/README_signal-queries.md'
  }
] as const;

export function getWorkshopTopic(id: WorkshopTopicId): WorkshopTopic {
  const topic = WORKSHOP_TOPICS.find((item) => item.id === id);

  if (!topic) {
    throw new Error(`Unknown workshop topic: ${id}`);
  }

  return topic;
}
