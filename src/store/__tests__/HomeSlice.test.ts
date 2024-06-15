import { HomeActions } from '@store/homeSlice';
import { store } from '@store/index';

describe('[STORE]: Home Slice', () => {
  it('Should match initial state', () => {
    const state = store.getState().home;
    expect(state).toEqual({ updateMe: false, phoneNum: 10 });
  });

  it('Should set setPhoneNum correctly', () => {
    const result = store.dispatch(HomeActions.setPhoneNum(20));
    const state = store.getState().home;

    expect(result.payload).toBe(20);
    expect(state.phoneNum).toEqual(20);
  });

  it('Should set updateMe correctly', () => {
    const result = store.dispatch(HomeActions.updateMe(true));
    const state = store.getState().home;

    expect(result.payload).toBe(true);
    expect(state.updateMe).toEqual(true);
  });
});
