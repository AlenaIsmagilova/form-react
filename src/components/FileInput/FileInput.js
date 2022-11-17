import React from "react";
import styles from "../Input/Input.module.css";

const FileInput = (props) => {
  return (
    <>
      <input {...props} />
      {props.isInvalid && (
        <span className={styles.invalidMsgClass}>{props.invalidMsg}</span>
      )}
    </>
  );
};

export default FileInput;
