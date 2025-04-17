
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { ChevronDown, Eye, Info, BarChart2, Mail, Plus, Trash2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

// Example course data
const cursos = {
  "1": { id: "1", nome: "Curso Teste", semestre: "1. Semestre", ano: "2025" },
  "2": { id: "2", nome: "Engenharia de Software", semestre: "2. Semestre", ano: "2025" },
  "3": { id: "3", nome: "Ciência da Computação", semestre: "1. Semestre", ano: "2025" },
  "4": { id: "4", nome: "Sistemas de Informação", semestre: "2. Semestre", ano: "2025" },
};

// Example disciplines data
const disciplinas = {
  "1": { id: "1", nome: "Disciplina A", cursoId: "1" },
  "2": { id: "2", nome: "Disciplina B", cursoId: "1" },
  "3": { id: "3", nome: "Disciplina C", cursoId: "1" },
  "4": { id: "4", nome: "Programação Orientada a Objetos", cursoId: "2" },
  "5": { id: "5", nome: "Engenharia de Requisitos", cursoId: "2" },
  "6": { id: "6", nome: "Algoritmos e Estruturas de Dados", cursoId: "3" },
  "7": { id: "7", nome: "Sistemas Operacionais", cursoId: "3" },
  "8": { id: "8", nome: "Gestão de Projetos", cursoId: "4" },
  "9": { id: "9", nome: "Banco de Dados", cursoId: "4" },
};

// Example assessments data
const avaliacoesPorDisciplina = {
  "1": [
    { id: "1", nome: "Trabalho Parcial", prazo: "2025-04-30", progresso: 0.25 },
    { id: "2", nome: "Apresentação Final", prazo: "2025-05-15", progresso: 0.1 },
  ],
  "2": [
    { id: "3", nome: "Projeto de Pesquisa", prazo: "2025-04-20", progresso: 0.5 },
  ],
  "3": [
    { id: "4", nome: "Seminário Temático", prazo: "2025-06-10", progresso: 0.75 },
    { id: "5", nome: "Avaliação Prática", prazo: "2025-06-25", progresso: 0 },
  ],
  "4": [
    { id: "6", nome: "Projeto POO", prazo: "2025-05-05", progresso: 0.6 },
  ]
};

const DisciplinaAvaliacoes = () => {
  const { cursoId, disciplinaId } = useParams<{ cursoId: string, disciplinaId: string }>();
  const [user, setUser] = useState<{ name?: string }>({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  if (!cursoId || !cursos[cursoId] || !disciplinaId || !disciplinas[disciplinaId]) {
    return <div>Curso ou disciplina não encontrado.</div>;
  }
  
  const curso = cursos[cursoId];
  const disciplina = disciplinas[disciplinaId];
  const avaliacoes = avaliacoesPorDisciplina[disciplinaId] || [];
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const notificarAlunos = (avaliacaoId: string) => {
    toast.success("Notificação enviada aos alunos.");
  };

  const excluirAvaliacao = (avaliacaoId: string) => {
    toast.success("Avaliação excluída com sucesso.");
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
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/cursos/${cursoId}/disciplinas/${disciplinaId}/avaliacoes`}>
                    {disciplina.nome}
                  </BreadcrumbLink>
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
                Avaliações - {disciplina.nome}
              </h1>
              <p className="text-muted-foreground">
                {curso.semestre} – {curso.ano}
              </p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Avaliação
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Criar uma nova avaliação</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Nome da Avaliação</TableHead>
                  <TableHead>Prazo Final Para Avaliar</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {avaliacoes.map((avaliacao) => (
                  <TableRow key={avaliacao.id}>
                    <TableCell className="font-medium">{avaliacao.nome}</TableCell>
                    <TableCell>
                      {format(new Date(avaliacao.prazo), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${avaliacao.progresso * 100}%` }}
                          />
                        </div>
                        <span className="text-xs whitespace-nowrap">{Math.round(avaliacao.progresso * 100)}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" asChild>
                              <Link to={`/cursos/${cursoId}/disciplinas/${disciplinaId}/avaliacoes/${avaliacao.id}/resultados`}>
                                <BarChart2 className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver resultados</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" asChild>
                              <Link to={`/cursos/${cursoId}/disciplinas/${disciplinaId}/avaliacoes/${avaliacao.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Avaliar</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => notificarAlunos(avaliacao.id)}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Notificar alunos</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => excluirAvaliacao(avaliacao.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Excluir</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {avaliacoes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Nenhuma avaliação encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default DisciplinaAvaliacoes;
