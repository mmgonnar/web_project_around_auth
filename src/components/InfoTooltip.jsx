import React, { useRef, useEffect } from "react";
import unsuccessful from "../../public/icons/unsuccessful.svg";
import successful from "../../public/icons/successful.svg";

const InfoToolTip = ({ isOpen, isSuccess, errorMessage, onClose }) => {
  const popupRef = useRef(null);
  const handleClose = () => {
    const popupId = popupRef.current.id;
    onClose(popupId);
  };
  // CLOSE WITH ESC
  // useEffect(() => {
  //   const handleKeyPress = (evt) => {
  //     if (evt.key === "Escape") {
  //       handleClose(evt);
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, []);

  return (
    <>
      <div
        //className="popup_show info-tootip"
        ref={popupRef}
        //id={props.name}
        className={`popup popup_${isOpen} "popup_show" ${
          isOpen ? "popup_show" : ""
        }`}
      >
        <div onClick={handleClose} className="popup__overlay"></div>
        <div className="popup__content">
          <img
            src={isSuccess ? successful : unsuccessful}
            alt={isSuccess ? "successful" : errorMessage}
          />
          <p>{isSuccess ? "Successful registration" : errorMessage}</p>
          <button
            onClick={handleClose}
            className="button button_close"
          ></button>
        </div>
        <img
          src={isSuccess ? successful : unsuccessful}
          alt={isSuccess ? "successful" : errorMessage}
        />
        <p>{isSuccess ? "Successful registration" : errorMessage}</p>
        <button onClick={handleClose} className="button button_close"></button>
      </div>
    </>
  );
};

export default InfoToolTip;
