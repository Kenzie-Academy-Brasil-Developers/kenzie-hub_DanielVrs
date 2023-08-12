import { z } from "zod";


export const resgisterFormSchema = z.object({
	name: z.string() .nonempty("O nome é obrigatorio"),
	email: z.string() .nonempty("O email é obrigatorio") .email("Forneça um email valido"),
	password: 
		z.string() 
		.nonempty("A senha é obrigatoria") 
		.min(8, "São necessarios pelo menos oito caracteres.") 
		.regex(/[A-Z]+/, "É necessario conter ao menos uma letra maiúscula" )
		.regex(/[a-z]+/, "É necessario conte ao menos uma letra minuscula")
		.regex(/[0-9]+/, "É necessario conte ao menos um número")
		.regex(/[!@#$%^&*()\-_=+[\]{};:'",.<>/?]+/, "É necessario conte ao menos um caracter especial"),
	confirmPassword: z.string() .nonempty("Confirmar a senha é obrigatorio"),
	bio: z.string() .nonempty("A bio é obrigatorio"),
	contact: z.string() .nonempty("O contato é obrigatorio"),
	course_module: z.string() .nonempty("Escolher um setor é obrigatorio")
}).refine(({password , confirmPassword}) => password === confirmPassword, {
	message: "As senhas não correspondem",
	path: ["confirmPassword"]
});