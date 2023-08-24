import { z } from "zod";

export const editTechFormSchema = z.object({
	status: z.string().nonempty("O status é obrigatório")
});