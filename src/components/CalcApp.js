import React from 'react';

import CalcButton from './CalcButton';
// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO
      initial: true,
      numberString: '0',
      pendingOpt: '',
      pendingNum: null,
      lastPress: null,
    };
    this.pressNumber = this.pressNumber.bind(this);
    this.pressOperator = this.pressOperator.bind(this);
    this.pressEqual = this.pressEqual.bind(this);
  }

  resetState() {
    // TODO
    this.setState({ numberString: '0', initial: true, pendingNum: null, pendingOpt: '', lastPress: null });
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  pressNumber(number) {
    let newNumber = this.state.numberString;
    if (this.state.initial === true) {
      newNumber = number;
      this.setState({ initial: false });
    } else if (this.state.pendingOpt!=='') {
      newNumber = number;
    } else {
      newNumber = this.state.numberString + number;
    }
    this.setState({ numberString: newNumber, lastPress: 'number' });
  }

  pressOperator(newOperator) {
    if (this.state.initial === true) {
      //nothing happens!
    } else if (this.state.pendingNum===null) {
      this.setState({ pendingOpt: newOperator, pendingNum: this.state.numberString });
    } else if (this.state.lastPress==='opt') {
      this.setState({ pendingOpt: newOperator, pendingNum: this.state.numberString });
    } else {
      const operator = this.state.pendingOpt;
      const newNumberString = this.state.pendingNum;
      let newNumber = parseFloat(newNumberString, 10);
      const nowNumber = parseFloat(this.state.numberString, 10);
      if (operator==='+') {
        newNumber += nowNumber;
      } else if (operator==='-') {
        newNumber -= nowNumber;
      } else if (operator==='x') {
        newNumber *= nowNumber;
      } else if (operator==='/') {
        newNumber /= nowNumber;
      }
      this.setState({ numberString: newNumber, pendingOpt: newOperator, pendingNum: null });
    }
    this.setState({ lastPress: 'opt' });
  }

  pressEqual(garbage) {
    if (this.state.initial === true) {
      //nothing happens!
    } else {
      const operator = this.state.pendingOpt;
      if (operator !== '') {
        const newNumberString = this.state.pendingNum;
        let newNumber = parseFloat(newNumberString, 10);
        const nowNumber = parseFloat(this.state.numberString, 10);
        if (operator==='+') {
          newNumber += nowNumber;
        } else if (operator==='-') {
          newNumber -= nowNumber;
        } else if (operator==='x') {
          newNumber *= nowNumber;
        } else if (operator==='/') {
          newNumber /= nowNumber;
        }
        this.setState({ initial: true, numberString: newNumber, pendingOpt: '', pendingNum: null, lastPress: null });
      }
    }
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{parseFloat(this.state.numberString, 10)}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState.bind(this)}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={this.pressOperator}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.pressNumber}>7</CalcButton>
            <CalcButton className="calc-number" onClick={this.pressNumber}>8</CalcButton>
            <CalcButton className="calc-number" onClick={this.pressNumber}>9</CalcButton>
            <CalcButton className="calc-operator" onClick={this.pressOperator}>x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.pressNumber}>4</CalcButton>
            <CalcButton className="calc-number" onClick={this.pressNumber}>5</CalcButton>
            <CalcButton className="calc-number" onClick={this.pressNumber}>6</CalcButton>
            <CalcButton className="calc-operator" onClick={this.pressOperator}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.pressNumber}>1</CalcButton>
            <CalcButton className="calc-number" onClick={this.pressNumber}>2</CalcButton>
            <CalcButton className="calc-number" onClick={this.pressNumber}>3</CalcButton>
            <CalcButton className="calc-operator" onClick={this.pressOperator} onClick={this.pressOperator}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number bigger-btn" onClick={this.pressNumber}>0</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>.</CalcButton>
            <CalcButton className="calc-operator" onClick={this.pressEqual}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
