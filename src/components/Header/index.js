import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom'

import './style.css'
class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar  expand="md" className="nav-style">
                    <NavbarBrand tag={Link} to="/">zain</NavbarBrand>
                    <NavbarToggler>
                        <i className="far fa-list-alt toogleStyle" onClick={this.toggle}></i>
                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/profile">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/login">login</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;