"use client";

// import { addCollection, getCollections } from "@/services/Collections";
import { CollectionBase } from "@/types/collection";
import Image from "next/image";
import loading_icon from "@/assets/icons/interface/loading1.png";
import { SyntheticEvent, useEffect, useState } from "react";
import { simple_alert } from "../alerts/main";
import { addNote, getNotes } from "@/services/Notes";

export default function NoteForm({
  id_collection,
  update_data_total,
  close,
}: {
  id_collection: number;
  update_data_total: Function;
  close: Function;
}) {
  const [loading, set_loading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    text_content: "",
    collection_id: id_collection,
  });
  useEffect(() => {
    onkeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
  }, []);
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(formData);
    set_loading(true);
    const payload = await addNote(formData);
    if (payload) {
      simple_alert({
        title: "success",
        content: "Nota agregada",
        icon: "success",
      });
      // const data = await getNotes(id_collection);
      // updateNotes(data);
      update_data_total();
    } else {
      simple_alert({
        title: "error",
        content: "No se pudo agregar la nota",
        icon: "error",
      });
    }
    set_loading(false);
    close();
  };

  const handleChange = (event: SyntheticEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log(formData);
    return () => {};
  }, [formData]);

  return (
    <form
      className="flex flex-col justify-center h-full w-full cursor-pointer rounded-xl bg-[#fdffff] p-1 "
      onSubmit={handleSubmit}
    >
      <header className="self-start border-b-2 w-full py-1">
        <p className="text-xl font-light ml-2 text-slate-700">Nueva nota</p>
      </header>
      <div className="font-light text-slate-700 text-lg py-2">
        <section 
        className="flex flex-col justify-center items-center gap-3"
        >
          <label className="w-[min(400px,100%)] flex flex-row items-center justify-between gap-4">
            <p>Titulo:</p>
            <input
              className=" ml-2 border-2 border-gray-300 rounded-md"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="w-[min(400px,100%)] flex flex-row items-center justify-between gap-4">
            <p>Contenido:</p>
            <input
              className=" ml-2 border-2 border-gray-300 rounded-md"
              type="text"
              name="text_content"
              value={formData.text_content}
              onChange={handleChange}
              required
            />
          </label>
          <button
            className="w-[min(240px,100%)] duration-300 group rounded-xl bg-[var(--tertiary-color)] hover:bg-transparent border-2 hover:border-[var(--tertiary-color)] border-transparent px-2 shadow-[2px_2px_4px_1px_#b3b3b3]"
            disabled={loading}
            type="submit"
          >
            <div
              className={`${loading ? "hidden" : "block"} 
            text-slate-50 font-normal duration-300 group-hover:text-[var(--tertiary-color)]`}
            >
              Agregar Nota
            </div>
            <Image
              className={`${
                loading ? "block" : "hidden"
              } animate-spin w-8 h-8 filter invert-[0.15] hue-rotate-[65deg]`}
              src={loading_icon}
              alt="loading_icon"
            />
          </button>
        </section>
      </div>
    </form>
  );
}
