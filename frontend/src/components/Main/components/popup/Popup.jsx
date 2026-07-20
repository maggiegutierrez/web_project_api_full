import { useEffect } from "react";

export default function Popup(props) {
  const { onClose, title, children, type } = props;
  const popupCloseOverlay = (evt) => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscClose);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  return (
    <div className="popup" id="edit-popup" onClick={popupCloseOverlay}>
      <div
        className={`popup__content ${!title ? "popup__content_content_image" : ""} ${type === "delete" ? "popup__content_content_delete" : ""}`}
      >
        <button
          aria-label="Cerrar ventana emergente"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
