import { useContext } from "react"
import { RoutineTechContext } from "../../../providers/TechContext"
import { Input } from "../Input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editTechFormSchema } from "./editTechFormSchema"
import styles from "./style.module.scss";

export const EditTechForm = () =>{
  
  const { editTech , editingTech } = useContext(RoutineTechContext)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    values:{
      title: editingTech.title,
      status: editingTech.status
    },
    resolver: zodResolver(editTechFormSchema)
  });

  const submit = (formData) => {
    editTech(editingTech.id, formData,reset,)
  }

  return(
    <form className={styles.formTech} onSubmit={handleSubmit(submit)}>
      <Input label="Nome" type="text" placeholder="Digite a Tech" {...register("title")} error={errors.title} disabled />
      <div className={styles.selectBox}>
        <label className="headline white" htmlFor="status">Status</label>
        <select className="input" id="status"{...register("status")} error={errors.status}>
          <option value="" disabled>Selecione o status</option>
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>
      </div>
      <button className="btn lg brown" type="submit" >Cadastrar Tecnologia</button>
    </form>
  )
}