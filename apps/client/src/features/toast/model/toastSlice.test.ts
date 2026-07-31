import { describe, expect, it } from 'vitest';
import {
  pushToast,
  removeToast,
  toastReducer,
} from '@/features/toast/model/toastSlice';

describe('toast slice', () => {
  it('pushes and removes toast messages', () => {
    let state = toastReducer(undefined, pushToast({ message: 'OK' }));
    expect(state.items).toHaveLength(1);
    const id = state.items[0]?.id ?? '';
    expect(id.length).toBeGreaterThan(0);
    state = toastReducer(state, removeToast(id));
    expect(state.items).toHaveLength(0);
  });
});
