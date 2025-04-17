
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, Book } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState<{ name?: string }>({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <main className="flex-1 ml-20 p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Bem-vindo, {user.name || "Professor"}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Rubricas Criadas</CardTitle>
              <CardDescription>Total de rubricas no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Disciplinas</CardTitle>
              <CardDescription>Disciplinas cadastradas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Avaliações</CardTitle>
              <CardDescription>Avaliações realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Atalhos Rápidos</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button 
                className="justify-start" 
                asChild
              >
                <Link to="/criar-rubrica">
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Nova Rubrica
                </Link>
              </Button>
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Nenhuma atividade recente</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
