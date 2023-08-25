import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { RoutineUserContext } from "../../providers/RoutineUserContext";

export const PrivateRoutes = () => {
  const { user } = useContext(RoutineUserContext);

  return user ? <Outlet /> : <Navigate to="/" />;
};
