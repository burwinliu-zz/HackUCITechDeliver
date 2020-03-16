import React, { Component } from 'react';
import InputForm from './Form'
import './App.css'
import logo from './petr.png'
import {Row, Col} from "react-bootstrap";


class App extends Component {  
  render(){
    return(
      <Row className = "App">
        <Col className="align-self-center">
          <div className="Form-box">
            <Row><h1 className="Form-title">Hack UCI Application</h1></Row>
            <Row><InputForm/></Row>
          </div>
        </Col>
        <Col className="align-self-center">
          <Row><img src={logo} className="App-logo" alt="Petr"></img></Row>
          
        </Col>  
      </Row>
    )
  }
}

export default App;
