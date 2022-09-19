import styles from "../ModalOverlay/ModalOverlay.module.css";

const ModalOverlay = ({ children, onClick }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClick}>
      {children}
    </div>
  );
};

export default ModalOverlay;
