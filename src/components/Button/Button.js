const Button = ({ title, className, disabled, children }) => {
  return (
    <button type="submit" className={className} disabled={disabled}>
      {title}
      {children}
    </button>
  );
};

export default Button;
