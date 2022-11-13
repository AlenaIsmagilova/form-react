const Button = ({ title, className, disabled }) => {
  return (
    <button type="submit" className={className} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
