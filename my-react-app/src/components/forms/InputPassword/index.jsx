import { useState } from "react";
import { forwardRef } from "react";
import { MdVisibility, MdVisibilityOff} from "react-icons/md";
import styles from "./style.module.scss";

export const InputPassword = forwardRef(({ error, label, ...rest }, ref) => {
	const [isHidden, setIsHidden] = useState(true);
	
	return(
		<div className={styles.containerIpunt}>
 			<label className="headline white" >{label}</label>
			<div>
				<input className="input" type={ isHidden ? "password" : "text" } ref={ref} {...rest}/>
				<button type="button" onClick={() => setIsHidden(!isHidden) }>
				{isHidden ? <MdVisibility color="#868E96" size="18px"/> : <MdVisibilityOff color="#868E96" size="18px"/>}
				</button>
			</div>
			 {error ? <p className="headlineBold red" >{error.message}</p> : null }
 		</div>
	);
});