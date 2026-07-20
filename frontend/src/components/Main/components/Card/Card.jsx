import ImagePopup from "../popup/ImagePopup/ImagePopup";
import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link, isLiked } = props.card;
  const handleOpenPopup = props.handleOpenPopup;
  const handleLikeClick = props.onCardLike;
  const handleDeleteClick = props.onCardDelete;
  const ImageComponent = {
    title: null,
    children: <ImagePopup card={props.card} />,
  };
  const cardLikeButtonName = `card__like-button ${isLiked ? "card__like-button_is-active" : ""}`;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(ImageComponent)}
      />
      <button
        aria-label="Eliminar tarjeta"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Botón Me gusta"
          className={cardLikeButtonName}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
