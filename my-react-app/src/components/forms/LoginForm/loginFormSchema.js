import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().nonempty("o e-mail é obrigatorio"),
	password: z.string().nonempty("A senha é obrigatoria")
});