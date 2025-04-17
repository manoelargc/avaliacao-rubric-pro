
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Info, Plus, Users } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Example course data
const cursos = {
  "1": { id: "1", nome: "Curso Teste", semestre: "1. Semestre", ano: "2025" },
  "2": { id: "2", nome: "Engenharia de Software", semestre: "2. Semestre", ano: "2025" },
  "3": { id: "3", nome: "Ciência da Computação", semestre: "1. Semestre", ano: "2025" },
  "4": { id: "4", nome: "Sistemas de Informação", semestre: "2. Semestre", ano: "2025" },
};

// Example disciplines data
const disciplinasPorCurso = {
  "1": [
    { id: "1", nome: "Disciplina A", alunos: 35, avaliacoes: 2 },
    { id: "2", nome: "Disciplina B", alunos: 28, avaliacoes: 1 },
    { id: "3", nome: "Disciplina C", alunos: 42, avaliacoes: 3 },
  ],
  "2": [
    { id: "4", nome: "Programação Orientada a Objetos", alunos: 30, avaliacoes: 4 },
    { id: "5", nome: "Engenharia de Requisitos", alunos: 25, avaliacoes: 2 },
  ],
  "3": [
    { id: "6", nome: "Algoritmos e Estruturas de Dados", alunos: 32, avaliacoes: 3 },
    { id: "7", nome: "Sistemas Operacionais", alunos: 27, avaliacoes: 2 },
  ],
  "4": [
    { id: "8", nome: "Gestão de Projetos", alunos: 38, avaliacoes: 1 },
    { id: "9", nome: "Banco de Dados", alunos: 33, avaliacoes: 3 },
  ],
};

const CursoDetalhes = () => {
  const { cursoId } = useParams<{ cursoId: string }>();
  const [user, setUser] = useState<{ name?: string }>({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  if (!cursoId || !cursos[cursoId]) {
    return <div>Curso não encontrado.</div>;
  }
  
  const curso = cursos[cursoId];
  const disciplinas = disciplinasPorCurso[cursoId] || [];
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex">
        <AppSidebar />
        <main className="flex-1 ml-20 p-6">
          <div className="container flex items-center justify-between mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Início</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/cursos">Cursos e Disciplinas</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/cursos/${cursoId}`}>{curso.nome}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {user.name ? user.name[0].toUpperCase() : "U"}
                    </div>
                    <span className="hidden md:inline-block">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56" align="end">
                  <div className="space-y-2">
                    <Link to="/perfil" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors">
                      <Info className="h-4 w-4" />
                      <span>Meu Perfil</span>
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors text-left"
                    >
                      <Info className="h-4 w-4" />
                      <span>Sair</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {curso.nome}
              </h1>
              <p className="text-muted-foreground">
                {curso.semestre} – {curso.ano}
              </p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild>
                  <Link to={`/cursos/${cursoId}/grupos`}>
                    <Users className="mr-2 h-4 w-4" />
                    Gerenciar Grupos
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Gerenciar grupos de alunos</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {disciplinas.map((disciplina) => (
              <Tooltip key={disciplina.id}>
                <TooltipTrigger asChild>
                  <Link to={`/cursos/${cursoId}/disciplinas/${disciplina.id}/avaliacoes`}>
                    <Card className="h-full transition-all hover:shadow-md cursor-pointer">
                      <CardHeader className="pb-2 flex flex-row items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{disciplina.nome}</CardTitle>
                          <CardDescription>{disciplina.alunos} alunos</CardDescription>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <Info className="h-4 w-4" />
                              <span className="sr-only">Info</span>
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <p>
                              Esta disciplina possui {disciplina.alunos} alunos e {disciplina.avaliacoes} avaliações configuradas.
                            </p>
                          </HoverCardContent>
                        </HoverCard>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          {disciplina.avaliacoes} Avaliação{disciplina.avaliacoes !== 1 ? 'ões' : ''}
                        </p>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to={`/cursos/${cursoId}/disciplinas/${disciplina.id}/avaliacoes`}>
                            Ver Avaliações
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clique para ver avaliações da disciplina</p>
                </TooltipContent>
              </Tooltip>
            ))}
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="h-full border-dashed">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Adicionar Nova Disciplina</CardTitle>
                    <CardDescription>Criar uma nova disciplina neste curso</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center py-10">
                    <Button variant="outline" className="h-16 w-16 rounded-full">
                      <Plus className="h-8 w-8" />
                      <span className="sr-only">Adicionar Disciplina</span>
                    </Button>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar uma nova disciplina ao curso</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default CursoDetalhes;
