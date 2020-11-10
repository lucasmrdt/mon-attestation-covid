import { createStore } from 'nedux';
import { persistKeys } from 'nedux-persist';
import { createStoreHook } from 'react-nedux';

export const FormStore = createStore(
  {
    step: 0,
    firstName: '',
    lastName: '',
    birthDate: '',
    placeOfBirth: '',
    address: '',
    city: '',
    zipCode: '',
    reasons: [] as string[],
    warned: false,
  },
  [
    persistKeys([
      'step',
      'firstName',
      'address',
      'birthDate',
      'city',
      'lastName',
      'placeOfBirth',
      'zipCode',
      'warned',
    ]),
  ],
);

export const useForm = createStoreHook(FormStore);
