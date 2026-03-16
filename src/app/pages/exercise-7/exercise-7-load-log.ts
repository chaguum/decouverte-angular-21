import { computed, signal } from '@angular/core';

export type Exercise7LogKind = 'eager' | 'deferred' | 'instance';

export interface Exercise7LogEntry {
  id: number;
  kind: Exercise7LogKind;
  time: string;
  message: string;
}

const entries = signal<readonly Exercise7LogEntry[]>([]);
let nextId = 1;

export const exercise7LogEntries = entries.asReadonly();

export const exercise7LogSummary = computed(() => ({
  eagerLoaded: entries().some((entry) => entry.kind === 'eager'),
  deferredLoaded: entries().some((entry) => entry.kind === 'deferred')
}));

export function recordExercise7Log(kind: Exercise7LogKind, message: string): void {
  entries.update((currentEntries) => [
    ...currentEntries,
    {
      id: nextId++,
      kind,
      time: new Date().toLocaleTimeString('fr-FR'),
      message
    }
  ]);
}
