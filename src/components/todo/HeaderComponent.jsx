import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import AutentificationService from './AutentificationService.js';

class HeaderComponents extends Component{
    render(){
        return (
            <header> 
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div> 
                        {/* Use google as test link :) */}
                        <a href="http://www.google.com" className="navbar-brand">My First Reacat Application </a>
                    </div>
                    <ul className = "navbar-nav">
                        <li className="nav-link"><Link className="nav-link" to="/welcome/newUser">Home</Link></li>
                        <li className="nav-link"><Link className="nav-link" to="/todo">Todos</Link></li>
                    </ul>
                    <ul className = "navbar-nav navbar-collapse justify-content-end">
                        <li className="nav-link"><Link className="nav-link"  to="/login">LogIn</Link></li>
                        <li className="nav-link"><Link className="nav-link"  to="/logout" onClick={AutentificationService.logOut}>LogOut</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}



export default HeaderComponents