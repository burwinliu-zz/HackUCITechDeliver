import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from "react-bootstrap";
import './Forms.css';

export default class InputForm extends React.Component {
    state = {
        name: '',
        nameError: '',
        email: '',
        emailError: '',
        fact: '',
        factError: '',
        serverError: '',
    }

    onChange = e=>{
        this.setState({
            [e.target.name]: e.target.value,
            [`${e.target.name}Error`]: ''
        })
    }

    checkItems = (e)=>{
        var temp = false;
        // eslint-disable-next-line
        const emailreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const {name, email, fact} = this.state;
        console.log(fact);
        if(name===''){
            temp = true;
            this.setState({ nameError: 'Please enter a name.' });
        }
        if(email.match(emailreg)===null){
            temp = true;
            this.setState({ emailError: 'Please enter a valid email.' });
        }
        if(fact===''){
            temp = true;
            this.setState({ factError: 'Please enter a fact.' });
        }
        return temp;
        
    }
    
    onSubmit = (e)=>{
        e.preventDefault();
        if(this.checkItems(e)){
            return;
        }
        else{
            const request = "https://hack-uci-test-endpoint.herokuapp.com/test?name=" + this.state.name + "&email=" + this.state.email + "&funfact=" + this.state.fact;
            fetch(request)
            .then((response) => {
                const code = response.status;
                if (code === 200){
                    return response.json();
                }
                else{
                    return code;
                }
              })
              .then((data) => {
                    if(data === 400){
                        this.setState({
                            emailError: 'Server could not find email',
                        })
                    }
                    else if(data === 404){
                        this.setState({serverError: "Server warming up, thank you for your patience " + this.state.name});
                    }
                    else if (data.name === this.state.name && data.email === this.state.email && data.funfact === this.state.fact){
                        console.log(data, "SUCCESS");
                        ReactDOM.findDOMNode(this.messageForm).reset();
                        window.alert("Thank you for your fact, " + this.state.name);
                    }
                    else{
                        this.setState({serverError: "Information not found please try again " + this.state.name });
                    }
              });
        }
    }

    renderError = (e) => {
        const err = e;
        if(err!==''){
            return <div className='Error'>{err}</div>;
        }
        return <div></div>;
      }

    render(){
        return(
            <Container as={Col} style={{display: 'flex', verticalAlign: 'center',}}>
                <Form 
                    id='myForm'
                    className="form"
                    style = {{width:'inherit',}}
                    ref={ form => this.messageForm = form }
                    onSubmit={ this.onSubmit.bind( this ) }
                >
                    <Form.Group as={Row} md="1" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Name" onChange={(e) => this.onChange(e)}/>
                        {this.renderError(this.state.nameError)}
                    </Form.Group>
                    <Form.Group as={Row} md="3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="text" placeholder="Email" onChange={(e) => this.onChange(e)}/>
                        {this.renderError(this.state.emailError)}
                    </Form.Group>
                    <Form.Group as={Row} md="5" controlId="formFact">
                        <Form.Label>Fun Fact</Form.Label>
                        <Form.Control as="textarea" style={{resize: 'none'}} rows="3" name="fact" type="text" placeholder="Fun Fact" onChange={(e) => this.onChange(e)}/>
                        {this.renderError(this.state.factError)}
                        {this.renderError(this.state.serverError)}
                    </Form.Group>
                    <div className='WhiteSpace'></div>
                    <div className="textRight">
                        <Button
                            type="submit"
                            variant="primary"
                            className="Submit"
                            onClick={(e) => this.onSubmit(e)}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Container>
        )
    }
  }