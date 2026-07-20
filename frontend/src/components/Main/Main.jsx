import { useState, useEffect, useContext } from "react";
import EditIcon from "../../../images/edit-icon.svg";
import NewCard from "./components/popup/NewCard/NewCard";
import EditAvatar from "./components/popup/Avatar/EditAvatar";
import EditProfile from "./components/popup/EditProfile/EditProfile";
import Popup from "./components/popup/Popup";
import ImagePopup from "./components/popup/ImagePopup/ImagePopup";
import Card from "./components/Card/Card";
import RemoveCardPopup from "./components/popup/RemoveCard/RemoveCard";
import api from "../../utils/api";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);

  const popup = props.popup;
  const handleOpenPopup = props.onOpenPopup;
  const justClosePopup = props.onClosePopup;

  const handleCardLike = props.onCardLike;
  const handleCardDelete = props.onCardDelete;
  const cardsList = props.cards;

  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const editAvatarPopup = { title: "Cambiar avatar", children: <EditAvatar /> };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const removeCardPopup = (card) => ({
    title: "¿Estás seguro/a?",
    children: <RemoveCardPopup card={card} />,
    type: "delete",
  });

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__overlay">
          <button
            aria-label="Editar avatar"
            className="profile-avatar-edit-button"
            type="button"
            onClick={() => {
              handleOpenPopup(editAvatarPopup);
            }}
          >
            <img
              src={EditIcon}
              className="profile-avatar-edit-button__icon"
              alt="Editar avatar"
            />
          </button>
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Avatar"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">
            {currentUser.name || "Nombre de usuario"}
          </h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => {
              handleOpenPopup(editProfilePopup);
            }}
          ></button>
          <p className="profile__about">{currentUser.about || "Sobre mí"}</p>
        </div>
        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => {
            handleOpenPopup(newCardPopup);
          }}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {cardsList.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={handleOpenPopup}
              onCardLike={() => {
                handleCardLike(card);
              }}
              onCardDelete={() => {
                handleOpenPopup(removeCardPopup(card));
              }}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={justClosePopup} title={popup.title} type={popup.type}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
