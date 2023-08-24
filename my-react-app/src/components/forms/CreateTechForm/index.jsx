import { useContext, useState } from "react"
import { RoutineTechContext } from "../../../providers/TechContext"
import { Input } from "../Input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createTechFormSchema } from "./createTechFormSchema"
import styles from "./style.module.scss";

export const CreateTechForm = () =>{

  const { createTech } = useContext(RoutineTechContext)

 
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(createTechFormSchema)
  })

  const submit = (formData) => {
    createTech(formData,reset, )
  }

  return(
    <form className={styles.formTech} onSubmit={handleSubmit(submit)}>
      <Input label="Nome" type="text" placeholder="Digite a Tech" {...register("title")} error={errors.title} />
      <div className={styles.selectBox}>
        <label className="headline white" htmlFor="status">Selecione o status</label>
        <select className="input" id="status"{...register("status")} error={errors.status} >
          <option value="" disabled>Selecione o status</option >
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>
      </div>
      <button className="btn lg pink" type="submit" >Cadastrar Tecnologia</button>
    </form>
  )
}