import React, { Component } from 'react';
import './App.css';

const availablePowers = [];

availablePowers.push(
  ...Array.from(new Array(14)).map((v, i) => ({
    base: i + 1,
    exp: 2,
    power: (i + 1) ** 2
  }))
)

availablePowers.push(
  ...Array.from(new Array(6)).map((v, i) => ({
    base: i + 1,
    exp: 3,
    power: (i + 1) ** 3
  }))
)

availablePowers.push(
  ...Array.from(new Array(3)).map((v, i) => ({
    base: i + 1,
    exp: 4,
    power: (i + 1) ** 4
  }))
)

availablePowers.push({base: 2, exp: 5, power: 32})
availablePowers.push({base: 2, exp: 6, power: 64})

const sample = a => a.length && a[Math.floor(a.length * Math.random())]

const flipACoin = () => Math.random() > 0.5

const generateNewState = () => ({
  power: sample(availablePowers),
  showAnswer: false,
  isRoot: flipACoin()
})

class App extends Component {
  constructor() {
    super()
    this.state = generateNewState()
  }
  toggleAnswer = () => {
    this.setState({showAnswer: !this.state.showAnswer})
  }
  nextQuestion = () => {
    this.setState(generateNewState())
  }
  handleButtonClick = () => {
    if (this.state.showAnswer) this.nextQuestion()
    else this.toggleAnswer()
  }
  render() {
    const {power, exp, base} = this.state.power
    return (
      <div className="App">
        <div className="App-header">
          Power of Powers
        </div>
        <div className="App-content">
          <div className="Power-question Question-part">
          { this.state.isRoot
            ? <span className="Math-root"><sup><i>{exp}</i></sup>{'√'}<i className="Math-root-in">{power}</i></span>
            : <span><i>{base}</i><sup>{exp}</sup></span>
          }
          </div>
          <div className="Power-equals Question-part"> = </div>
          <div className="Power-solution Question-part">
          {this.state.showAnswer
            ? <i>{this.state.isRoot ? base : power}</i>
            : <span></span>}
          </div>
        </div>
        <button className="App-action" ref="action" onClick={this.handleButtonClick}>
          {this.state.showAnswer ? 'Next' : 'Show Answer'}
        </button>
      </div>
    );
  }
}

export default App;
