import { Header } from "../../components/Header";
import { LoginForm } from "../../components/forms/LoginForm";

export const LoginPage = ({setUser}) => {
	return(
		<>
			<Header />

			<main>
				<LoginForm setUser={setUser} />
			</main>

		</>
	)

}