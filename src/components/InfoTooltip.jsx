import React, { useRef, useEffect } from "react";
import unsuccessful from "../../public/icons/unsuccessful.svg";
import successful from "../../public/icons/successful.svg";

const InfoToolTip = ({ onOpen, onSuccess, errorMessage, onClose }) => {
  console.log(onOpen, "is open");
  console.log(onSuccess, "Success");
  const popupRef = useRef(null);
  const handleClose = () => {
    const popupId = popupRef.current.id;
    onClose(popupId);
  };

  // close with esc
  useEffect(() => {
    const handleKeyPress = (evt) => {
      if (evt.key === "Escape") {
        handleClose(evt);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <div
        //className="popup_show info-tootip"
        ref={popupRef}
        //id={props.name}
        className={`popup popup__tooltip ${onOpen ? "popup_show" : ""}`}
      >
        <div onClick={handleClose} className="popup__overlay"></div>
        <div className="popup__content">
          <div className="popup__container">
            <button
              onClick={handleClose}
              className="button button_close"
            ></button>
            <img
              className="popup__icon"
              src={onSuccess ? successful : unsuccessful}
              alt={onSuccess ? "successful" : errorMessage}
            />
            <p className="popup__message">
              {onSuccess ? "Successful registration! Now login" : errorMessage}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoToolTip;

//////////
