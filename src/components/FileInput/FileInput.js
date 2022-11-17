import React from "react";
import styles from "../Input/Input.module.css";

const FileInput = ({ isInvalid = false, invalidMsg, ...rest }) => {
  return (
    <>
      <input {...rest} />
      {isInvalid ? (
        <span className={styles.invalidMsgClass}>{invalidMsg}</span>
      ) : (
        <span className={styles.validClass}></span>
      )}
    </>
  );
};

export default FileInput;
