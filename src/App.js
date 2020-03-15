import React, { Component } from 'react';
import InputForm from './Form'
import './App.css'
import { Col, Container } from 'react-bootstrap';


class App extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    this.setState({ windowWidth, windowHeight });
  }

  render(){
    return(
      <div className="App">
        <Container>
          <InputForm/>
        </Container>
      </div>
    )
  }
}

export default App;
