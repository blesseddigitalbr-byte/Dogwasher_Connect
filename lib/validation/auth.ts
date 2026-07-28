import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Informe um e-mail válido."),
  password: z
    .string()
    .min(8, "A senha precisa ter pelo menos 8 caracteres."),
  role: z.enum(["professional", "establishment_owner"], {
    message: "Selecione se você é profissional ou estabelecimento.",
  }),
  fullNameOrRazaoSocial: z
    .string()
    .min(2, "Informe o nome completo ou a razão social."),
  acceptedTerms: z.literal(true, {
    message: "É necessário aceitar os termos de uso para continuar.",
  }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email("Informe um e-mail válido."),
  password: z.string().min(1, "Informe sua senha."),
});

export type SignInInput = z.infer<typeof signInSchema>;
