export default function ImagePopup(props) {
  const { link, name } = props.card;
  return (
    <div className="popup__content popup__content_content_image">
      <img alt={name} className="popup__image" src={link} />
      <p className="popup__caption">{name}</p>
    </div>
  );
}
