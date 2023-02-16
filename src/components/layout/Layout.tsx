// styles
import styles from "./Layout.module.css";
// types
import { LayoutProps } from "../../types";

const Layout = ({ top, left, right }:LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>{top}</div>
      <div className={styles.body}>
        <div className={styles.left}>{left}</div>
        <div className={styles.right}>{right}</div>
      </div>
    </div>
  );
};

export default Layout;
