import Image from "next/image";
import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-[#031427] px-6 py-12">
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-[#0b1c30] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] md:p-8">
        <div className="flex justify-center">
          <Image
            src="/logo-dog-washer-connect.png"
            alt="Dog Washer Connect"
            width={96}
            height={96}
            priority
            className="h-24 w-24 rounded-md object-cover"
          />
        </div>
        <div className="mt-8 text-center">
          <h1 className="font-[var(--dw-font-display)] text-3xl font-bold text-[#d3e4fe]">
            Bem-vindo de volta
          </h1>
          <p className="mt-3 text-base font-semibold leading-7 text-[#dbc2b1]">
            Acesse sua conta para gerenciar seus serviços
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
