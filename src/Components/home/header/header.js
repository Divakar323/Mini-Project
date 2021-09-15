import React from 'react'
import { Link } from "react-router-dom";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';
import "./header.css"
import logo from '../../../assets/homelogo.png';

class BootstrapNavbar extends React.Component{

    render(){
        return(
            <div>
                <div className="row" >
                    <div className="col-md-12 fixed-top">
                            <Navbar className="homeHeader  container-flui" bg="light" variant="light" expand="lg">
                                <Navbar.Brand href="/"><img src={logo} alt=""/><span style={{fontWeight: "bold"}}>Connect</span></Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="#block3">Speciality</Nav.Link>
                                    <Nav.Link href="#block4">Features</Nav.Link>
                                    </Nav>
                                    <Nav pullLeft className="form-inline my-2 my-lg-0 smallWidth" style={{marginRight: "100px"}} >
                                      <Link to="/login" className="btn btn-outline-dark mr-1">
                                          Log In
                                      </Link>

                                      <Link to="/login" className="btn btn-light mr-1">
                                          Sign Up
                                      </Link>
                                    </Nav>
                                </Navbar.Collapse>
                                <Nav className="form-inline my-2 my-lg-0 bigWidth" style={{marginRight: "100px"}} >
                                      <Link to="/login" className="btn btn-outline-dark mr-1">
                                          Log In
                                      </Link>

                                      <Link to="/login" className="btn btn-light mr-1">
                                          Sign Up
                                      </Link>
                                    </Nav>
                            </Navbar>
                            <br />
                    </div>
                </div>
            </div>
        )  
    }
}

export default BootstrapNavbar;