import { useContext } from "react";
import { BiSolidPencil, BiTrash } from "react-icons/bi";
import { RoutineTechContext } from "../../../providers/TechContext";
import styles from "./style.module.scss";

export const TechCard = ({ tech }) => {
  const { deleteTech, setEditingTech } = useContext(RoutineTechContext);

  return (
    <>
      <li className={styles.cardTech}>
        <div className={styles.containerTexts}>
          <p className="titleTechCard white">{tech.title}</p>
          <span className="statusTechCard grey">{tech.status}</span>
        </div>
        <div className={styles.containerButtons}>
          <button
            className="iconClicked"
            onClick={() => setEditingTech(tech)}
            title="Editar Tech"
            area-aria-label="edit"
          >
            <BiSolidPencil color="white" size={20} />
          </button>
          <button
            className="iconClicked"
            onClick={() => deleteTech.mutate(tech.id)}
            title="Deletar Tech"
            area-aria-label="remove"
          >
            <BiTrash color="white" size={20} />
          </button>
        </div>
      </li>
    </>
  );
};
