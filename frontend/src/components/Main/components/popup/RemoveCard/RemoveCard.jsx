import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function RemoveCard(props) {
  const userContext = useContext(CurrentUserContext);
  const { handleCardDelete } = userContext;
  const { card } = props;

  const handleConfirmationCardDelete = (evt) => {
    evt.preventDefault();
    handleCardDelete(card);
  };

  return (
    <>
      <button
        id="deleteButton"
        className="button popup__button popup__button_type_delete"
        type="button"
        onClick={handleConfirmationCardDelete}
      >
        Sí
      </button>
    </>
  );
}
