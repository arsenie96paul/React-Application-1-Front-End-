import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import LogInComponent from './LoginComponent.jsx';
import ListToDoComponent from './ListTodosComponent.jsx';
import ErrorComponent from './ErrorComponent.jsx';
import HeaderComponents from './HeaderComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import LogOutComponent from './LogoutComponent.jsx';
import WelcomeComponent from './WelcomeComponent.jsx';
import TodoComponent from './TodoComponent.jsx';

class ToDoApp extends Component{
    render(){
        return(
        <div className="ToDoApp">
            <Router>
                <>
                    <HeaderComponents/>
                        <Switch>
                            <Route path="/" exact component={LogInComponent}/>
                            <Route path="/login" component={LogInComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/todos/:id" component ={TodoComponent}/>
                            <AuthenticatedRoute path="/todo" component={ListToDoComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogOutComponent}/>
                            {/*        Error Page          */}
                            <Route component={ErrorComponent}/>

                        </Switch>
                    <FooterComponent/>
                </>
            </Router>
        </div>)
    }
}

export default ToDoApp