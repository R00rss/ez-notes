import { get_token, remove_token } from "@/functions/globals";
import { useContext, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import burger_icon from "@/assets/icons/sidebar/png/menu-burger.png";
import cross_icon from "@/assets/icons/sidebar/png/cross.png";
import minus_icon from "@/assets/icons/sidebar/png/minus.png";
import exit_icon from "@/assets/icons/sidebar/png/door-open.png";
import user_icon from "@/assets/images/sidebar/usuario1.png";
import { useRouter } from "next/navigation";
import { SidebarMenuContext, SidebarMenuContextType } from "./ContainerSidebar";
import styles from "./Sidebar.module.css";
import { JWTContext } from "@/components/JWT/JWT";
import Modal from "../modals/simple_modal";

interface menu_item {
  id: number;
  name: string;
  icon: StaticImageData;
  alt: string;
  selected: boolean;
}

export default function Sidebar() {
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [close_menu, set_close_menu] = useState<Boolean>(false);
  const [selected_item, set_selected_item] = useState<menu_item | null>(null);
  const { user_info, user_image } = useContext(JWTContext);
  const { sidebar_menu, set_sidebar_menu, set_selected_option } =
    useContext<SidebarMenuContextType>(SidebarMenuContext);

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
    console.log(cross_icon);
  }, []);
  useEffect(() => {
    if (sidebar_menu) {
      const aux_selected_item = get_selected_item(sidebar_menu);
      if (aux_selected_item) set_selected_item(aux_selected_item);
    }
  }, [sidebar_menu]);

  useEffect(() => {
    set_selected_option(selected_item);
  }, [selected_item]);

  return (
    <div
      className={`h-[100dvh] duration-[450ms] bg-[#4e0258] ${
        close_menu
          ? "w-[73px]"
          : "w-full xs:w-[min(100%,200px)] lg:w-[200px] xl:w-[240px] 2xl:w-[280px]"
      }`}
    >
      <ul className="flex flex-col ml-2 text-xs lg:text-sm 2xl:text-base">
        <li className="bg-[#e2e3ea]">
          <div
            className={`flex  ${
              close_menu ? "flex-col" : "flex-row"
            }  gap-5 justify-between items-center py-2 px-2 ${
              selected_item && selected_item.id === 1 ? "rounded-r-xl" : ""
            } bg-[#4e0258] rounded-tr-xl`}
          >
            <div className="text-slate-100 font-light text-lg italic  flex justify-center items-center gap-2">
              {user_info && (
                <>
                  <div
                    onClick={() => {
                      set_is_modal_open(true);
                    }}
                    className={`cursor-pointer duration-300 hover:scale-105 hover:shadow-[1px_1px_10px_4px_var(--tertiary-color)] rounded-full ${
                      close_menu ? "w-13 h-13" : "w-14 h-14"
                    } `}
                  >
                    <Image
                      className={`rounded-full ${
                        user_image ? "" : "filter brightness-0 invert"
                      }`}
                      alt="user_image"
                      src={user_image ? user_image : user_icon}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className={`${close_menu ? "hidden" : "block"} `}>
                    <h2 className="text-xl secondary_font font-extralight">
                      {user_info.name}
                    </h2>
                    <h2 className="text-base font-extralight">
                      {user_info.username}
                    </h2>
                  </div>
                </>
              )}
            </div>
            <div
              onClick={() => {
                set_close_menu((prev) => !prev);
              }}
              className="cursor-pointer duration-500 group bg-[var(--tertiary-color)] border-2 border-transparent hover:border-[var(--tertiary-color)] hover:bg-transparent rounded-md h-9 w-9 p-2"
            >
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
                    // } relative shadow-[-4px_-1px_1px_1px_#c0c2c2]  bg-[#e2e3ea]  ease-in-out items-center py-2 px-1 lg:py-3 lg:px-2 rounded-l-xl text-slate-800`}
                  } relative  bg-gradient-to-r from-cyan-200 via-cyan-100 to-[#e2e3ea] ease-in-out items-center py-2 px-1 lg:py-3 lg:px-2 rounded-l-xl text-slate-800`}
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
                  // className={`duration-100 ease-in-out left-[-1px] group-hover:bg-[var(--tertiary-color)] group-hover:text-[var(--primary-color)] group-hover:rounded-r-none flex flex-row ${
                  // className={`duration-100 ease-in-out left-[-1px] group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-cyan-100 group-hover:to-[#e2e3ea] group-hover:text-[var(--primary-color)] group-hover:rounded-r-none flex flex-row ${
                  className={`duration-400 ease-in-out left-[-1px] group-hover:text-[var(--tertiary-color)] flex flex-row ${
                    close_menu ? "justify-center" : "gap-5 justify-start"
                  } items-center py-2 px-1 lg:py-3 lg:px-2  rounded-xl text-[#e2e3ea] bg-[#4e0258]`}
                >
                  <Image
                    className="duration-500 h-5 w-5 filter group-hover:drop-shadow-[1px_1px_10px_var(--tertiary-color)] group-hover:animate-bounce invert-[1]"
                    // className="h-5 w-5 filter group-hover:invert-[0.5] invert-[1]"
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
      <Modal isOpen={is_modal_open} onClose={() => set_is_modal_open(false)}>
        <div className="flex flex-col items-center justify-center">test</div>
      </Modal>
    </div>
  );
}
