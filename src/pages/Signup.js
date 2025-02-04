import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/authSlice";

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

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="surname"
          placeholder="Фамилия"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Имя"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          required
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Signup;
