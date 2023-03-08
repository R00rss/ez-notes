"use client";

import Image from "next/image";
import loading_icon from "@/assets/icons/interface/loading1.png";
import { useEffect, useState } from "react";
import { simple_alert } from "../alerts/main";
import { getNotes } from "@/services/Notes";
import { add_image } from "@/services/Images";
export default function ImageForm({
  id_note,
  updateNotes,
  close,
}: {
  id_note: number;
  updateNotes: Function;
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
    if (!file_upload) {
      simple_alert({
        title: "Error",
        content: "Por favor seleccione un archivo.",
        icon: "error",
      });
      return;
    }
    
    set_loading(true);
    const formData = new FormData();
    formData.append("file", file_upload);
    formData.append("id_note", id_note.toString());
    const payload = await add_image(formData);
    console.log(payload)
    if (payload) {
      simple_alert({
        title: "Exito",
        content: "Imagen agregada correctamente.",
        icon: "success",
      });
      const data = await getNotes(id_note);
      updateNotes(data);
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
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmitFile}
      // onSubmit={handleSubmit}
    >
      <label className="flex flex-col items-center justify-center">
        <p>Nueva colección:</p>
        <input
          className=" ml-2 border-2 border-gray-300 rounded-md"
          type="file"
          name="file"
          id="file"
          // value={file_upload}
          onChange={handleFileChange}
        />
      </label>

      <button disabled={loading} type="submit">
        <div className={`${loading ? "hidden" : "block"}`}>
          Agregar colección
        </div>
        <Image
          className={`${
            loading ? "block" : "hidden"
          } animate-spin w-8 h-8 filter invert-[0.15] hue-rotate-[65deg]`}
          src={loading_icon}
          alt="loading_icon"
        />
      </button>
    </form>
  );
}
