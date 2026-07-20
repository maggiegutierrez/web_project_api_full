import { useContext, useState, useRef } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";
import { isImageUrl } from "../../../../../utils/validators";

export default function NewCard() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const userContext = useContext(CurrentUserContext);
  const onAddPlaceSubmit = userContext.handleAddPlaceSubmit;

  const linkError =
    link.trim() && !isImageUrl(link)
      ? "El enlace debe ser una imagen válida"
      : "";

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPlaceSubmit({ name, link });
  };

  return (
    <form
      className="popup__form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        id="place-input"
        className="popup__input popup__input_type_card-name"
        name="placeName"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="place-input-error popup__input-error"></span>
      <input
        id="link-input"
        className={`popup__input popup__input_type_url ${linkError ? "popup__input_type_error" : ""}`}
        name="link"
        placeholder="Enlace a la imagen"
        required
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span
        className={`link-input-error popup__input-error ${linkError ? "popup__input-error_active" : ""}`}
      >
        {linkError}
      </span>

      <button
        className="button popup__button"
        type="submit"
        disabled={!name.trim() || !link.trim() || !isImageUrl(link)}
      >
        Crear
      </button>
    </form>
  );
}
