import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../img/logo.svg";
import { Link } from "react-router-dom";
import Auth from "./modals/Auth";
import Button from "react-bootstrap/esm/Button";
import { BoxArrowInRight } from 'react-bootstrap-icons';


function Header() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            {" "}
            <img
              src={logo}
              width="70"
              className="d-inline-block align-top"
              alt="green map logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/map">
                карта
              </Nav.Link>
              <Nav.Link as={Link} to="/news">
                новости
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                о проекте
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button variant="outline-light" onClick={() => setModalShow(true)}>
        Вход <BoxArrowInRight size={20}/>
      </Button>
        </Container>
      </Navbar>

      <Auth
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Header;
