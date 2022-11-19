import styles from "./Input.module.scss";

const Input = ({
  titleForLabel,
  className,
  invalidMsg,
  onChange,
  onBlur,
  required,
  isInvalid = false,
  ...restProps
}) => {
  return (
    <label className={styles.label}>
      {titleForLabel}
      <input
        className={className}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        {...restProps}
      />
      {isInvalid ? (
        <span className={styles.invalidMsgClass}>{invalidMsg}</span>
      ) : (
        <span className={styles.validClass}></span>
      )}
    </label>
  );
};

export default Input;
