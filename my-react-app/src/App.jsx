import { RouterMain } from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import "./styles/index.scss";

export const App = () => {
  return (
    <>
     
			<RouterMain />
			<ToastContainer theme="dark" position="bottom-right" autoClose={1.5 * 1000}/>
    </>
  )
}

