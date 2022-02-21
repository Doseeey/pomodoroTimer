import React from 'react';
import { StyleSheet, View } from 'react-native';

import Counter from './Counter.js'

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <Counter/>
      </View>
    );
  }
}
