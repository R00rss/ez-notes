import { format_date } from "@/functions/globals";
import { Note } from "@/types/note";
import Image from "next/image";
import ImageForm from "./ImageForm";
import cross_icon from "@/assets/icons/interface/cross2.png";
import eye_icon from "@/assets/icons/interface/eye2.png";
import ia_icon from "@/assets/icons/interface/IA/ia3.png";
import {
  delete_image,
  generate_text_by_image,
  get_image_file,
} from "@/services/Images";
import { simple_alert, alert_with_callback } from "../alerts/main";
import { useState } from "react";
interface ImagesContainerProps {
  note: Note;
  update_data_total: Function;
  close: Function;
}

export default function ImagesContainer({
  note,
  update_data_total,
  close,
}: ImagesContainerProps) {
  const [loading, set_loading] = useState<boolean>(false);
  const [image, set_image] = useState<null | string>(null);
  const [text_ml, set_text_ml] = useState<null | string>(null);
  const [selected_id_image, set_selected_id_image] = useState<null | number>(
    null
  );
  const { day, time } = format_date(note.updated_at);
  function handle_delete(id_image: number) {
    alert_with_callback({
      title: "Eliminar imagen",
      content: "¿Está seguro que desea eliminar la imagen?",
      icon: "warning",
      confirmButtonText: "Eliminar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      callback: () => {
        delete_image(id_image)
          .then((res) => {
            console.log(res);
            if (res) {
              simple_alert({
                title: "Imagen eliminada",
                content: "La imagen ha sido eliminada correctamente",
                icon: "success",
              });
            } else {
              simple_alert({
                title: "Error",
                content: "No se pudo eliminar la imagen",
                icon: "error",
              });
            }
          })
          .finally(() => {
            update_data_total();
            set_image(null);
            set_text_ml(null);
            set_selected_id_image(null);
          })
          .catch((err) => {
            simple_alert({
              title: "Error",
              content: "No se pudo eliminar la imagen",
              icon: "error",
            });
            console.log(err);
          });
      },
    });
  }
  function handle_visualice(id_image: number) {
    if (id_image === selected_id_image) {
      set_image(null);
      set_text_ml(null);
      set_selected_id_image(null);
      return;
    }
    set_selected_id_image(id_image);
    set_loading(true);
    set_image(null);
    get_image_file(id_image)
      .then((blob) => {
        console.log(blob);
        if (blob) {
          const image_src = URL.createObjectURL(blob);
          set_image(image_src);
        } else {
          simple_alert({
            title: "Error",
            content: "No se pudo obtener la imagen",
            icon: "error",
          });
        }
      })
      .finally(() => set_loading(false))
      .catch((err) => {
        simple_alert({
          title: "Error",
          content: "No se pudo obtener la imagen",
          icon: "error",
        });
        console.log(err);
      });
  }
  function handle_ml_process(id_image: number) {
    // if (id_image === selected_id_image) {
    //   set_image(null);
    //   set_text_ml(null);
    //   set_selected_id_image(null);
    //   return;
    // }
    set_selected_id_image(id_image);
    set_loading(true);
    set_text_ml(null);
    generate_text_by_image(id_image)
      .then((res) => {
        console.log(res);
        if (res) {
          simple_alert({
            title: "Proceso finalizado",
            content: "El proceso ha finalizado correctamente",
            icon: "success",
          });
          set_text_ml(res.text);
        } else {
          simple_alert({
            title: "Error",
            content: "No se pudo realizar el proceso",
            icon: "error",
          });
        }
      })
      .finally(() => set_loading(false))
      .catch((err) => {
        simple_alert({
          title: "Error",
          content: "No se pudo realizar el proceso",
          icon: "error",
        });
        console.log(err);
      });
  }
  return (
    <div className="flex flex-col justify-center h-full w-full  rounded-xl bg-[#fdffff]">
      <header className="border-b-2 py-2 px-2 text-xl font-light ml-2 text-slate-700">
        Imágenes de la nota: <span className="font-normal">{note.name}</span>
      </header>
      <section className="py-3 px-2">
        {note.images.length > 0 ? (
          <ul className="flex flex-col gap-1">
            <li
              className="grid grid-cols-[1fr_2fr_1fr] justify-center items-center px-2 rounded-sm  bg_gradient_purple text-slate-100"
              // className="flex flex-row justify-center items-center px-2 rounded-2xl  bg_gradient_purple text-slate-100"
            >
              <p className="py-2 text-center">Nombre</p>
              <p className="py-2 text-center border-l-4 border-[#fdffff]">
                Fecha
              </p>
              <p className="py-2 text-center border-l-4 border-[#fdffff]">
                Operaciones
              </p>
            </li>
            {note.images.map((image) => {
                const { day, time } = format_date(image.updated_at);

              return (
                <li
                  className="grid grid-cols-[1fr_2fr_1fr] justify-center items-center rounded-sm  px-2 bg_gradient_cyan"
                  // className="flex flex-row justify-center items-center  px-2 rounded-lg bg_gradient_cyan"
                  key={image.id}
                >
                  <p className="text-center">{image.name}</p>
                  <div className="border-l-4 border-[#fdffff] flex flex-row justify-center items-center gap-1 h-full">
                    <p className="">{time}</p>
                    <p className="">{day}</p>
                  </div>
                  <div className="border-l-4 border-[#fdffff]  flex flex-row justify-center items-center py-1 gap-2">
                    <button className="duration-500 group hover:bg-transparent hover:text-red-600 border-2 border-transparent hover:border-red-600 flex justify-center items-center rounded-full bg-red-600 text-slate-50 w-[30px] h-[30px] p-[5px]">
                      <Image
                        onClick={() => handle_delete(image.id)}
                        className="duration-500 filter invert brightness-0 group-hover:brightness-100 group-hover:invert-0"
                        src={cross_icon}
                        alt="close icon"
                      />
                    </button>
                    <button className="duration-500 group hover:bg-transparent hover:text-purple-800 border-2 border-transparent hover:border-purple-800 flex justify-center items-center rounded-full bg-purple-800 text-slate-50 w-[30px] h-[30px] p-[0px]">
                      <Image
                        onClick={() => handle_visualice(image.id)}
                        className="duration-500 filter invert brightness-0 group-hover:brightness-100 group-hover:invert-0"
                        src={eye_icon}
                        alt="visualice icon"
                      />
                    </button>
                    <button className="duration-500 group w-[30px] h-[30px] rounded-full bg-cyan-400 p-[4px] border-2 border-transparent hover:border-cyan-400 hover:bg-transparent">
                      <Image
                        onClick={() => handle_ml_process(image.id)}
                        className="duration-500 filter invert brightness-0 group-hover:brightness-100 group-hover:invert-0"
                        src={ia_icon}
                        alt="IA icon"
                      />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div>
            <p className="ml-4 text-xl font-extralight">
              Esta nota no contiene imágenes
            </p>
          </div>
        )}
        {image && (
          <div className="p-2 w-[min(90%,300px)] aspect-square mx-auto ">
            <Image
              className="w-full h-full object-contain"
              width={100}
              height={100}
              src={image}
              alt="image"
            />
          </div>
        )}
        {text_ml && (
          <div className="flex flex-row gap-1">
            <p className="ml-4 text-xl font-extralight">
              Texto generado por IA:
            </p>
            <p className="ml-4 text-xl font-extralight">{text_ml}</p>
          </div>
        )}
        {loading && <>Loading...</>}
        <ImageForm
          id_note={note.id}
          update_data_total={update_data_total}
          close={() => {}}
        />
      </section>
    </div>
  );
}
