import { createStore } from 'nedux';
import { persistKeys } from 'nedux-persist';
import { createStoreHook } from 'react-nedux';

export const gatewayStore = createStore(
  {
    onBoarded: false,
  },
  [persistKeys(['onBoarded'])],
);

export const useGateway = createStoreHook(gatewayStore);
