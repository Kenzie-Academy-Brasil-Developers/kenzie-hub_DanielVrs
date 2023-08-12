import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { ErrorPage } from "../pages/ErrorPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RouterMain = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	const userLogout = () => {
		setUser(null);
		localStorage.removeItem("@token-KenzieHub");
		navigate("/");
	}
	
	return (
		<Routes>
			<Route path="/" element ={<LoginPage setUser={setUser} />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/dashboard" element={<HomePage user={user} userLogout={userLogout} />} />
			<Route path="*" element={<ErrorPage/>} />
		</Routes>
	)
}