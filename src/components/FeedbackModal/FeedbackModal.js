import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ReactDOM from "react-dom";
import styles from "../Modal/Modal.module.css";
import React, { useEffect } from "react";
import closeButton from "../../images/Vector.svg";

const ModalRoot = document.getElementById("react-modals");

const FeedbackModal = ({ open, handleClose, candidateName }) => {
  const closeOnEscKey = (e) => (e.key === "Escape" ? handleClose() : null);

  useEffect(() => {
    window.addEventListener("keydown", closeOnEscKey);
    return () => {
      window.removeEventListener("keydown", closeOnEscKey);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      {open && (
        <ModalOverlay onClick={handleClose}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.closeBtnWrapper} onClick={handleClose}>
              <img src={closeButton} alt="кнопка закрытия" />
            </div>
            <h2>Cпасибо,{` ${candidateName}`}</h2>
            <div className={styles.modalContent}>Мы скоро свяжемся с вами</div>
            <button
              className={styles.agreeButton}
              type="button"
              onClick={handleClose}
            >
              Понятно
            </button>
          </div>
        </ModalOverlay>
      )}
    </>,
    ModalRoot
  );
};
export default FeedbackModal;
