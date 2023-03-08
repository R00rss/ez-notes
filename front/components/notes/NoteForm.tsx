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
  updateNotes,
  close,
}: {
  id_collection: number;
  updateNotes: Function;
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
      const data = await getNotes(id_collection);
      updateNotes(data);
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
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
      <label className="flex flex-col items-center justify-center">
        <p>titulo:</p>
        <input
          className=" ml-2 border-2 border-gray-300 rounded-md"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label className="flex flex-col items-center justify-center">
        <p>Contenido:</p>
        <input
          className=" ml-2 border-2 border-gray-300 rounded-md"
          type="text"
          name="text_content"
          value={formData.text_content}
          onChange={handleChange}
        />
      </label>
      <div
        onClick={async () => {
          const data = await getNotes(id_collection);
          console.log(data);
        }}
      >
        get notes
      </div>
      <button disabled={loading} type="submit">
        <div className={`${loading ? "hidden" : "block"}`}>Agregar Nota</div>
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
