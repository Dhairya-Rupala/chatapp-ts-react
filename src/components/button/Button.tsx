// libs 
import { ReactNode,MouseEvent,KeyboardEvent } from "react";

// styles
import styles from "./Button.module.css";


type ButtonProps = {
    children: ReactNode,
    onClick: (e:KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>)=>void,
    disabled?: boolean,
    overrides?: {
        [property:string]:string
    }
}

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
