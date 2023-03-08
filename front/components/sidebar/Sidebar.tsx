import { remove_token } from "@/functions/globals";
import { useContext, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import burger_icon from "@/assets/icons/sidebar/png/menu-burger.png";
import cross_icon from "@/assets/icons/sidebar/png/cross.png";
import minus_icon from "@/assets/icons/sidebar/png/minus.png";
import exit_icon from "@/assets/icons/sidebar/png/door-open.png";
import { useRouter } from "next/navigation";
import { SidebarMenuContext, SidebarMenuContextType } from "./ContainerSidebar";
import styles from "./Sidebar.module.css";

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
    const current_width_screen = window.innerWidth;
    if (current_width_screen < 768) {
      set_close_menu(true);
    }
  }, []);
  useEffect(() => {
    if (sidebar_menu) {
      const aux_selected_item = get_selected_item(sidebar_menu);
      if (aux_selected_item) set_selected_item(aux_selected_item);
    }
  }, [sidebar_menu]);

  return (
    <div
      className={`h-[100dvh] duration-[450ms] bg-[#4e0258] ${
        close_menu
          ? "w-[70px]"
          : "w-full xs:w-[min(100%,200px)] lg:w-[200px] xl:w-[240px] 2xl:w-[280px]"
      }`}
    >
      <ul className="flex flex-col ml-3 text-xs lg:text-sm 2xl:text-base">
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
                // src={close_menu ? burger_icon : cross_icon}
                src={close_menu ? burger_icon : minus_icon}
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
                className="bg-[#e2e3ea] rounded-none rounded-l-xl cursor-pointer relative"
              >
                <div
                  className={`flex flex-row duration-300 ${
                    close_menu
                      ? "justify-center left-[-2px]"
                      : "gap-5 justify-start left-[-0px]"
                  } relative shadow-[-4px_-1px_1px_1px_#c0c2c2]  bg-[#e2e3ea]  ease-in-out items-center py-2 px-1 lg:py-3 lg:px-2 rounded-l-xl text-slate-800`}
                >
                  <Image className="h-5 w-5" src={item.icon} alt={item.alt} />
                  <p
                    className={`${
                      !close_menu
                        ? `${styles.appear_button}`
                        : `${styles.disappear_button}`
                    }`}
                  >
                    {item.name}
                  </p>
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
                className={`group bg-[#e2e3ea] rounded-full cursor-pointer relative ${
                  item.id == aux_id + 1
                    ? "rounded-tr-none"
                    : item.id == aux_id - 1
                    ? "rounded-br-none"
                    : ""
                }`}
              >
                <div
                  className={`duration-100 ease-in-out left-[-1px] group-hover:bg-[var(--tertiary-color)] group-hover:text-[var(--primary-color)] group-hover:rounded-r-none flex flex-row ${
                    close_menu ? "justify-center" : "gap-5 justify-start"
                  } items-center py-2 px-1 lg:py-3 lg:px-2  rounded-xl text-[#e2e3ea] bg-[#4e0258]`}
                >
                  <Image
                    className="h-5 w-5 filter group-hover:invert-[0.5] invert-[1]"
                    src={item.icon}
                    alt={item.alt}
                  />

                  <p
                    className={`${
                      !close_menu
                        ? `${styles.appear_button}`
                        : `${styles.disappear_button}`
                    }`}
                  >
                    {item.name}
                  </p>
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
        className={`group mx-2 cursor-pointer text-xs lg:text-sm 2xl:text-base`}
      >
        <div
          className={`ease-in-out  duration-300 bg-[var(--tertiary-color)] text-[var(--primary-color)] hover:text-[var(--tertiary-color)] border-2 border-transparent group-hover:border-[var(--tertiary-color)] group-hover:bg-[#4e0258] flex flex-row ${
            close_menu ? "justify-center" : "gap-5 justify-start"
          } items-center py-2 px-1 lg:py-3 lg:px-2 rounded-xl`}
        >
          <Image
            className="h-5 w-5 filter invert-[0.5] group-hover:invert-[1]"
            src={exit_icon}
            alt="exit icon"
          />
          <p
            className={`${
              !close_menu
                ? `${styles.appear_button}`
                : `${styles.disappear_button}`
            }`}
          >
            Salir
          </p>
        </div>
      </div>
    </div>
  );
}
