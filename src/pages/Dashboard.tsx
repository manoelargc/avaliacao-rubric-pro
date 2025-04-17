
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, Book, Info, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const [user, setUser] = useState<{ name?: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout realizado com sucesso!");
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
                      <User className="h-4 w-4" />
                      <span>Meu Perfil</span>
                    </Link>
                    <Link to="/perfil" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors">
                      <Settings className="h-4 w-4" />
                      <span>Configurações</span>
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sair</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Bem-vindo, {user.name || "Professor"}!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Tooltip>
              <TooltipTrigger asChild>
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Rubricas Criadas</CardTitle>
                      <CardDescription>Total de rubricas no sistema</CardDescription>
                    </div>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Info className="h-4 w-4" />
                          <span className="sr-only">Info</span>
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p>Total de rubricas que você criou, tanto em edição quanto publicadas.</p>
                      </HoverCardContent>
                    </HoverCard>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">0</p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Total de rubricas cadastradas</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Disciplinas</CardTitle>
                      <CardDescription>Disciplinas cadastradas</CardDescription>
                    </div>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Info className="h-4 w-4" />
                          <span className="sr-only">Info</span>
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p>Número total de disciplinas que você criou no sistema.</p>
                      </HoverCardContent>
                    </HoverCard>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">0</p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Total de disciplinas cadastradas</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Avaliações</CardTitle>
                      <CardDescription>Avaliações realizadas</CardDescription>
                    </div>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Info className="h-4 w-4" />
                          <span className="sr-only">Info</span>
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p>Número total de avaliações que você realizou com suas rubricas.</p>
                      </HoverCardContent>
                    </HoverCard>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">0</p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Total de avaliações realizadas</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <CardTitle>Atalhos Rápidos</CardTitle>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Info</span>
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p>Acesso rápido às principais funções do sistema.</p>
                  </HoverCardContent>
                </HoverCard>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      className="justify-start" 
                      asChild
                    >
                      <Link to="/criar-rubrica">
                        <Plus className="mr-2 h-4 w-4" />
                        Criar Nova Rubrica
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Inicie uma nova rubrica de avaliação</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      asChild
                    >
                      <Link to="/gerenciador-rubricas">
                        <FileText className="mr-2 h-4 w-4" />
                        Gerenciar Rubricas
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visualize e edite suas rubricas</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      asChild
                    >
                      <Link to="/cursos">
                        <Book className="mr-2 h-4 w-4" />
                        Ver Turmas
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Acesse seus cursos e disciplinas</p>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <CardTitle>Atividade Recente</CardTitle>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Info</span>
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p>Histórico das suas últimas ações no sistema.</p>
                  </HoverCardContent>
                </HoverCard>
              </CardHeader>
              <CardContent>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg">
                      <p className="text-muted-foreground">Nenhuma atividade recente</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Suas atividades recentes aparecerão aqui</p>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
