
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function AboutSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-12 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center">
            O que são rubricas de avaliação?
          </h2>
          <div className="space-y-4">
            <p>
              Rubricas de avaliação definem as expectativas das tarefas em um modelo de matriz, tornando a avaliação dos alunos muito eficaz em termos de automação e produtividade...
            </p>
            {expanded && (
              <div className="animate-fade-in">
                <p>
                  Uma rubrica é uma ferramenta de pontuação que lista os critérios para um trabalho e articula graduações de qualidade para cada critério. As rubricas são usadas para avaliar o desempenho dos alunos em uma variedade de tarefas, desde redações e apresentações até projetos e portfólios.
                </p>
                <p className="mt-4">
                  As rubricas oferecem várias vantagens, incluindo:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Avaliação mais objetiva e consistente</li>
                  <li>Feedback detalhado e construtivo</li>
                  <li>Economia de tempo na avaliação</li>
                  <li>Expectativas claras para os alunos</li>
                  <li>Autoavaliação e revisão por pares mais eficazes</li>
                </ul>
              </div>
            )}
            <div className="text-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setExpanded(!expanded)}
                className="text-primary"
              >
                {expanded ? "Ver menos" : "Ver mais"}
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
