import { Store } from 'vuex';
import { RootState } from './entities/store';

declare module 'vue' {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}