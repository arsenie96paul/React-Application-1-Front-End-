import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import HelloWorldService from '../../api/todo/HelloWorldService.js';

class WelcomeComponent extends Component{

    constructor(props){
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.state = {
            welcomeMessage : ' '
        }

        this.handleSuccessfulRessponse = this.handleSuccessfulRessponse.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    render(){
        return (
            <>
                <h1>Welcome!</h1>

                 <div className="container">
                     Welcome {this.props.match.params.name} .
                    You can manage your todo <Link to="/todo">here</Link>.
                </div>
                <div className="container">
                    Click here to get a customized welcome message with RestAPI.
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Welcome!</button>
                </div>
                <div>
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }

    retrieveWelcomeMessage(){

        // Hello World
        // HelloWorldService.executeHelloWorldService()
        // .then(response=> this.handleSuccessfulRessponse(response))

        //Hello World Bean
        //HelloWorldService.executeHelloWorldBeanService()
        //.then(response=> this.handleSuccessfulRessponse(response))

        HelloWorldService.executeHelloWorlPathVariableService(this.props.match.params.name)
        .then(response=> this.handleSuccessfulRessponse(response))
        .catch( error => this.handleError(error))
    }


    handleSuccessfulRessponse(response){
        this.setState({welcomeMessage:response.data.message})
    }

    handleError(error){
        let errorMessage = '';

        if(error.message)
        {
            errorMessage = error.message
        }

        if( error.response && error.message.data)
        {
            errorMessage += error.response.data.message
        }

        this.setState({welcomeMessage: errorMessage})
    }
}

export default WelcomeComponent