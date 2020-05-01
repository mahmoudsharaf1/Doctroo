import React from 'react';
import {StyleSheet} from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistedStore} from './store';

import Navigation from './navigation';

export default class App extends React.Component {
  render() {
    return (
      <Provider store ={store} >
        <PersistGate persistor={persistedStore}>
          <Navigation />
        </PersistGate>
    </Provider>  
    )
  }
}

const styles = StyleSheet.create({})
