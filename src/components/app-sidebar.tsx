
import { cn } from "@/lib/utils";
import {
  Book,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  User,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  tooltip: string;
  active?: boolean;
};

const SidebarItem = ({ icon: Icon, label, href, tooltip, active }: SidebarItemProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={href}
          className={cn(
            "flex flex-col items-center gap-1 p-3 rounded-lg transition-colors",
            active
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <Icon className="h-6 w-6" />
          <span className="text-xs font-medium">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  return (
    <TooltipProvider>
      <aside className="hidden md:flex w-20 flex-col fixed inset-y-0 left-0 z-10 border-r bg-sidebar">
        <div className="p-3 text-center">
          <Link to="/dashboard" className="text-lg font-bold text-primary">
            RP
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
          <SidebarItem
            icon={Home}
            label="Início"
            href="/dashboard"
            tooltip="Página inicial do sistema"
            active={location.pathname === "/dashboard"}
          />
          <SidebarItem
            icon={FileText}
            label="Rubricas"
            href="/gerenciador-rubricas"
            tooltip="Gerenciar suas rubricas de avaliação"
            active={location.pathname === "/gerenciador-rubricas"}
          />
          <SidebarItem
            icon={Book}
            label="Cursos"
            href="/cursos"
            tooltip="Gerenciar seus cursos e disciplinas"
            active={location.pathname === "/cursos"}
          />
          <SidebarItem
            icon={FileText}
            label="Modelos"
            href="/modelos-rubricas"
            tooltip="Ver modelos de rubricas disponíveis"
            active={location.pathname === "/modelos-rubricas"}
          />
          <SidebarItem
            icon={HelpCircle}
            label="Suporte"
            href="/suporte"
            tooltip="Obter ajuda e suporte"
            active={location.pathname === "/suporte"}
          />
          <SidebarItem
            icon={User}
            label="Perfil"
            href="/perfil"
            tooltip="Gerenciar seu perfil"
            active={location.pathname === "/perfil"}
          />
        </nav>
        <div className="p-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                className="flex flex-col items-center gap-1 p-3 rounded-lg w-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <LogOut className="h-6 w-6" />
                <span className="text-xs font-medium">Sair</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Encerrar sessão</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}
