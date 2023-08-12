import { forwardRef } from "react";
import styles from "./style.module.scss";

export const Input = forwardRef(({ error, label, ...rest }, ref) => {
	return(
		<div className={styles.containerIpunt}> 
 			<label className="headline white">{label}</label>
 			<input className="input" ref={ref} {...rest}/>
			{error ? <p className="headlineBold red">{error.message}</p> : null }
 		</div>
	);
});

