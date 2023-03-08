"use client";

import { addCollection, getCollections } from "@/services/Collections";
import { CollectionBase } from "@/types/collection";
import Image from "next/image";
import loading_icon from "@/assets/icons/interface/loading1.png";
import { SyntheticEvent, useEffect, useState } from "react";
import { simple_alert } from "../alerts/main";

export default function FormCollection({
  updateCollections,
  close,
}: {
  updateCollections: Function;
  close: Function;
}) {
  const [loading, set_loading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
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
    const payload = await addCollection(formData);
    if (payload) {
      simple_alert({
        title: "success",
        content: "Colección agregada",
        icon: "success",
      });
      const data = await getCollections();
      updateCollections(data);
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
        <p>Nueva colección:</p>
        <input
          className=" ml-2 border-2 border-gray-300 rounded-md"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
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
