import { Link, useNavigate } from "react-router-dom";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import { InputPassword } from "../InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "./loginFormSchema";
import { useContext, useState } from "react";
import { RoutineUserContext } from "../../../providers/RoutineUserContext";

export const LoginForm = () => {

	const [loading, setLoading] = useState(false);

	const {userLogin} = useContext(RoutineUserContext);

	const navigate = useNavigate();

	const { register, handleSubmit, reset, formState:{ errors } } = useForm({
		resolver: zodResolver(loginFormSchema)
	});

	const submit = (formData) =>{
		userLogin(formData, reset, setLoading);
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
				<Link to="/register" className="btn lg grey">Cadastre-se</Link>
			</form>	
		</div>
		</>
	)
}