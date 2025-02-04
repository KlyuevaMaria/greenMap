import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/authSlice";

function Auth(props) {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      dispatch(signup(formData));
    }
    setValidated(true);
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group md="4" controlId="validationCustom01">
            <Form.Control
              required
              className="mt-3"
              placeholder="Ваше имя"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group md="4" controlId="validationCustom02">
            <Form.Control
              required
              className="mt-3"
              placeholder="Ваша фамилия"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group md="4" controlId="validationCustom03">
            <Form.Control
              required
              className="mt-3"
              type="email"
              placeholder="Ваш адрес электронной почты"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group md="4" controlId="validationCustom04">
            <Form.Control
              required
              className="mt-3"
              type="password"
              placeholder="Придумайте пароль"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="d-flex justify-content-between mt-3">
            <Button className="mt-3" variant="light" type="submit">
              Отправить
            </Button>
          </Row>
        </Form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Modal.Body>
    </Modal>
  );
}

export default Auth;
