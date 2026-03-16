export type WorkshopTopicId =
  | 'standalone'
  | 'template-flow-let'
  | 'signals'
  | 'rxjs-signals-interop'
  | 'linked-signal-state'
  | 'ngrx-signal-store'
  | 'defer';

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
    order: 4,
    id: 'rxjs-signals-interop',
    label: 'Interop RxJS et Signals',
    path: '/exercise-4',
    summary: 'Passer d un codebase RxJS existant vers une approche hybride sans perdre en clarte.',
    readmePath: '/themes/exercise-4/README_rxjs-signals-interop.md'
  },
  {
    order: 5,
    id: 'linked-signal-state',
    label: 'linkedSignal et state derive',
    path: '/exercise-5',
    summary: 'Modeliser un state derive modifiable et comprendre les dependances reactives.',
    readmePath: '/themes/exercise-5/README_linked-signal.md'
  },
  {
    order: 6,
    id: 'ngrx-signal-store',
    label: 'NgRx Signal Store',
    path: '/exercise-6',
    summary: 'Structurer un state partage avec withState, withComputed, withMethods, withHooks et withStatus.',
    readmePath: '/themes/exercise-6/README_ngrx-signal-store.md'
  },
  {
    order: 7,
    id: 'defer',
    label: '@defer',
    path: '/exercise-7',
    summary: 'Charger les zones lourdes au bon moment pour montrer un vrai benefice UX et perf.',
    readmePath: '/themes/exercise-7/README_defer.md'
  }
] as const;

export function getWorkshopTopic(id: WorkshopTopicId): WorkshopTopic {
  const topic = WORKSHOP_TOPICS.find((item) => item.id === id);

  if (!topic) {
    throw new Error(`Unknown workshop topic: ${id}`);
  }

  return topic;
}
