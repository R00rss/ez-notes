import { remove_token } from "@/functions/globals";
import { useContext, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import burger_icon from "@/assets/icons/sidebar/png/menu-burger.png";
import cross_icon from "@/assets/icons/sidebar/png/cross.png";
import exit_icon from "@/assets/icons/sidebar/png/door-open.png";
import { useRouter } from "next/navigation";
import { SidebarMenuContext, SidebarMenuContextType } from "./ContainerSidebar";

interface menu_item {
  id: number;
  name: string;
  icon: StaticImageData;
  alt: string;
  selected: boolean;
}

export default function Sidebar() {
  const { sidebar_menu, set_sidebar_menu } =
    useContext<SidebarMenuContextType>(SidebarMenuContext);
  const [close_menu, set_close_menu] = useState<Boolean>(false);
  const [selected_item, set_selected_item] = useState<menu_item | null>(null);
  const router = useRouter();

  function handle_exit() {
    console.log("exit");
    remove_token();
    router.push("/login");
  }

  function get_selected_item(sidebar_menu: menu_item[]): menu_item | undefined {
    const selected_item = sidebar_menu.find((item) => item.selected);
    return selected_item;
  }

  function handle_change_option_menu(id: number): void {
    set_sidebar_menu(
      sidebar_menu.map((item_aux: menu_item) => {
        return { ...item_aux, selected: item_aux.id === id };
      })
    );
  }
  useEffect(() => {
    if (sidebar_menu) {
      const aux_selected_item = get_selected_item(sidebar_menu);
      if (aux_selected_item) set_selected_item(aux_selected_item);
    }
  }, [sidebar_menu]);

  return (
    <div className={` bg-[#4e0258] ${close_menu ? "w-[70px]" : "w-[300px]"}`}>
      {/* <div className={`flex flex-col justify-between pb-2 bg-[#4e0258] ${close_menu ? "w-[70px]" : "w-[300px]"}`}> */}
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
        {sidebar_menu.map((item: menu_item, key: number) => {
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
        <li className="bg-[#e2e3ea]">
          <div
            className={`flex gap-5 justify-end items-center py-2 px-2 ${
              selected_item && selected_item.id === sidebar_menu.length
                ? "rounded-tr-xl"
                : ""
            } bg-[#4e0258] `}
          ></div>
        </li>
      </ul>

      <div
        onClick={() => handle_exit()}
        className={`group mx-2 cursor-pointer`}
      >
        <div
          className={`bg-[var(--tertiary-color)] text-[var(--primary-color)] hover:text-[var(--tertiary-color)] border-2 border-transparent group-hover:border-[var(--tertiary-color)] group-hover:bg-[#4e0258] flex flex-row gap-5 ${
            close_menu ? "justify-center" : "justify-start"
          } items-center py-3 px-2 rounded-xl`}
        >
          <Image
            className="h-5 w-5 filter invert-[0.5] group-hover:invert-[1]"
            src={exit_icon}
            alt="exit icon"
          />
          {!close_menu && <p>Salir</p>}
        </div>
      </div>
    </div>
  );
}
