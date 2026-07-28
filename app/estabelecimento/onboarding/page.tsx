import { PageShell } from "@/components/ui/page-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OnboardingEstabelecimentoPage() {
  return (
    <PageShell
      title="Cadastre sua empresa"
      subtitle="Documentos e fotos da unidade são analisados antes da liberação para publicar oportunidades."
    >
      <Card className="max-w-xl">
        <form className="flex flex-col gap-4">
          <Input label="Nome fantasia" name="nome_fantasia" />
          <Input label="CNPJ ou CPF" name="documento" />
          <Input label="Endereço da unidade" name="endereco" />
          <Input label="Cidade" name="cidade" defaultValue="Brasília" />
          <Input label="Estado" name="estado" defaultValue="DF" />
          <Button type="submit">Salvar e continuar</Button>
        </form>
      </Card>
    </PageShell>
  );
}
