import { Link } from "react-router-dom";
import { useState } from "react";
import "../../../../../blocks/login.css";
import { isValidEmail } from "../../../../utils/validators";

const Login = ({ handleLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  const emailError =
    data.email && !isValidEmail(data.email)
      ? "Ingresa un correo electrónico válido"
      : "";

  const passwordError =
    data.password && data.password.length < 6
      ? "La contraseña debe tener al menos 6 caracteres"
      : "";

  return (
    <div className="login">
      <p className="login__tittle">Inicia Sesión</p>
      <form noValidate className="login__form" onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          className={`form__input ${emailError ? "form__input_type_error" : ""}`}
          id="email"
          required
          placeholder="Correo electrónico"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <span
          className={`form__input-error ${emailError ? "form__input-error_active" : ""}`}
        >
          {emailError}
        </span>
        <label htmlFor="password"></label>
        <input
          className={`form__input ${passwordError ? "form__input_type_error" : ""}`}
          id="password"
          required
          placeholder="Contraseña"
          name="password"
          type="password"
          minLength="6"
          value={data.password}
          onChange={handleChange}
        />
        <span
          className={`form__input-error ${passwordError ? "form__input-error_active" : ""}`}
        >
          {passwordError}
        </span>
        <button
          type="submit"
          className="login__button"
          disabled={
            !data.email ||
            !data.password ||
            !isValidEmail(data.email) ||
            data.password.length < 6
          }
        >
          Inicia sesión
        </button>
      </form>

      <div className="login__signin">
        <p>¿Aún no eres miembro?</p>
        <Link to="/signup" className="signin__link">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

export default Login;
