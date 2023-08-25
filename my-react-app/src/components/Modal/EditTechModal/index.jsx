import { useContext, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { RoutineTechContext } from "../../../providers/TechContext";

export const EditTechModal = ({ children }) => {
  const { setEditingTech } = useContext(RoutineTechContext);

  const modalEditRef = useRef(null);

  useEffect(() => {
    const handleOutClick = (event) => {
      if (!modalEditRef.current?.contains(event.target)) {
        setEditingTech(null);
      }
    };

    window.addEventListener("mousedown", handleOutClick);

    return () => {
      window.removeEventListener("mousedown", handleOutClick);
    };
  }, []);

  const buttonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        buttonRef.current?.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div role="dialog" className={styles.modalOverlay}>
      <div ref={modalEditRef} className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <p className="title2Modal white">Cadastrar Tecnologia</p>
          <button
            ref={buttonRef}
            className={styles.closeButton}
            onClick={() => setEditingTech(null)}
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
