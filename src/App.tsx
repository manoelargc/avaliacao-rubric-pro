
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Rubricas from "./pages/Rubricas";
import CriarRubrica from "./pages/CriarRubrica";
import Cursos from "./pages/Cursos";
import CursoDetalhes from "./pages/CursoDetalhes";
import DisciplinaAvaliacoes from "./pages/DisciplinaAvaliacoes";
import Avaliacao from "./pages/Avaliacao";
import Perfil from "./pages/Perfil";

const queryClient = new QueryClient();

// Authenticate the user
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("user") !== null;
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            
            {/* Rubricas */}
            <Route path="/gerenciador-rubricas" element={
              <PrivateRoute>
                <Rubricas />
              </PrivateRoute>
            } />
            <Route path="/criar-rubrica" element={
              <PrivateRoute>
                <CriarRubrica />
              </PrivateRoute>
            } />
            
            {/* Cursos e Disciplinas */}
            <Route path="/cursos" element={
              <PrivateRoute>
                <Cursos />
              </PrivateRoute>
            } />
            <Route path="/cursos/:cursoId" element={
              <PrivateRoute>
                <CursoDetalhes />
              </PrivateRoute>
            } />
            <Route path="/cursos/:cursoId/disciplinas/:disciplinaId/avaliacoes" element={
              <PrivateRoute>
                <DisciplinaAvaliacoes />
              </PrivateRoute>
            } />
            <Route path="/cursos/:cursoId/disciplinas/:disciplinaId/avaliacoes/:avaliacaoId" element={
              <PrivateRoute>
                <Avaliacao />
              </PrivateRoute>
            } />
            <Route path="/cursos/:cursoId/grupos" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            
            {/* Modelos */}
            <Route path="/modelos-rubricas" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            
            {/* Suporte */}
            <Route path="/suporte" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            
            {/* Perfil */}
            <Route path="/perfil" element={
              <PrivateRoute>
                <Perfil />
              </PrivateRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
