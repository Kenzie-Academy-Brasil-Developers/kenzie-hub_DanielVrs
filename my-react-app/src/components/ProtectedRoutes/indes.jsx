import { Navigate, Outlet } from "react-router-dom";
import { RoutineUserContext } from "../../providers/RoutineUserContext";
import { useContext } from "react";

export const ProtectedRoutes = () => {
	const {user} = useContext(RoutineUserContext);
	
	 return user ? <Outlet/> : <Navigate to="/"/>
}