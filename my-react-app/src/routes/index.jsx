import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { ErrorPage } from "../pages/ErrorPage";
import { ProtectedRoutes } from "../components/ProtectedRoutes/indes";


export const RouterMain = () => {
	
	return (
		<Routes>
			<Route path="/" element ={<LoginPage/>} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/dashboard" element={<ProtectedRoutes/>}>
				<Route index element={<HomePage/>} />
			</Route>
			<Route path="*" element={<ErrorPage/>} />
		</Routes>
	)
}