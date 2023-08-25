import imgError from "../../assets/404-error-not-found.png";
import styles from "./style.module.scss";

export const ErrorPage = () => {
  return (
    <main className={styles.containerBox}>
      <img src={imgError} alt="image error" />
    </main>
  );
};
