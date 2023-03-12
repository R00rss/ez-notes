"use client";

import Image from "next/image";
import loading_icon from "@/assets/icons/interface/loading1.png";
import { useEffect, useState } from "react";
import { simple_alert } from "../alerts/main";
import { getNotes } from "@/services/Notes";
import { add_image } from "@/services/Images";
export default function ImageForm({
  id_note,
  update_data_total,
  close,
}: {
  id_note: number;
  update_data_total: Function;
  close: Function;
}) {
  const [loading, set_loading] = useState<boolean>(false);
  const [file_upload, set_file_upload] = useState<File | null>(null);
  useEffect(() => {
    onkeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      set_file_upload(e.target.files[0]);
    }
  };
  const handleSubmitFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check if form is valid
    if (e.currentTarget.checkValidity() === false) {
      e.currentTarget.reportValidity();
      return;
    }

    if (!file_upload) {
      simple_alert({
        title: "Error",
        content: "Por favor seleccione un archivo.",
        icon: "error",
      });
      return;
    }
    if (file_upload.size > 3000000) {
      simple_alert({
        title: "Error",
        content: "El archivo no puede ser mayor a 3MB.",
        icon: "error",
      });
      return;
    }
    if (!file_upload.type.includes("image")) {
      simple_alert({
        title: "Error",
        content: "El archivo debe ser una imagen.",
        icon: "error",
      });
      return;
    }

    set_loading(true);
    const formData = new FormData();
    formData.append("file", file_upload);
    formData.append("id_note", id_note.toString());
    const payload = await add_image(formData);
    console.log(payload);
    if (payload) {
      simple_alert({
        title: "Éxito",
        content: "Imagen agregada correctamente.",
        icon: "success",
      });
      update_data_total();
    } else {
      simple_alert({
        title: "Error",
        content: "No se pudo agregar la imagen.",
        icon: "error",
      });
    }
    set_loading(false);
    close();
  };

  return (
    <form
      className="flex flex-col justify-center h-full w-full cursor-pointer rounded-xl bg-[#fdffff] p-1 "
      onSubmit={handleSubmitFile}
      // onSubmit={handleSubmit}
    >
      <header className="self-start border-b-2 w-full py-1">
        <p className="text-xl font-light ml-2 text-slate-700">Nueva imagen</p>
      </header>
      <div className="font-light text-slate-700 text-lg py-2 flex flex-col justify-center items-center gap-3">
        <label className=" flex flex-row items-center justify-between gap-4">
          <p>Imagen:</p>
          <input
            className=" ml-2 border-2 border-gray-300 rounded-md"
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
            accept="image/png"
            multiple={false}
          />
        </label>

        <button
          className="w-[min(240px,100%)] duration-300 group rounded-xl bg-[var(--primary-color)] hover:bg-transparent border-2 hover:border-[var(--primary-color)] border-transparent px-2 shadow-[2px_2px_4px_1px_#b3b3b3]"
          disabled={loading}
          type="submit"
        >
          <div
            className={`${loading ? "hidden" : "block"}  
            text-slate-50 font-normal duration-300 group-hover:text-[var(--primary-color)]`}
          >
            Agregar Imagen
          </div>
          <Image
            className={`${
              loading ? "block" : "hidden"
            } animate-spin w-8 h-8 filter invert-[0.15] hue-rotate-[65deg]`}
            src={loading_icon}
            alt="loading_icon"
          />
        </button>
      </div>
    </form>
  );
}
