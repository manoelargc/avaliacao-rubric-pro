
import { useState } from "react";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Info, Plus } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

// Example course data
const cursos = [
  { id: "1", nome: "Curso Teste", semestre: "1. Semestre", ano: "2025", disciplinas: 3 },
  { id: "2", nome: "Engenharia de Software", semestre: "2. Semestre", ano: "2025", disciplinas: 5 },
  { id: "3", nome: "Ciência da Computação", semestre: "1. Semestre", ano: "2025", disciplinas: 4 },
  { id: "4", nome: "Sistemas de Informação", semestre: "2. Semestre", ano: "2025", disciplinas: 2 },
];

const Cursos = () => {
  const [user, setUser] = useState<{ name?: string }>({});
  const navigate = useNavigate();

  // Load user data from localStorage
  useState(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  });

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

          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Cursos e Disciplinas
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {cursos.map((curso) => (
              <Tooltip key={curso.id}>
                <TooltipTrigger asChild>
                  <Link to={`/cursos/${curso.id}`}>
                    <Card className="h-full transition-all hover:shadow-md cursor-pointer">
                      <CardHeader className="pb-2 flex flex-row items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{curso.nome}</CardTitle>
                          <CardDescription>{curso.semestre} – {curso.ano}</CardDescription>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <Info className="h-4 w-4" />
                              <span className="sr-only">Info</span>
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <p>Este curso possui {curso.disciplinas} disciplinas associadas.</p>
                          </HoverCardContent>
                        </HoverCard>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          {curso.disciplinas} Disciplina{curso.disciplinas !== 1 ? 's' : ''}
                        </p>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to={`/cursos/${curso.id}`}>
                            Ver Disciplinas
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clique para ver detalhes do curso</p>
                </TooltipContent>
              </Tooltip>
            ))}
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="h-full border-dashed">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Adicionar Novo Curso</CardTitle>
                    <CardDescription>Criar um novo curso no sistema</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center py-10">
                    <Button variant="outline" className="h-16 w-16 rounded-full">
                      <Plus className="h-8 w-8" />
                      <span className="sr-only">Adicionar Curso</span>
                    </Button>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar um novo curso ao sistema</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default Cursos;
