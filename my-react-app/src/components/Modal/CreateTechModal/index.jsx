import { useContext, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { RoutineTechContext } from "../../../providers/TechContext";


export const CreateTechModal= ({children}) => {
  const { setIsOpenModalCreateTech } = useContext(RoutineTechContext)

  const modalCreateRef = useRef(null);

  useEffect(()=> {
    const handleOutClick = (event) => {

      if(!modalCreateRef.current?.contains(event.target)){
        setIsOpenModalCreateTech(false);
        
      }
    }

    window.addEventListener("mousedown", handleOutClick)

    return () => {
      window.removeEventListener("mousedown", handleOutClick)
    }
  },[])

  const buttonRef = useRef(null);

  useEffect(()=>{

    const handleKeyDown = (event) => {
      if(event.key === "Escape"){
        buttonRef.current?.click();
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }


  },[])

  return(
    <div role="dialog" className={styles.modalOverlay}>
      <div ref={modalCreateRef} className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <p className="title2Modal white">Cadastrar Tecnologia</p>
          <button ref={buttonRef} className={styles.closeButton} onClick={()=> setIsOpenModalCreateTech(false)}>X</button>
        </div>
        {children}
      </div>
    </div>
  )
}