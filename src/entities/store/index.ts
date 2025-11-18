import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

export interface RootState { }

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({

});

export function useStore() {
  return baseUseStore(key);
}