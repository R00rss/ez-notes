"use client";
import { get_token } from "@/functions/globals";
import { Collection } from "@/types/collection";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import burger_icon from "@/assets/icons/sidebar/png/menu-burger.png";
import cross_icon from "@/assets/icons/sidebar/png/cross.png";
import home_icon from "@/assets/icons/sidebar/png/house.png";
import users_icon from "@/assets/icons/sidebar/png/users.png";
import message_icon from "@/assets/icons/sidebar/png/comments.png";
import settings_icon from "@/assets/icons/sidebar/png/settings.png";
import help_icon from "@/assets/icons/sidebar/png/info.png";
import exit_icon from "@/assets/icons/sidebar/png/door-open.png";

import { MenuCollections } from "../menu_collections/MenuCollections";
import styles from "./Sidebar.module.css";
async function getCollections(current_token: string | null) {
  if (current_token === null) return console.log("No token found");
  const res = await fetch("http://localhost:2000/api/collections_by_id_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${current_token}`,
    },
  });
  const data = await res.json();
  return data;
}

interface menu_item {
  id: number;
  name: string;
  icon: StaticImageData;
  alt: string;
  selected: boolean;
}
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
  { id: 6, name: "Salir", icon: exit_icon, alt: "exit", selected: false },
];

export default function Sidebar() {
  const [collections, set_collections] = useState<[Collection] | null>(null);
  const [close_menu, set_close_menu] = useState<Boolean>(false);
  const [menu_items, set_menu_items] =
    useState<menu_item[]>(menu_items_default);
  const [selected_item, set_selected_item] = useState<menu_item | null>(null);

  useEffect(() => {
    const token = get_token();
    console.log(token);
    if (token) {
      getCollections(token).then((data) => {
        set_collections(data);
      });
    }
    return () => {};
  }, []);

  function get_selected_item(menu_items: menu_item[]): menu_item | undefined {
    const selected_item = menu_items.find((item) => item.selected);
    return selected_item;
  }

  function handle_change_option_menu(id: number): void {
    set_menu_items(
      menu_items.map((item_aux: menu_item) => {
        return { ...item_aux, selected: item_aux.id === id };
      })
    );
  }
  useEffect(() => {
    if (menu_items) {
      const aux_selected_item = get_selected_item(menu_items);
      if (aux_selected_item) set_selected_item(aux_selected_item);
    }
  }, [menu_items]);
  useEffect(() => {
    console.log(selected_item);
  }, [selected_item]);

  return (
    <div className={` bg-[#4e0258] ${close_menu ? "w-[70px]" : "w-[300px]"}`}>
      <ul className="flex flex-col ml-3">
        <li
          onClick={() => {
            set_close_menu((prev) => !prev);
          }}
          className="bg-[#e2e3ea] group cursor-pointer"
        >
          <div
            className={`flex gap-5 justify-end items-center py-2 px-2 ${
              selected_item && selected_item.id === 1 ? "rounded-r-xl" : ""
            } bg-[#4e0258] rounded-tr-xl`}
          >
            <div className=" bg-[var(--tertiary-color)] border-2 border-transparent group-hover:border-[var(--tertiary-color)] group-hover:bg-transparent rounded-md h-9 w-9 p-2">
              <Image
                className="filter group-hover:invert-[1]"
                src={close_menu ? burger_icon : cross_icon}
                alt="exit_icon"
              />
            </div>
          </div>
        </li>
        {menu_items.map((item: menu_item, key: number) => {
          if (item.selected) {
            return (
              <li
                key={item.id}
                onClick={() => handle_change_option_menu(item.id)}
                className="bg-[#e2e3ea] rounded-l-xl cursor-pointer"
              >
                <div
                  className={`flex flex-row gap-5 ${
                    close_menu ? "justify-center" : "justify-start"
                  } items-center py-3 px-2 rounded-xl text-slate-800`}
                >
                  <Image className="h-5 w-5" src={item.icon} alt={item.alt} />
                  {!close_menu && <p>{item.name}</p>}
                </div>
              </li>
            );
          } else {
            let aux_id = 0;
            if (selected_item) {
              aux_id = selected_item.id;
            }
            return (
              <li
                key={item.id}
                onClick={() => handle_change_option_menu(item.id)}
                className={`group bg-[#e2e3ea] rounded-3xl cursor-pointer ${
                  item.id == aux_id + 1
                    ? "rounded-tr-none"
                    : item.id == aux_id - 1
                    ? "rounded-br-none"
                    : ""
                }`}
              >
                <div
                  className={`group-hover:bg-[var(--tertiary-color)] group-hover:text-[var(--primary-color)] group-hover:rounded-r-none flex flex-row gap-5 ${
                    close_menu ? "justify-center" : "justify-start"
                  } items-center py-3 px-2 rounded-xl text-[#e2e3ea] bg-[#4e0258]`}
                >
                  <Image
                    className="h-5 w-5 filter group-hover:invert-[0.5] invert-[1]"
                    src={item.icon}
                    alt={item.alt}
                  />
                  {!close_menu && <p>{item.name}</p>}
                </div>
              </li>
            );
          }
        })}
      </ul>
      <div className="bg-[#e2e3ea]">
        <div
          className={`flex gap-5 justify-end items-center py-2 px-2 ${
            selected_item && selected_item.id === menu_items.length
              ? "rounded-tr-xl"
              : ""
          } bg-[#4e0258] `}
        ></div>
      </div>
    </div>
  );
}
