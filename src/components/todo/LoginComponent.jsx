import React, { Component } from 'react';
import AutentificationService from './AutentificationService.js';

class LogInComponent extends Component{

    // Constructor
    constructor(props){
        super(props)
        this.state ={
            username:'myFirstReact',
            password:'dummy',
            hasLogInFailed: null,
            showSuccessfullMessage: false
        }

        //Bindings
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    // User Name Handler
    handleChange(event){
        //console.log(event.target.name);
        this.setState(
            {
                [event.target.name]:
                    event.target.value
            }
        )
    }

    loginClicked(){
        
        // Hardcoded Check
        // if (this.state.username == 'myFirstReact' 
        //     && this.state.password == 'dummy')
        // {
        //     AutentificationService.registerSucLogIn(this.state.username,this.state.password);
        //     //Redirect to the welcome page 
        //     this.props.history.push(`/welcome/${this.state.username}`)

        //     this.setState({showSuccessfullMessage:true})
        //     this.setState({hasLogInFailed:false})
        // }
        // else
        // {
        //     this.setState({showSuccessfullMessage:false})
        //     this.setState({hasLogInFailed:true})
        // }

        // API Check - Basic Authentification Service
        // AutentificationService.executeBasicAuthenticationService(this.state.username,this.state.password)
        // .then(()=>{
        //         AutentificationService.registerSucLogIn(this.state.username,this.state.password);
        //         //Redirect to the welcome page 
        //         this.props.history.push(`/welcome/${this.state.username}`)
        //     })
        // .catch( ()=>{
        //     this.setState({showSuccessfullMessage:false})
        //     this.setState({hasLogInFailed:true})
        // })

        // API Check - JWT Authentification Service
        AutentificationService.executeJwtAuthenticationService(this.state.username,this.state.password)
        .then((response)=>{

                AutentificationService.registerSucLogInForJwt(this.state.username,this.state.password,response.data.token);
                console.log('pas2',this.state.username)

                //Redirect to the welcome page 
                this.props.history.push(`/welcome/${this.state.username}`)                
                console.log('pas3')
            })
        .catch( ()=>{
            console.log('fail1')
            this.setState({showSuccessfullMessage:false})
            this.setState({hasLogInFailed:true})
        })

    }

    // Renderer
    render(){
        return(
            <>            
                <h1>LogIn</h1>
                <div className="container">
                    {/* 
                    // Different way to print messages based on bool 
                    { this.state.hasLogInFailed && <div>Invalid Credentials</div>}
                    { this.state.showSuccessfullMessage && <div>Log In Successful</div>} 
                    */}
                    <ShowInvalidCredentials hasLogInFailed={this.state.hasLogInFailed}/>

                    User Name:<input type = "text" name = "username" value={this.state.username} onChange={this.handleChange}/>
                    Password: < input type ="password" name = "password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </>
        )
    }
}

// Show log in result message functions
function  ShowInvalidCredentials(props) {

    if( props.hasLogInFailed == null )
    {
        return null
    }
    else
    {        
        if(props.hasLogInFailed) 
        {
            return <div>Invalid Credentials</div>
        }
        else
        {
            return <div>Login Successful</div>
        }
    }
}

export default LogInComponent