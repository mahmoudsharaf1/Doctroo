import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer} from 'redux-persist';

import reducer from '../reducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'authProfile', 'i18n']
};
const persistedReducer =  persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, {}, applyMiddleware(thunk));

export const persistedStore  = persistStore(store);
