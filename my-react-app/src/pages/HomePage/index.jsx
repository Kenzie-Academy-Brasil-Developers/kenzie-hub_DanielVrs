import { useContext } from "react";
import { Header } from "../../components/Header";
import { RoutineUserContext } from "../../providers/RoutineUserContext";
import { TechList } from "../../components/TechList";
import styles from "./style.module.scss";
import { CreateTechModal } from "../../components/Modal/CreateTechModal";
import {EditTechModal} from "../../components/Modal/EditTechModal";
import { RoutineTechContext } from "../../providers/TechContext";
import { CreateTechForm } from "../../components/forms/CreateTechForm";
import { EditTechForm } from "../../components/forms/EditTechForm";


export const HomePage = () => {
  const { user, userLogout } = useContext(RoutineUserContext);

  const { isOpenModalCreateTech, createTech, editingTech } = useContext(RoutineTechContext)
  
  return (
    
    <div className={styles.dashFlex}>

      {isOpenModalCreateTech ? 
        <CreateTechModal > 
          <CreateTechForm />
        </CreateTechModal> : null}

      {editingTech ? 
        <EditTechModal> 
          <EditTechForm />
        </EditTechModal> : null}

      <Header>
        <button className="btn sm grey" onClick={() => userLogout()}>
          Sair
        </button>
      </Header>

      <main>
        <section className={styles.containerUserInfo}>
          <div>
            <h2 className="headlineBoldFixed white">Olá,{user?.name}</h2>
            <span className="headlineFixed grey">{user?.course_module}</span>
          </div>
        </section>

        <section className={styles.containerPending}>
          <TechList />
        </section>
      </main>
    </div>

  );
};
