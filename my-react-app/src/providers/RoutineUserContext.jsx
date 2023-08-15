import { createContext, useEffect } from "react";
import { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const RoutineUserContext = createContext({});

export const RoutineUserProvider = ({children}) => {

	const navigate = useNavigate();
	
	
	const [user, setUser] = useState(null);



	useEffect(() => {
		const loadUser = async () => {
			const token = localStorage.getItem("@token-KenzieHub");

			if(token){
				try {
					const {data} = await api.get("/profile",{
						headers:{
							Authorization: `Bearer ${token}`
						}
					});	
					setUser(data);
					navigate("/dashboard");
				} catch (error) {
					localStorage.removeItem("@token-KenzieHub");
				}
			}

		}
		loadUser();
	}, []);
	
	
	const userLogin = async (formData, reset, setLoading) => {
		try {
			setLoading(true);
			const res = await api.post("/sessions",formData);
			const token = res.data.token;
			setUser(res.data.user);
			localStorage.setItem("@token-KenzieHub",token);
			toast.success("Login realizado com sucesso!");
			reset();
			navigate("/dashboard");
		} catch (error) {
			toast.error("O e-mail e a senha não correspondem.");
		}finally{
			setLoading(false);
		}
	};

	const userRegister = async (formData, reset, setLoading) => {
		try {
			setLoading(true);
			await api.post("/users",formData);
			 toast.success("Usuário criado com sucesso");
			 reset();
			 navigate("/");
		} catch (error) {
			if(error.response.data.message === "Email already exists"){
				toast.error("Usuário já cadastrado");
			}
		}finally{
			setLoading(false);
		}
	};

	const userLogout = () => {
		setUser(null);
		localStorage.removeItem("@token-KenzieHub");
		navigate("/");
	};

	return(
		<RoutineUserContext.Provider value={{ userLogin, userRegister, user , userLogout }}>
			{children}
		</RoutineUserContext.Provider>
	);
};