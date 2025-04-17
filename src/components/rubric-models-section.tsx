
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function RubricModelsSection() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center">
            Modelos de Rubricas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rubric-model-card group">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">Apresentação Oral</h3>
                <p className="text-sm text-muted-foreground">
                  Avalie clareza, organização, entrega e recursos visuais
                </p>
              </div>
            </div>
            <div className="rubric-model-card group">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">Trabalho em Equipe</h3>
                <p className="text-sm text-muted-foreground">
                  Avalie colaboração, responsabilidade e comunicação
                </p>
              </div>
            </div>
            <div className="rubric-model-card group">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">Redação Acadêmica</h3>
                <p className="text-sm text-muted-foreground">
                  Avalie estrutura, conteúdo, linguagem e pesquisa
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="group"
              asChild
            >
              <Link to="/modelos">
                Ver mais modelos
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
