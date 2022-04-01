import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useParams} from "react-router-dom"
import {Nav, Navbar , Container, NavbarBrand, NavLink} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const NavbarObj = () =>{



    return(
        
        <Navbar bg="warning" variant="light">
            <Container>
                <Navbar.Brand href="/">Driving Monitoring System</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/driverlist">Drivers</Nav.Link>
                <Nav.Link href="/allevent">Events Report</Nav.Link>
                
                </Nav>
            </Container>
        </Navbar>
    )

}

export default NavbarObj