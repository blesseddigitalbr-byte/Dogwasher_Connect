/**
 * Roles do Dog Washer Connect — Fase 1.
 * Espelha o campo `role` da tabela `users` (ver supabase/migrations/0001_core.sql).
 */
export const ROLES = {
  PROFESSIONAL: "professional",
  ESTABLISHMENT_OWNER: "establishment_owner",
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/**
 * Status de aprovação — usado tanto para professional_profiles quanto
 * para establishments (ver seção "Regras de status" da Fase 1).
 */
export const PROFESSIONAL_STATUS = {
  CADASTRO_INCOMPLETO: "cadastro_incompleto",
  AGUARDANDO_VERIFICACAO: "aguardando_verificacao",
  VERIFICADO: "verificado",
  REPROVADO: "reprovado",
  SUSPENSO: "suspenso",
  BLOQUEADO: "bloqueado",
} as const;

export type ProfessionalStatus =
  (typeof PROFESSIONAL_STATUS)[keyof typeof PROFESSIONAL_STATUS];

export const ESTABLISHMENT_STATUS = {
  CADASTRO_INCOMPLETO: "cadastro_incompleto",
  AGUARDANDO_VERIFICACAO: "aguardando_verificacao",
  VERIFICADO: "verificado",
  QUALIFICADO: "qualificado",
  REPROVADO: "reprovado",
  SUSPENSO: "suspenso",
  BLOQUEADO: "bloqueado",
} as const;

export type EstablishmentStatus =
  (typeof ESTABLISHMENT_STATUS)[keyof typeof ESTABLISHMENT_STATUS];

/**
 * Um estabelecimento só pode publicar oportunidade a partir deste status.
 * Ver critério de aceite: "não publica oportunidade antes de `verificado`".
 */
export const ESTABLISHMENT_CAN_PUBLISH: EstablishmentStatus[] = [
  ESTABLISHMENT_STATUS.VERIFICADO,
  ESTABLISHMENT_STATUS.QUALIFICADO,
];

/**
 * Um profissional só pode se candidatar a partir deste status.
 */
export const PROFESSIONAL_CAN_APPLY: ProfessionalStatus[] = [
  PROFESSIONAL_STATUS.VERIFICADO,
];
