import React, {Component} from 'react'
import { Route, Redirect } from 'react-router-dom'
import AutentificationService from './AutentificationService.js'

class AuthenticatedRoute extends Component{
    render(){
        if ( AutentificationService.isUserLoggedIn())
        {
            return <Route {...this.props}/>
        }
        else
        {
            return <Redirect to="/login"/>
        }
    }
}

export default AuthenticatedRoute