
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Transforme sua avaliação{" "}
            <span className="rubric-gradient-text">com rubricas eficientes</span>
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Venha descobrir este método de avaliação que facilita seu trabalho e o entendimento de seus alunos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-rubric-gradient hover:opacity-90 transition-opacity"
              size="lg"
              asChild
            >
              <Link to="/registro">Começar agora</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/modelos">Conhecer modelos</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
