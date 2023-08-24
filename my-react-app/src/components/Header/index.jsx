import kenzieHubLogo from "../../assets/kenzie-Hub-Logo.svg";
import styles from "./style.module.scss";

export const Header = ({children}) => {
	return(
		<header className={styles.headerBox}>
			<div >
				<img src={kenzieHubLogo} alt="kenzie Hub Logo" />
					{children}
			</div>
		</header>
	)
}