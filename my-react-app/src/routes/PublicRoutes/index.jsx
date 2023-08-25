import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { RoutineUserContext } from "../../providers/RoutineUserContext";

export const PublicRoutes = () => {
  const { user } = useContext(RoutineUserContext);

  return !user ? <Outlet /> : <Navigate to="/dashboard" />;
};
