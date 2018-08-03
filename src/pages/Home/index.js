import React, { Component } from 'react';
import { Container, Jumbotron } from 'reactstrap'
import { Animated } from "react-animated-css";

import './style.css'

class Home extends Component {
    render() {
        return (
            <Container>
                <Animated animationIn="rollIn" animationOut="bounceOutLeft" isVisible={true}>
                    <Jumbotron className="m-5">
                        <h1>Selamat datang</h1>
                    </Jumbotron>
                </Animated>
            </Container>
        );
    }
}

export default Home;