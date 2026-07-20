import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { TOKEN_KEY } from "../utils/constants";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

import api from "../utils/api";
import Login from "./Main/components/Login/Login";
import Register from "./Main/components/Register/Register";
import InfoTooltip from "../components/Main/components/popup/InfoToolTip/InfoToolTip";

import * as auth from "../utils/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState({
    isSuccess: false,
    message: "",
  });

  const [cards, setCards] = useState([]);
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || "");

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistration = ({ email, password }) => {
    return auth
      .register(email, password)
      .then(() => {
        console.log("Registration successful");
        setTooltipStatus({
          isSuccess: true,
          message: "¡Te has registrado exitosamente!",
        });
        navigate("/signin");
      })
      .catch((error) => {
        console.log(`Error during registration: ${error}`);
        setTooltipStatus({
          isSuccess: false,
          message: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
        });
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (!data.token) {
          return Promise.reject("No se recibió un token de autenticación");
        }
        setToken(data.token);
        return auth.login();
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        return api.getInitialCards();
      })
      .then((cards) => {
        setCards(cards);
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
      })
      .catch((error) => {
        console.error(error);
        setTooltipStatus({
          isSuccess: false,
          message: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
        });
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogout = () => {
    return auth
      .logout()
      .then(() => {
        setToken("");
        setIsLoggedIn(false);
        navigate("/signin");
      })
      .catch(console.error);
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const handleCloseInfoTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    auth
      .login()
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        return api.getInitialCards();
      })
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => {
        console.log(`Error getting the full user information: ${error}`);
      });
  }, []);

  const handleUpdateUser = (data) => {
    api.patchUserData(data).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    });
  };

  function handleUpdateAvatar(data) {
    api.patchAvatar(data).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    });
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    await api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  function confirmationCardDelete(card) {
    handleOpenPopup();
    handleCardDelete(card);
  }

  async function handleCardDelete(card) {
    await api
      .deleteCardData(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  async function handleAddPlaceSubmit(data) {
    await api.postCardData(data).then((newCard) => {
      setCards([newCard, ...cards]);
      handleClosePopup();
    });
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleCardDelete,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page__content">
        <Header
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Main
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={confirmationCardDelete}
                />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login handleLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Register handleRegistration={handleRegistration} />
              )
            }
          />
          {/* <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <>
                  <Register handleRegistration={handleRegistration} />
                  {isInfoTooltipOpen && (
                    <InfoTooltip
                      isSuccess={tooltipStatus.isSuccess}
                      message={tooltipStatus.message}
                      onClose={handleCloseInfoTooltip}
                    />
                  )}
                </>
              )
            }
          /> */}
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
        {isInfoTooltipOpen && (
          <InfoTooltip
            isSuccess={tooltipStatus.isSuccess}
            message={tooltipStatus.message}
            onClose={handleCloseInfoTooltip}
          />
        )}
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
