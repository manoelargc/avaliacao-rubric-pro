
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
            Começe agora mesmo!
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-lg">
            Clique aqui para criar sua primeira rubrica de avaliação e transformar a maneira como você avalia o desempenho dos seus alunos.
          </p>
          <Button
            className="bg-rubric-gradient hover:opacity-90 transition-opacity"
            size="lg"
            asChild
          >
            <Link to="/registro">Criar minha primeira rubrica</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
