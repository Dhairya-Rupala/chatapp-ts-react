// styles
import styles from "./Button.module.css";

// types 
import { ButtonProps } from "./types";

export const Button = ({
  children,
  onClick,
  overrides,
  disabled = false,
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles.button} disabled={disabled} style={overrides}>
      {children}
    </button>
  );
};
