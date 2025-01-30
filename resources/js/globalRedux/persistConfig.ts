import { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  whitelist: ["buyerConnects"],
};
