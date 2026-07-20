import ok from "../../../../../../images/OK.svg";
import error from "../../../../../../images/ERROR.svg";

function InfoTooltip({ isSuccess, message, onClose }) {
  return (
    <div className="popup ">
      <div className="popup__content popup__info-tooltip">
        <button
          aria-label="Cerrar ventana emergente"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          src={isSuccess ? ok : error}
          alt={isSuccess ? "Exito" : "Error"}
          className="popup__image-info-tooltip"
        />
        <p className="popup__title-info-tooltip">{message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
