import { useState, useEffect, use } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import Login from "./Login";
import * as auth from "../utils/auth";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { getToken, setToken, removeToken } from "../utils/token";
import InfoTooltip from "./InfoToolTip";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  const [isOpen, setIOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    api
      .getUserInfo(jwt)
      .then((userData) => {
        setIsLoggedIn(true);
        setUserData(userData.email);
        setCurrentUser(userData);
      })
      .catch(console.error);

    const fetchData = async () => {
      try {
        const cardsData = await api.getCards();
        setCards(cardsData);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    try {
      let newCard;
      if (isLiked) {
        newCard = await api.deleteLikeCard(card._id);
      } else {
        newCard = await api.likeCard(card._id);
        //console.error("Liked Card", error);
      }

      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      //console.error("card like status: ", error);
    }
  };

  const handleCardDelete = async (cardId) => {
    try {
      await api.deleteCard(cardId);
      setCards((state) => state.filter((c) => c._id !== cardId));
    } catch (error) {
      console.error("Error deleting card");
    }
  };

  const handleEditAvatarClick = () => {
    setAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setCardPopupOpen(true);
    setSelectedCard(card);
  };

  const handlers = {
    add: setAddPlacePopupOpen,
    avatar: setAvatarPopupOpen,
    edit: setEditProfilePopupOpen,
    image: () => {
      setSelectedCard(null);
    },
  };

  const handleUpdateUser = (name, about) => {
    api
      .updateUser(name, about)
      .then((updateUser) => {
        setCurrentUser(updateUser);
        handleClose("edit");
      })
      .catch((error) => {
        console.log(error);
        console.error("Error updating user");
      });
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .updateAvatar(avatar)
      .then((updateAvatar) => {
        setCurrentUser(updateAvatar);
        handleClose("avatar");
      })
      .catch((error) => {
        console.log(error);
        console.error("Error updating avatar");
      });
  };

  const handleNewCard = (link, title) => {
    api
      .newCard(link, title)
      .then((addCard) => {
        setCards([addCard, ...cards]);
        //cards.unshift(addCard);
        //setCards(cards);
        handleClose("add");
      })
      .catch((error) => {
        console.log(error);
        console.error("Error adding new place");
      });
  };

  const handleClose = (popupId) => {
    const setClose = handlers[popupId];
    setClose(false);
  };

  const handleRegistration = ({ email, password, confirmPassword }) => {
    if (password === confirmPassword) {
      auth
        .register(email, password, confirmPassword)
        .then(() => {
          setIOpen(true);
          setIsSuccess(true);
          navigate("/signin");
        })
        .catch((err) => {
          console.error(err);
          setIOpen(true);
          setIsSuccess(false);
        });
    }
  };
  console.log(isOpen, "Open");
  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then(({ token }) => {
        setUserData(email, password);
        setToken(token);
        navigate("/");
        setIsLoggedIn(true);
        // const redirectPath = location.state?.from?.pathname || "/";
        // navigate(redirectPath);
      })
      .catch(console.error);
  };
  // const handleLogout = ({ token }) => {
  //   removeToken(token);
  //   navigate("/");
  // };

  // useEffect(() => {
  //   const jwt = getToken();
  //   if (!jwt) {
  //     return;
  //   }
  //   api
  //     .getUserInfo(jwt)
  //     .then((userData) => {
  //       setIsLoggedIn(true);
  //       setUserData(userData.email);
  //       setCurrentUser(userData);
  //     })
  //     .catch(console.error);
  // }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, setIsLoggedIn, setCurrentUser }}
    >
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            >
              <Main
                isEditProfilePopupOpen={isEditProfilePopupOpen}
                isAddPlacePopupOpen={isAddPlacePopupOpen}
                isAvatarPopupOpen={isAvatarPopupOpen}
                isCardPopupOpen={isCardPopupOpen}
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onClose={handleClose}
                selectedCard={selectedCard}
                setCurrentUser={setCurrentUser}
                onUpdateUser={handleUpdateUser}
                onUpdateAvatar={handleUpdateAvatar}
                cards={cards}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                onAddCard={handleNewCard}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={<Login handleLogin={handleLogin} />}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Route
          path="/signup"
          element={
            <Register
              handleRegistration={handleRegistration}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
      </Routes>
      {isOpen && (
        <InfoTooltip
          //message={tooltipMessage}
          isSuccess={isSuccess}
          //onClose={handleCloseTooltip}
          isOpen={isOpen}
        />
      )}
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
