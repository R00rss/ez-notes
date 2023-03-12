"use client";
import { StaticImageData } from "next/image";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import Sidebar from "./Sidebar";
import home_icon from "@/assets/icons/sidebar/png/house.png";
import users_icon from "@/assets/icons/sidebar/png/users.png";
import message_icon from "@/assets/icons/sidebar/png/comments.png";
import settings_icon from "@/assets/icons/sidebar/png/settings.png";
import help_icon from "@/assets/icons/sidebar/png/info.png";

interface ContainerSidebarProps {
  children: React.ReactNode;
}

interface menu_item {
  id: number;
  name: string;
  icon: StaticImageData;
  alt: string;
  selected: boolean;
}

export interface SidebarMenuContextType {
  sidebar_menu: menu_item[];
  selected_option: menu_item | null;
  set_sidebar_menu: Dispatch<SetStateAction<menu_item[]>>;
  set_selected_option: Dispatch<SetStateAction<menu_item | null>>;
}

export const SidebarMenuContext = createContext<SidebarMenuContextType>({
  sidebar_menu: [],
  set_sidebar_menu: () => {},
  selected_option: null,
  set_selected_option: () => {},
});

const menu_items_default: menu_item[] = [
  { id: 1, name: "Inicio", icon: home_icon, alt: "home", selected: true },
  { id: 2, name: "Perfil", icon: users_icon, alt: "users", selected: false },
  {
    id: 3,
    name: "Mensajes",
    icon: message_icon,
    alt: "message",
    selected: false,
  },
  {
    id: 4,
    name: "Configuraciones",
    icon: settings_icon,
    alt: "settings",
    selected: false,
  },
  { id: 5, name: "Ayuda", icon: help_icon, alt: "help", selected: false },
];
export default function ContainerSidebar({ children }: ContainerSidebarProps) {
  const [sidebar_menu, set_sidebar_menu] =
    useState<menu_item[]>(menu_items_default);
  const [selected_option, set_selected_option] = useState<menu_item | null>(
    null
  );
  return (
    <SidebarMenuContext.Provider
      value={{
        sidebar_menu,
        set_sidebar_menu,
        selected_option,
        set_selected_option,
      }}
    >
      <Sidebar />
      {children}
    </SidebarMenuContext.Provider>
  );
}
