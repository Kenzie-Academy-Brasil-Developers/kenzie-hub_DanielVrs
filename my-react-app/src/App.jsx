import { RouterMain } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles/index.scss";
import { useContext } from "react";
import { RoutineUserContext } from "./providers/RoutineUserContext";
import { Loading } from "./components/Loading";

export const App = () => {
  const { isLoading } = useContext(RoutineUserContext);

  return (
    <>
      {isLoading ? <Loading /> : <RouterMain />}

      <ToastContainer
        theme="dark"
        position="bottom-right"
        autoClose={1.5 * 1000}
      />
    </>
  );
};
