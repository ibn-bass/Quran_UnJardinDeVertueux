// Store/configureStore.js

import { createStore  } from 'redux';
import dbReducer from './reducers/dbReducer';
import configReducer from './reducers/configReducer';
import { persistCombineReducers } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
}


const rootReducer = { 
    db: dbReducer,
    config:configReducer
};

// export default createStore(rootReducer, applyMiddleware(thunk));
export default createStore(persistCombineReducers(rootPersistConfig, rootReducer))
