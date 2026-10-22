import { Suspense } from "react";
import { RecoveryForm } from "@/features/auth/recovery-form";

export default function RedefinirSenhaPage() {
  return <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-[#f8f9fa]">Carregando...</main>}><RecoveryForm /></Suspense>;
}
