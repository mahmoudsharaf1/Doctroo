import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './store';

import Navigation from './navigation';

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <PersistGate persistor={persistedStore}>
          <Navigation />
        </PersistGate>
      </Provider>
    )
  }
}
