import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';

import { LoadStatus } from './exercise-5.models';

export function withStatus() {
  return signalStoreFeature(
    withState({
      status: 'idle' as LoadStatus,
      errorMessage: null as string | null
    }),
    withComputed(({ errorMessage, status }) => ({
      isIdle: computed(() => status() === 'idle'),
      isPending: computed(() => status() === 'pending'),
      isFulfilled: computed(() => status() === 'fulfilled'),
      isError: computed(() => status() === 'error'),
      statusText: computed(() => {
        switch (status()) {
          case 'pending':
            return 'pending';
          case 'fulfilled':
            return 'fulfilled';
          case 'error':
            return 'error';
          default:
            return 'idle';
        }
      }),
      hasErrorMessage: computed(() => errorMessage() !== null)
    }))
  );
}
