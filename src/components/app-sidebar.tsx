
import { cn } from "@/lib/utils";
import {
  Book,
  FileText,
  Grid,
  HelpCircle,
  Home,
  ListOrdered,
  LogOut,
  User,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
};

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => {
  return (
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
          active={location.pathname === "/dashboard"}
        />
        <SidebarItem
          icon={FileText}
          label="Rubricas"
          href="/gerenciador-rubricas"
          active={location.pathname === "/gerenciador-rubricas"}
        />
        <SidebarItem
          icon={Book}
          label="Cursos"
          href="/cursos"
          active={location.pathname === "/cursos"}
        />
        <SidebarItem
          icon={ListOrdered}
          label="Modelos"
          href="/modelos-rubricas"
          active={location.pathname === "/modelos-rubricas"}
        />
        <SidebarItem
          icon={HelpCircle}
          label="Suporte"
          href="/suporte"
          active={location.pathname === "/suporte"}
        />
        <SidebarItem
          icon={User}
          label="Perfil"
          href="/perfil"
          active={location.pathname === "/perfil"}
        />
      </nav>
      <div className="p-3">
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 p-3 rounded-lg w-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <LogOut className="h-6 w-6" />
          <span className="text-xs font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}
