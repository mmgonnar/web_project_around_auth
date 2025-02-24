import React, { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [isTitleValid, setIsTitleValid] = useState(false);

  useEffect(() => {
    if (props.isOpened) {
      setTitle("");
      setLink("");
    }
  }, [props.isOpened]);

  const handleChangeTitle = (evt) => {
    setTitle(evt.target.value);
    setIsTitleValid(evt.target.validity.valid);
    checkFormValidity();
  };

  const handleChangeLink = (evt) => {
    setLink(evt.target.value);
    setIsLinkValid(evt.target.validity.valid);
    checkFormValidity();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    checkFormValidity();

    if (isFormValid) {
      props.onAddCard(link, title);
    } else {
      console.error("Please check inputs");
    }
  };

  const checkFormValidity = () => {
    if (isTitleValid && isLinkValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <PopupWithForm
      title="New Place"
      name="add"
      isOpened={props.isOpened}
      onClose={props.onClose}
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__set">
        <div className="popup__container-input">
          <input
            type="text"
            name="title"
            id="input-title"
            className="popup__input popup__input-title"
            placeholder="Title"
            minLength="2"
            maxLength="30"
            required
            autoComplete="on"
            value={title}
            onChange={handleChangeTitle}
          />
          <span className="popup__error" id="input__error-title"></span>
        </div>
        <div className="popup__container-input">
          <input
            type="url"
            name="url"
            id="input-image-add"
            className="popup__input popup__input-image"
            placeholder="Image URL"
            minLength="6"
            required
            autoComplete="on"
            value={link}
            onChange={handleChangeLink}
          />
          <span className="popup__error" id="input__error-url"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
