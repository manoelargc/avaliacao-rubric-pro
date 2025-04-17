
export function AppInfoSection() {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center">
            Como funciona nosso aplicativo?
          </h2>
          <p className="text-center text-muted-foreground">
            O RubricPro é um sistema que permite a criação e gerenciamento de rubricas de avaliação. Utilizando nosso aplicativo você terá uma facilidade maior na criação de suas rubricas de avaliação personalizadas e poderá aplicar as mesmas por dentro do sistema.
          </p>
          <div className="relative py-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background dark:bg-background px-4 text-muted-foreground text-sm">
                Benefícios
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Para Professores</h3>
              <ul className="space-y-2">
                <li>✓ Crie rubricas personalizadas</li>
                <li>✓ Economize tempo na avaliação</li>
                <li>✓ Proporcione feedback consistente</li>
                <li>✓ Organize suas avaliações</li>
              </ul>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Para Alunos</h3>
              <ul className="space-y-2">
                <li>✓ Entenda as expectativas claramente</li>
                <li>✓ Receba feedback detalhado</li>
                <li>✓ Acompanhe seu progresso</li>
                <li>✓ Desenvolva habilidades de autoavaliação</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
