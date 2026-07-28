import { PageShell } from "@/components/ui/page-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OnboardingProfissionalPage() {
  return (
    <PageShell
      title="Complete seu perfil"
      subtitle="Essas informações são revisadas pela equipe antes da liberação para candidaturas."
    >
      <Card className="max-w-xl">
        <form className="flex flex-col gap-4">
          <Input label="Formação Dog Washer" name="formacao_declarada" placeholder="Ex: Profissão Dog Washer Híbrido, 2024" />
          <Input label="Cidade" name="cidade" defaultValue="Brasília" />
          <Input label="Estado" name="estado" defaultValue="DF" />
          <Input label="Raio de atendimento (km)" name="raio_atendimento_km" type="number" defaultValue={10} />
          <Button type="submit">Enviar para análise</Button>
        </form>
      </Card>
    </PageShell>
  );
}
