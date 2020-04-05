import React, {Component} from 'react';
import './Alignment-app.css';
import InputBlock from "./components/InputBlock";
import ResultBlock from "./components/ResultBlock";

class AlignmentApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "enter", // enter | result
      seq1: "",
      seq2: "",
    }
  }

  change = (e) => {
    const {name, value} = e.target;
    this.setState({[name]:value})
  };

  changeStatus = () => {
    this.setState({status: "result"});
  };

  reset = () => {
      this.setState({
          status: "enter", //invite | enter | result
          seq1: "",
          seq2: "",
      })
  };

  render() {
    return (
        <div className="alignment-app" data-testid="app">
            <InputBlock
               status={this.state.status}
               seq1={this.state.seq1}
               seq2={this.state.seq2}
               change={this.change}
               changeStatus={this.changeStatus}
           />
           <ResultBlock
               status={this.state.status}
               seq1={this.state.seq1}
               seq2={this.state.seq2}
               reset={this.reset}
           />
        </div>
    )
  }
}

export default AlignmentApp;
