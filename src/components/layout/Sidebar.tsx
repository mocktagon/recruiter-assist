import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  Settings, 
  BarChart3,
  Briefcase,
  ChevronDown,
  Bot,
  Menu,
  X,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Interviews", url: "/interviews", icon: Bot, 
    subItems: [
      { title: "Create Interview", url: "/interviews/create" },
      { title: "Manage Interviews", url: "/interviews/manage" },
      { title: "Fitment Interviews", url: "/interviews/fitment" }
    ]
  },
  { title: "Quick Tour", url: "/quick-tour", icon: Play },
  { title: "Settings", url: "/settings", icon: Settings }
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(["Interviews"]);
  const location = useLocation();
  
  const toggleMenu = (title: string) => {
    setOpenMenus(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isSubItemActive = (item: any) => {
    return item.subItems?.some((sub: any) => isActive(sub.url)) || isActive(item.url);
  };

  return (
    <div className={cn(
      "bg-surface border-r border-border transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-foreground">AI Recruiter</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isMenuOpen = openMenus.includes(item.title);
          
          if (hasSubItems) {
            return (
              <Collapsible 
                key={item.title} 
                open={isMenuOpen && !collapsed}
                onOpenChange={() => toggleMenu(item.title)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-between text-left font-normal",
                      isSubItemActive(item) && "bg-brand-primary-light text-brand-primary-dark",
                      collapsed && "justify-center"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </div>
                    {!collapsed && <ChevronDown className={cn("w-4 h-4 transition-transform", isMenuOpen && "rotate-180")} />}
                  </Button>
                </CollapsibleTrigger>
                {!collapsed && (
                  <CollapsibleContent className="space-y-1 mt-1">
                    {item.subItems?.map((subItem) => (
                      <NavLink
                        key={subItem.url}
                        to={subItem.url}
                        className={({ isActive }) => cn(
                          "block py-2 px-3 ml-7 text-sm rounded-md transition-colors",
                          isActive 
                            ? "bg-brand-primary text-white" 
                            : "text-foreground-muted hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {subItem.title}
                      </NavLink>
                    ))}
                  </CollapsibleContent>
                )}
              </Collapsible>
            );
          }

          return (
            <NavLink
              key={item.title}
              to={item.url}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                isActive 
                  ? "bg-brand-primary text-white" 
                  : "text-foreground-muted hover:bg-muted hover:text-foreground",
                collapsed && "justify-center"
              )}
            >
              <item.icon className="w-4 h-4" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}