import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { RegisterForm } from "../../components/forms/RegisterForm";
import styles from "./style.module.scss";

export const RegisterPage = () => {
	return (
		<div className={styles.headerFlex}>
			<Header >
				<Link className="btn sm grey" to="/">Voltar</Link>
			</Header>

			<main>
				<RegisterForm />
			</main>
		</div>
	)
}