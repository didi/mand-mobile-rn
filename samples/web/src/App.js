import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { View, Text } from 'react-native';
// import { MDButton } from 'mand-mobile-rn';
import MDText from './button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <View>
            <Text>
              What the fuck
            </Text>
            <MDText></MDText>
            {/* <MDButton></MDButton> */}
          </View>
        </header>
      </div>
    );
  }
}

export default App;
