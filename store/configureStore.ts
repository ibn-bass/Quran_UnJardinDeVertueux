// Store/configureStore.js

import { createStore  } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers } from 'redux-persist'
import dbReducer from './reducers/dbReducer';
import configReducer from './reducers/configReducer';
import playerReducer from './reducers/playerReducer';


const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
}


const rootReducer = { 
    db: dbReducer,
    config:configReducer,
    player:playerReducer
};

export default createStore(persistCombineReducers(rootPersistConfig, rootReducer))
