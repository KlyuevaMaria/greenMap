import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/authSlice";
import { Button, Container, Form, Row } from "react-bootstrap";
import React from "react";

const Signup = () => {
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
  const [validated, setValidated] = useState(false);

  return (
    <Container>
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
          <Button className="mt-3" variant="warning" type="submit">
            Отправить
          </Button>
        </Row>
      </Form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Container>
  );
};

export default Signup;
