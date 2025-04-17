
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye, Edit, Trash2, Info } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RubricaPreviewModal } from "@/components/rubrica-preview-modal";

// Types for rubrica data
interface Rubrica {
  id: string;
  nome: string;
  cursos: number;
  disciplinas: number;
  avaliacoes: number;
  publicada: boolean;
}

const Rubricas = () => {
  const [rubricasEmEdicao, setRubricasEmEdicao] = useState<Rubrica[]>([
    {
      id: "1",
      nome: "Modelo de Avaliação de Projeto Final",
      cursos: 3,
      disciplinas: 15,
      avaliacoes: 20,
      publicada: false,
    },
    {
      id: "2",
      nome: "Modelo Temporariamente Não-Nomeado",
      cursos: 1,
      disciplinas: 3,
      avaliacoes: 5,
      publicada: false,
    },
  ]);
  
  const [rubricasPublicadas, setRubricasPublicadas] = useState<Rubrica[]>([
    {
      id: "3",
      nome: "Avaliação de Apresentação Oral",
      cursos: 5,
      disciplinas: 12,
      avaliacoes: 45,
      publicada: true,
    },
  ]);
  
  const [selectedRubrica, setSelectedRubrica] = useState<Rubrica | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleExcluir = (id: string) => {
    setRubricasEmEdicao(rubricasEmEdicao.filter(rubrica => rubrica.id !== id));
  };

  const handleVisualizarRubrica = (rubrica: Rubrica) => {
    setSelectedRubrica(rubrica);
    setIsPreviewOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 ml-20">
        <div className="container mx-auto p-6">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-muted-foreground flex items-center">
            <span className="font-medium text-foreground">Rubricas</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 ml-2">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Gerencie suas rubricas de avaliação aqui</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>

          {/* Rubricas Publicadas */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Rubricas Publicadas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Card para criar novo modelo */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card className="border-dashed hover:border-primary/50 hover:bg-accent/50 transition-colors cursor-pointer">
                      <Link to="/criar-rubrica">
                        <CardHeader className="text-center">
                          <CardTitle className="text-muted-foreground">Crie seu próprio modelo personalizado</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center items-center py-8">
                          <Button variant="outline" size="icon" className="h-16 w-16 rounded-full">
                            <Plus className="h-8 w-8" />
                          </Button>
                        </CardContent>
                      </Link>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Inicie uma nova rubrica</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Rubricas publicadas */}
              {rubricasPublicadas.map((rubrica) => (
                <Card key={rubrica.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{rubrica.nome}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      #{rubrica.cursos.toString().padStart(2, '0')} Curso(s) • 
                      #{rubrica.disciplinas.toString().padStart(2, '0')} Disciplina(s) • 
                      #{rubrica.avaliacoes.toString().padStart(2, '0')} Avaliações
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleVisualizarRubrica(rubrica)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Veja avaliação</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            asChild
                          >
                            <Link to={`/criar-rubrica?id=${rubrica.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Editar rubrica</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Rubricas em Edição */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Rubricas em Edição</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rubricasEmEdicao.map((rubrica) => (
                <Card key={rubrica.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{rubrica.nome}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      #{rubrica.cursos.toString().padStart(2, '0')} Curso(s) • 
                      #{rubrica.disciplinas.toString().padStart(2, '0')} Disciplina(s) • 
                      #{rubrica.avaliacoes.toString().padStart(2, '0')} Avaliações
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleVisualizarRubrica(rubrica)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Veja avaliação</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            asChild
                          >
                            <Link to={`/criar-rubrica?id=${rubrica.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Editar rubrica</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <AlertDialog>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remover modelo</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir Rubrica</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir a rubrica "{rubrica.nome}"? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleExcluir(rubrica.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      {/* Preview Modal */}
      {selectedRubrica && (
        <RubricaPreviewModal 
          rubrica={selectedRubrica} 
          isOpen={isPreviewOpen} 
          onClose={() => setIsPreviewOpen(false)} 
        />
      )}
    </div>
  );
};

export default Rubricas;
