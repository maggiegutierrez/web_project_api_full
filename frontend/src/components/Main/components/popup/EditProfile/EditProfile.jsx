import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile(props) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser, onUpdateAvatar } = userContext;

  const [name, setName] = useState(userContext.currentUser.name);
  const [description, setDescription] = useState(userContext.currentUser.about);
  const [avatar, setAvatar] = useState(userContext.currentUser.avatar);

  const nameError =
    name.trim() && name.trim().length < 2
      ? "El nombre debe tener al menos 2 caracteres"
      : "";

  const descriptionError =
    description.trim() && description.trim().length < 2
      ? "La descripción debe tener al menos 2 caracteres"
      : "";

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser({ name, about: description });
  };

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        className={`popup__input popup__input_type_name ${nameError ? "popup__input_type_error" : ""}`}
        name="name"
        placeholder="Nombre"
        type="text"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span
        className={`name-input-error popup__input-error ${nameError ? "popup__input-error_active" : ""}`}
      >
        {nameError}
      </span>
      <input
        id="about-input"
        className={`popup__input popup__input_type_about ${descriptionError ? "popup__input_type_error" : ""}`}
        name="about"
        placeholder="Acerca de mí"
        type="text"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={handleDescriptionChange}
      />
      <span
        className={`about-input-error popup__input-error ${descriptionError ? "popup__input-error_active" : ""}`}
      >
        {descriptionError}
      </span>
      <button
        className="button popup__button"
        type="submit"
        disabled={
          !name.trim() ||
          !description.trim() ||
          !!nameError ||
          !!descriptionError
        }
      >
        Guardar
      </button>
    </form>
  );
}
