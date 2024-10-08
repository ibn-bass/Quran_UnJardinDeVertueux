import React from 'react';
import QuranComponant from './fonctionnalites/quranComponant';
import { Provider } from 'react-redux'
import Store from './store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

function App() {


  let persistor = persistStore(Store)


  return (

    <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <QuranComponant/>
        </PersistGate>
    </Provider>
  );
}

export default App;
