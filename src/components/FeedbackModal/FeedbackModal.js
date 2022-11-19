import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ReactDOM from "react-dom";
import styles from "./FeedbackModal.module.scss";
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
              <img
                className={styles.closeIcon}
                src={closeButton}
                alt="кнопка закрытия"
              />
            </div>
            <h2 className={styles.modalTitle}>Cпасибо,{` ${candidateName}`}</h2>
            <p className={styles.modalContent}>Мы скоро свяжемся с вами</p>
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
