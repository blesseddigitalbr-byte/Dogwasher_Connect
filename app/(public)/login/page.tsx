import Image from "next/image";
import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-[#031427] px-4 py-5 md:min-h-[calc(100vh-78px)]">
      <div className="w-full max-w-[420px] rounded-lg border border-white/10 bg-[#0b1c30] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:p-6">
        <div className="flex justify-center">
          <Image
            src="/logo-dog-washer-connect.png"
            alt="Dog Washer Connect"
            width={168}
            height={96}
            priority
            className="h-auto w-[150px] object-contain md:w-[168px]"
          />
        </div>
        <div className="mt-5 text-center">
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
