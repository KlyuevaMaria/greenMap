import React, { useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/authSlice";

function Auth(props) {
  const [validated, setValidated] = useState(false);

  const click = async (event) => {
    setValidated(true);
  };

  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Регистрация
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="d-flex flex-column"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group md="4" controlId="validationCustom01">
            <Form.Control
              required
              className="mt-3"
              placeholder="Ваше имя"
              //   value={username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group md="4" controlId="validationCustom02">
            <Form.Control
              required
              className="mt-3"
              placeholder="Ваша фамилия"
              //   value={surname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group md="4" controlId="validationCustom03">
            <Form.Control
              required
              className="mt-3"
              placeholder="Ваш адрес электронной почты"
              //   value={email}
              onChange={handleChange}
            />{" "}
          </Form.Group>
          <Form.Group md="4" controlId="validationCustom04">
            <Form.Control
              required
              className="mt-3"
              placeholder="Придумайте пароль"
              //   value={password}
              onChange={handleChange}
              type="password"
            />{" "}
          </Form.Group>

          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            <Button className="mt-3" variant="light" type="submit">
              Отправить
            </Button>
            <button type="submit">Зарегистрироваться</button>

          </Row>
        </Form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Modal.Body>
    </Modal>
  );
}

export default Auth;
