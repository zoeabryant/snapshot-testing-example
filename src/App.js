import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Apple from './Apple';
import Orange from './Orange';
import Tea from './Tea';

class App extends Component {
  render() {
    const {likesApple, likesJuice} = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          {likesApple && likesJuice && <Apple />}
          {!likesApple && likesJuice && <Orange />}
          {!likesJuice && <Tea />}
        </div>
      </div>
    );
  }
}

export default App;
