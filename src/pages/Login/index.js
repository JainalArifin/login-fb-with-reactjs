import React, { Component } from 'react';
import { Container, Card, Button } from 'reactstrap'

import './style.css'

// const FB = window.FB;
class Login extends Component {
    constructor(){
        super()
        this.state = {
            logoutButton: false
        }
    }

    checkLoginState = () => {
        window.FB.getLoginStatus(function (response) {
            console.log(response, ' <---- response 1')
            this.statusChangeCallback(response);
        });
    }

    // This is called with the results from from FB.getLoginStatus().
    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response, ' <---- response 2');
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            this.testAPI();
        } else {
            // The person is not logged into your app or we are unable to tell.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
        }
    }

    componentDidMount() {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '1040820166093847',
                cookie: true,
                xfbml: true,
                version: 'v3.1'
            });

            window.FB.AppEvents.logPageView();

        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        if(localStorage.getItem('token') !== null){
            this.setState({
                logoutButton: true
            })
        }
    }

    testAPI = () => {
        console.log('Welcome!  Fetching your information.... ');
        window.FB.api('/me', function (response) {
            console.log(response, ' < ----- response 3')
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
        });
    }

    handleClick =  async() => {
        await this.setState({
            logoutButton: true
        })
        // window.FB.login(this.checkLoginState());
        window.FB.login(function (response) {
            // handle the response
            localStorage.setItem('token', response.authResponse.accessToken)
            console.log(response, ' <---- 1')
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                window.FB.api('/me', function (response) {
                    console.log('Good to see you, ' + response.name + '.');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, { scope: 'email,user_likes,user_birthday,user_location,user_hometown', return_scopes: true });
    }

    handleLogout = async () => {
        console.log(' masuk ')
        await window.FB.getLoginStatus(function (response) {
            console.log(response, ' <--- cek respon')
            if (response && response.status === 'connected') {
                window.FB.LogOut(function(response) {
                    console.log('masuk sini')
                    document.location.reload();
                });
            }
        });
        // await window.FB.logout()
        localStorage.removeItem('token')
        this.setState({
            logoutButton: false
        })
    }

    render() {
        const { logoutButton } = this.state

        return (
            <Container className="login-parent">
                {/* <div className="fb-login-button" data-size="medium" scope="public_profile,email" data-auto-logout-link="true" data-onlogin={() => this.handleClick()}  onClick={() => this.handleLogout()}></div> */}
                <Card className="m-5 p-3 shadow-lg login-style">
                    <h1>Login</h1>
                    {logoutButton === true ? (
                        <div className="fb-login-button" data-size="medium" scope="public_profile,email" data-auto-logout-link="true" onClick={() => this.handleLogout()} ></div>
                    ):(
                        <Button  color="primary" onClick={() => this.handleClick()}>
                            <i class="fab fa-facebook-square"></i> Login
                        </Button>
                    )}
                </Card>
                {/* <div className="fb-login-button fb-style" data-size="medium" data-auto-logout-link="true" onlogin={()=> this.handleClick()}></div> */}
            </Container >
        );
    }
}

export default Login;