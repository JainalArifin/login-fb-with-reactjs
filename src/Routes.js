import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
// layout
import Header from './components/Header';

const PrivateRoute = ({ component: Component, TOKEN,...rest }) =>(
    <Route {...rest} render={props=>(
        TOKEN !== null ? (
            <Component />
        ): (
            <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
            />
        )
    )} />
)

class Routes extends Component {
    render() {
        const token = localStorage.getItem('token')
        // console.log(token, ' <--- dapat token')
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <PrivateRoute TOKEN={token} path="/profile" component={Profile}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Routes;