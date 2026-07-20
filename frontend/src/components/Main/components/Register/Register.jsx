import { Link } from "react-router-dom";
import { useState } from "react";
import "../../../../../blocks/register.css";
import { isValidEmail } from "../../../../utils/validators";

const Register = ({ handleRegistration }) => {
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
    handleRegistration(data);
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
    <div className="register">
      <p className="register__tittle">Regístrate</p>
      <form noValidate className="register__form" onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          required
          className={`form__input ${emailError ? "form__input_type_error" : ""}`}
          placeholder="Correo electrónico"
          id="email"
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
          required
          className={`form__input ${passwordError ? "form__input_type_error" : ""}`}
          placeholder="Contraseña"
          id="password"
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
          className="register__button"
          disabled={
            !data.email ||
            !data.password ||
            !isValidEmail(data.email) ||
            data.password.length < 6
          }
        >
          Regístrate
        </button>
      </form>
      <div className="register__signup">
        <p>¿Ya eres miembro?</p>
        <Link to="/signin" className="register__link">
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
};

export default Register;
