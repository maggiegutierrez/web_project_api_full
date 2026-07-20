import logo from "../../../images/logo.png";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import menuIcon from "../../../images/threeLines.png";
import closeIcon from "../../../images/close.svg";

function Header({ isLoggedIn, onLogout, currentUser }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderAuthLink = () => {
    if (location.pathname === "/signin") {
      return (
        <Link to="/signup" className="header__link">
          Regístrate
        </Link>
      );
    }
    if (location.pathname === "/signup") {
      return (
        <Link to="/signin" className="header__link">
          Iniciar sesión
        </Link>
      );
    }
    return null;
  };

  return (
    <header
      className={`header page__section ${isLoggedIn && isMenuOpen ? "header--open" : ""}`}
    >
      <div className="header__row">
        <img
          src={logo}
          alt="Around the México logo"
          className="logo header__logo"
        />
        {isLoggedIn ? (
          <button
            className="header__menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <img className="header__icon" src={closeIcon} alt="Close Icon" />
            ) : (
              <img className="header__icon" src={menuIcon} alt="Menu Icon" />
            )}
          </button>
        ) : (
          renderAuthLink()
        )}
      </div>

      {isLoggedIn && (
        <div className="header__user-block">
          <p className="header__user">{currentUser.email}</p>
          <button onClick={onLogout} className="header__logout">
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );

  // const whoIsTheUser = () => {
  //   if (isLoggedIn) {
  //     return (
  //       <>
  //         <p className="header__user">{currentUser.email}</p>
  //         <button onClick={onLogout} className="header__logout">
  //           Cerrar sesión
  //         </button>
  //       </>
  //     );
  //   }

  //   if (location.pathname === "/signin") {
  //     return (
  //       <Link to="/signup" className="header__link">
  //         Regístrate
  //       </Link>
  //     );
  //   }

  //   if (location.pathname === "/signup") {
  //     return (
  //       <Link to="/signin" className="header__link">
  //         Iniciar sesión
  //       </Link>
  //     );
  //   }

  //   return null;
  // };

  // return (
  //   <header className="header page__section">
  //     <img
  //       src={logo}
  //       alt="Around the México logo"
  //       className="logo header__logo"
  //     />
  //     <div className="header__user-info">{whoIsTheUser()}</div>
  //   </header>
  // );
}

export default Header;
