import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";  
import { Link } from "react-router-dom";
import Auth from "./modals/Auth";
import { BoxArrowInRight } from "react-bootstrap-icons";
import logo from "../img/logo.svg";

function Header() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
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
              <Nav.Link as={Link} to="/map">Карта</Nav.Link>
              <Nav.Link as={Link} to="/news">Новости</Nav.Link>
              <Nav.Link as={Link} to="/about">О проекте</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button variant="outline-light" onClick={() => setModalShow(true)}>
            Вход <BoxArrowInRight size={20} />
          </Button>
        </Container>
      </Navbar>

      {/* Модальное окно авторизации */}
      <Auth show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default Header;
