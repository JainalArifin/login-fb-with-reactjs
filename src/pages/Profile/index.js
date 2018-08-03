import React, { Component } from 'react';
import axios from 'axios'
import { Container, Row, Col, Card } from 'reactstrap'
import { Animated } from "react-animated-css";

//style
import './style.css'

const API_FB = `https://graph.facebook.com/v2.10/me?fields=email,name,picture%7burl%7d&access_token=`
class Profile extends Component {
    constructor() {
        super()
        this.state = {
            profileFB: []
        }
    }
    getData = () => {
        const token = localStorage.getItem('token')
        axios.get(`${API_FB}${token}`)
            .then(({ data }) => {
                // console.log(data)
                this.setState({
                    profileFB: data
                })
            })
    }
    componentDidMount() {
        this.getData()
    }
    render() {
        const { profileFB } = this.state
        return (
            <Container>
                <Row>
                    <Col>
                        {console.log(profileFB)}
                        <Card className="p-5 mt-2 shadow-lg">
                            <Row>
                                <Col md={5}>
                                    {profileFB.picture !== undefined && (
                                        <div className="sytyleProfile">
                                            <Animated animationIn="zoomInRight" animationOut="bounceOutLeft" isVisible={true}>
                                                <image className="rounded img-style" src={profileFB.picture.data.url} alt="image" />
                                            </Animated>

                                            <div>
                                                <p>Name : {profileFB.name}</p>
                                                <p>Email : {profileFB.email}</p>
                                            </div>
                                        </div>
                                    )}
                                </Col>
                                <Col md={5}>

                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profile;