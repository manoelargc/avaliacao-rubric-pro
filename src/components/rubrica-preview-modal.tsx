
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";

interface Rubrica {
  id: string;
  nome: string;
  cursos: number;
  disciplinas: number;
  avaliacoes: number;
  publicada: boolean;
}

interface RubricaPreviewModalProps {
  rubrica: Rubrica;
  isOpen: boolean;
  onClose: () => void;
}

export function RubricaPreviewModal({ rubrica, isOpen, onClose }: RubricaPreviewModalProps) {
  // Exemplo de dados para visualização da rubrica
  const criterios = [
    "Clareza na apresentação",
    "Profundidade do conteúdo",
    "Originalidade",
    "Recursos visuais"
  ];
  
  const niveis = [
    { nome: "Insatisfatório", pontos: 1 },
    { nome: "Básico", pontos: 2 },
    { nome: "Proficiente", pontos: 3 },
    { nome: "Exemplar", pontos: 4 }
  ];
  
  const descricoes = {
    "Clareza na apresentação": {
      "Insatisfatório": "Apresentação confusa e desorganizada, difícil de seguir.",
      "Básico": "Apresentação compreensível, mas com alguns pontos confusos.",
      "Proficiente": "Apresentação clara e bem organizada.",
      "Exemplar": "Apresentação excepcionalmente clara, estruturada e envolvente."
    },
    "Profundidade do conteúdo": {
      "Insatisfatório": "Conteúdo superficial, faltam conceitos importantes.",
      "Básico": "Cobre conceitos básicos, mas falta aprofundamento.",
      "Proficiente": "Bom nível de detalhe e conexões entre conceitos.",
      "Exemplar": "Análise profunda, com conexões interdisciplinares e insights originais."
    },
    "Originalidade": {
      "Insatisfatório": "Ideias derivadas inteiramente de outras fontes.",
      "Básico": "Algumas ideias originais, mas principalmente convencionais.",
      "Proficiente": "Abordagem criativa com várias ideias originais.",
      "Exemplar": "Abordagem inovadora que expande o campo de conhecimento."
    },
    "Recursos visuais": {
      "Insatisfatório": "Recursos visuais inadequados ou ausentes.",
      "Básico": "Recursos visuais básicos que apoiam minimamente o conteúdo.",
      "Proficiente": "Recursos visuais bem elaborados que complementam a apresentação.",
      "Exemplar": "Recursos visuais excepcionais que elevam significativamente a apresentação."
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{rubrica.nome}</DialogTitle>
          <DialogDescription>
            Visualização do modelo de rubrica
          </DialogDescription>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="mb-4 text-sm text-muted-foreground">
            #{rubrica.cursos.toString().padStart(2, '0')} Curso(s) • 
            #{rubrica.disciplinas.toString().padStart(2, '0')} Disciplina(s) • 
            #{rubrica.avaliacoes.toString().padStart(2, '0')} Avaliações
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Critérios</TableHead>
                  {niveis.map((nivel) => (
                    <TableHead key={nivel.nome}>
                      {nivel.nome} ({nivel.pontos} {nivel.pontos === 1 ? 'ponto' : 'pontos'})
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {criterios.map((criterio) => (
                  <TableRow key={criterio}>
                    <TableCell className="font-medium">{criterio}</TableCell>
                    {niveis.map((nivel) => (
                      <TableCell key={nivel.nome} className="text-sm">
                        {descricoes[criterio]?.[nivel.nome] || "Sem descrição"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
