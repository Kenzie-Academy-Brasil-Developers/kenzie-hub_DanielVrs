import { useContext } from "react";
import { BiPlus } from "react-icons/bi";
import { RoutineTechContext } from "../../providers/TechContext";
import { TechCard } from "./TechCard";
import styles from "./style.module.scss";

export const TechList = () => {
  const { techList, setIsOpenModalCreateTech } = useContext(RoutineTechContext);

  return (
    <div className={styles.containerList}>
      <div>
        <h3 className="title2 white">Tecnologias</h3>
        <button
          className="btn sm grey"
          onClick={() => setIsOpenModalCreateTech(true)}
          title="Adicionar Tech"
          area-aria-label="add"
        >
          <BiPlus color="white" size={24} />
        </button>
      </div>

      <ul>
        {techList?.map((tech) => (
          <TechCard key={tech.id} tech={tech} />
        ))}
      </ul>
    </div>
  );
};
