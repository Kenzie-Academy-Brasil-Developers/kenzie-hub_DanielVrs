import { useNavigate } from "react-router-dom";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import { InputPassword } from "../InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "./loginFormSchema";
import { api } from "../../../services/api";
import { useState } from "react";
import { toast } from "react-toastify";

export const LoginForm = ({setUser}) => {

	const { register, handleSubmit, formState:{ errors } } = useForm({
		resolver: zodResolver(loginFormSchema)
	});

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const userLogin = async (formData) => {
		try {
			setLoading(true);
			const res = await api.post("/sessions",formData);
			const token = res.data.token
			setUser(res.data.user);
			localStorage.setItem("@token-KenzieHub",token)
			toast.success("Login realizado com sucesso!");
			navigate("/dashboard")
		} catch (error) {
			toast.error("O e-mail e a senha não correspodem.");
		}finally{
			setLoading(false);
		}
	};

	const submit = (formData) =>{
		userLogin(formData);
	};

	return(
		<>
		<div className="container">
			<form className="formBox" onSubmit={handleSubmit(submit)}>
				<h2 className="title2 white">Login</h2>
				<Input label="Email" type="email" placeholder="Digite seu E-mail" {...register("email")} error={errors.email} disabled={loading}/>

				<InputPassword label="Senha"  placeholder="Digite sua senha" {...register("password")} error={errors.password} disabled={loading}/>

				<button className="btn lg pink" type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
				
				<p className="headlineBold grey">Ainda não possui uma conta?</p>
				<button className="btn lg grey" onClick={() => navigate("/register")} type="button">Cadastre-se</button>
			</form>	
		</div>
		</>
	)
}