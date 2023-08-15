import { useContext } from "react";
import { Header } from "../../components/Header";
import { RoutineUserContext } from "../../providers/RoutineUserContext";
import styles from "./style.module.scss";

export const HomePage = () => {

	const {user ,userLogout} = useContext(RoutineUserContext);

	return (
		<div className={styles.dashFlex}>	
			<Header>
				<button className="btn sm grey" onClick={()=> userLogout()}>Sair</button>
			</Header>

			<main>
				<section className={styles.containerUserInfo}>
					<div>
						<h2 className="headlineBoldFixed white" >Olá,{user?.name}</h2>
						<span className="headlineFixed grey">{user?.course_module}</span>
					</div>
				</section>

				<section className={styles.containerPending}>
					<div>
						<h3 className="headlineBoldFixed white">Que pena! Estamos em desenvolvimento :(</h3>
						<p className="paragraph white">Nossa aplicação está em desenvolvimento, em breve teremos novidades</p>
					</div>
				</section>
			</main>
		</div>
	)
}