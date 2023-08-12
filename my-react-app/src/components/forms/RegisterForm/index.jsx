import { useNavigate } from "react-router-dom";
import { Input } from "../Input";
import { InputPassword } from "../InputPassword";
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import { resgisterFormSchema } from "./registerFormSchema";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { useState } from "react";

export const RegisterForm = () => {

	const navigate = useNavigate();

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: zodResolver(resgisterFormSchema)
	});

	const [loading, setLoading] = useState(false);

	const userRegister = async (formData) => {
		try {
			setLoading(true)
			await api.post("/users",formData);
			 toast.success("Usuário criado com sucesso");
			 navigate("/")
		} catch (error) {
			if(error.response.data.message === "Email already exists"){
				toast.error("Usuário já cadastrado");
			}
		}finally{
			setLoading(false);
		}
	};

	const submit = (formData) =>{
		userRegister(formData);
	}

	return(
		<>
			<form className="formBox" onSubmit={handleSubmit(submit)}>
				<h2 className="title2 white">Crie sua conta</h2>
				<span className="headlineBold grey" >Rapido e grátis, vamos nessa</span>

				<Input label="Nome" type="texte" placeholder="Digite seu nome"  {...register("name")} error={errors.name} disabled={loading}/>

				<Input label="Email" type="email" placeholder="Digite seu email"  {...register("email")} error={errors.email} disabled={loading}/>

				<InputPassword label="Senha" placeholder="Digite sua senha"  {...register("password")} error={errors.password} disabled={loading}/>

				<InputPassword label="Confirmar Senha" placeholder="Digite novamente sua senha"  {...register("confirmPassword")} error={errors.confirmPassword} disabled={loading}/>

				<Input label="Bio" type="text" placeholder="Fale sobre você" {...register("bio")} error={errors.bio} disabled={loading}/>

				<Input label="Contato" type="tel" placeholder="Opção de contato" {...register("contact")} error={errors.contact} disabled={loading}/>

				<div className="selectBox">
					<label htmlFor="module" className="headline white">Selecionar módulo</label>

					<select id="module" className="input" {...register("course_module")} error={errors.course_module} disabled={loading}>
						<option value="">Selecione seu Módulo</option>
						<option value="Primeiro módulo (Introdução ao Frontend)">Primeiro Módulo</option>
						<option value="Segundo módulo (Frontend Avançado">Segundo Módulo</option>
						<option value="Terceiro módulo (Introdução ao Backend)">Terceiro Módulo</option>
						<option value="Quarto módulo (Backend Avançado)">Quarto Módulo</option>
					</select>
					{errors.course_module ? <p className="headlineBold red" >{errors.course_module.message}</p> : null }
				</div>
					<button className="btn lg brown" type="submit" disabled={loading}>
						{loading ? "Cadastando..." : "Cadastrar"}
					</button >
			</form>
		</>
	)
}