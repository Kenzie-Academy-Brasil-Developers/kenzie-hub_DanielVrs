import { z } from "zod";

export const createTechFormSchema = z.object({
	title: z.string().nonempty("O nome da tecnologia é obrigatório"),
	status: z.string().nonempty("O status é obrigatório")
});