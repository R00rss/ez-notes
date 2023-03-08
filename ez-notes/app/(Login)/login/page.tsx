"use client";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  alert_options,
  alert_with_callback,
  simple_alert,
} from "@/components/alerts/main";
import style from "./Login.module.css";
import { remove_token, set_token } from "@/functions/globals";
interface credentials_to_send {
  username: string;
  password: string;
}
interface mouse_coords {
  x: number;
  y: number;
}
export default function Login() {
  const router = useRouter();
  const [credentials, set_credentials] = useState<credentials_to_send>();
  const [cursor_pos, set_cursor_pos] = useState<mouse_coords>();

  useEffect(() => {
    remove_token();
    function handleMouseMove(event: MouseEvent) {
      const x_pos = event.clientX - window.innerWidth / 2;
      const y_pos = event.clientY - window.innerHeight / 2;
      set_cursor_pos({ x: x_pos, y: y_pos });
    }

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (cursor_pos) {
      const bg = document.querySelector("#container_login") as HTMLElement;
      if (bg) {
        const x = cursor_pos.x;
        const y = cursor_pos.y;
        bg.style.transform = `rotateX(${y / 50}deg) rotateY(${x / 50}deg)`;
      }
    }
  }, [cursor_pos]);

  async function send_credentials(credentials: credentials_to_send) {
    // return await fetch("http://localhost:2000/api/login", {
    return await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  }
  async function handle_login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.checkValidity() || !credentials)
      return simple_alert({
        title: "Error",
        content: "Por favor ingrese un usuario y contraseña validos",
        icon: "error",
      });

    const res = await send_credentials(credentials as credentials_to_send);
    if (res.status === 200) {
      const data = await res.json();
      const current_token = data.token;
      set_token(current_token);
      alert_with_callback({
        title: "Ingreso exitoso",
        content: `Bienvenido ${credentials.username} `,
        icon: "success",
        callback: () => {
          router.push("/");
        },
      });
      return;
    }
    if (res.status === 404) {
      simple_alert({
        title: "Error",
        content: "Usuario o contraseña incorrectos",
        icon: "error",
      });
      return;
    }
    simple_alert({
      title: "Error",
      content: "Error desconocido, inténtelo nuevamente",
      icon: "error",
    });
    send_credentials(credentials as credentials_to_send).then((res) => {
      if (res.status === 200) {
        alert_with_callback({
          title: "Ingreso exitoso",
          content: `Bienvenido ${credentials.username} `,
          icon: "success",
          callback: () => {
            router.push("/");
          },
        });
        return;
      }
      if (res.status === 404) {
        simple_alert({
          title: "Error",
          content: "Usuario o contraseña incorrectos",
          icon: "error",
        });
        return;
      }
      simple_alert({
        title: "Error",
        content: "Error desconocido, inténtelo nuevamente",
        icon: "error",
      });
    });
  }
  // async function get_cookies() {
  //   const res = await fetch("http://localhost:2000/get_cookies");
  //   console.log(res);
  //   if (!res.ok) return null;
  //   const data = await res.json();
  //   return data as any;
  // }

  // async function set_cookies() {
  //   const res = await fetch("http://localhost:2000/set_cookies");
  //   console.log(res);
  //   if (!res.ok) return null;
  //   const data = await res.json();
  //   return data as any;
  // }
  return (
    <div
      className={`${style.bg_img_login_card} bg-black flex justify-center items-center h-[100dvh] relative overflow-hidden`}
    >
      <div
        id="container_login"
        className={`${style.container_login} ${style.login_container_animation} bg-slate-900/80 w-[min(500px,80%)] aspect-[9/16] max-h-[min(700px,90%)] justify-evenly flex flex-col items-center rounded-2xl relative`}
      >
        <h1 className="text-[clamp(20px,10vw,60px)] font-extralight italic text-[#e8fffc]">
          EZ notes
        </h1>
        <section className="text-[#e8fffc] flex justify-center items-center flex-col bg-gradient-to-b bg-[#00000000] w-[min(450px,100%)] rounded-xl gap-6">
          {/* <h1 className="text-[clamp(13px,7vw,40px)] font-extralight">
            Bienvenido
          </h1> */}
          <form
            onSubmit={handle_login}
            className="flex flex-col items-center w-full gap-2 font-normal"
          >
            <div className="w-[min(400px,90%)] flex flex-col text-2xl gap-2">
              <label
                className="text-left drop-shadow-[1px_1px_1px_#000000] text-[clamp(13px,5vw,21px)]"
                htmlFor="username_input"
              >
                Nombre de usuario:
              </label>
              <div className="flex flex-row relative py-0  rounded-full bg-[#ffffff44] w-full shadow-[inset_-1px_-1px_1px_1px_#000000] ">
                <input
                  required
                  onChange={(e) => {
                    set_credentials({
                      username: e.target.value,
                      password: credentials?.password || "",
                    });
                  }}
                  type="text"
                  name="username_input"
                  id="username_input"
                  className="bg-transparent rounded-full outline-none focus:outline-none text-[#e8fffc] px-3 py-1 w-full text-[clamp(13px,5vw,21px)]"
                />
              </div>
            </div>
            <div className="w-[min(400px,90%)] flex flex-col text-2xl gap-2">
              <label
                className="text-left drop-shadow-[1px_1px_1px_#000000] text-[clamp(13px,5vw,21px)]"
                htmlFor="username_input"
              >
                Contraseña:
              </label>
              <div className="flex flex-row relative py-0  rounded-full bg-[#ffffff44] w-full shadow-[inset_-1px_-1px_1px_1px_#000000]">
                <input
                  required
                  type="password"
                  name="password_input"
                  onChange={(e) => {
                    set_credentials({
                      username: credentials?.username || "",
                      password: e.target.value,
                    });
                  }}
                  id="password_input"
                  className="bg-transparent rounded-full outline-none focus:outline-none text-[#e8fffc] px-3 py-1 w-full text-[clamp(13px,5vw,21px)]"
                />
              </div>
            </div>
            <div className="w-[min(400px,90%)] flex flex-row items-center gap-2 text-lg">
              <label
                className="text-left drop-shadow-[1px_1px_1px_#000000]"
                htmlFor="remember_input"
              >
                Recordar contraseña?
              </label>
              <input
                type="checkbox"
                name="remember_input"
                id="remember_input"
                className="w-5 h-5 drop-shadow-[1px_1px_1px_#000000]"
              />
            </div>
            <button className="bg-[var(--primary-color)] rounded-full w-[min(400px,90%)] py-1 px-2 text-2xl mt-5 hover:border-[var(--primary-color)]  hover:bg-[#00000077] duration-300 border-4 border-transparent">
              Ingresar
            </button>
          </form>
        </section>
      </div>
      <div className={`absolute bottom-[-2px] left-0 h-[200px] w-full`}>
        <div
          className={`${style.wave} ${style.wave1} ${style.animation_move_x}`}
        ></div>
        <div
          className={`${style.wave} ${style.wave2} ${style.animation_move_x2}`}
        ></div>
      </div>
    </div>
  );
}
