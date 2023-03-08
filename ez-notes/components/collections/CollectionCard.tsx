import { format_date } from "@/functions/globals";
import { Collection } from "@/types/collection";
import { Note } from "@/types/note";
import Image from "next/image";
import NoteCard from "../notes/NoteCard";
import bullet_icon from "@/assets/icons/collections/bullet.png";
import eye_icon from "@/assets/icons/collections/eye.png";
import cross_icon from "@/assets/icons/interface/cross2.png";
import edit_icon from "@/assets/icons/interface/edit3.png";
import undo_icon from "@/assets/icons/interface/undo8.png";
import { useEffect, useState } from "react";
import { alert_with_callback, simple_alert } from "../alerts/main";
import {
  delete_collection,
  getCollections,
  update_collection,
} from "@/services/Collections";
interface Props {
  collection: Collection;
  updateCollections: Function;
  onClick?: () => void;
}

export default function CollectionCard({
  collection,
  updateCollections,
  onClick = () => console.log("clicked"),
}: Props) {
  const [is_content_changed, set_is_content_changed] = useState({
    title: false,
  });
  const [title, set_title] = useState<string>(collection.name);

  const { created_at, notes } = collection;
  const { day, time } = format_date(collection.updated_at);
  const { length } = notes;

  useEffect(() => {
    const flag_title = collection.name !== title;
    set_is_content_changed({
      title: flag_title,
    });
  }, [title, collection.name]);

  function handle_delete() {
    alert_with_callback({
      title: "Eliminar nota",
      content: "¿Estás seguro de eliminar esta colección?",
      icon: "warning",
      callback: () => {
        delete_collection(collection).then(async (data) => {
          if (data) {
            simple_alert({
              title: "Nota eliminada",
              content: "La nota se eliminó correctamente",
              icon: "success",
            });
          } else {
            simple_alert({
              title: "Error",
              content: "No se pudo eliminar la nota",
              icon: "error",
            });
          }
          updateCollections();
        });
      },
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete",
    });
  }
  function handle_save() {
    const new_collection = {
      ...collection,
      name: title,
    };
    alert_with_callback({
      title: "Guardar cambios",
      content: "¿Estás seguro de guardar los cambios?",
      icon: "warning",
      callback: () => {
        update_collection(new_collection).then(async (data) => {
          if (data) {
            simple_alert({
              title: "Cambios guardados",
              content: "Los cambios se guardaron correctamente",
              icon: "success",
            });
            collection.name = title;
          } else {
            simple_alert({
              title: "Error",
              content: "No se pudo guardar los cambios",
              icon: "error",
            });
          }
          updateCollections();
        });
      },
    });
  }
  function handle_undo() {
    set_title(collection.name);
  }

  return (
    <div className="flex flex-col min-h-[150px] cursor-pointer rounded-xl bg-[#fdffff]  shadow-[-3px_3px_3px_2px_#c0c2c2] duration-[400ms]">
      <header className="font-normal italic text-slate-600 flex items-center border-b-2 py-2 px-2">
        <section className="flex gap-1 pr-4 items-center">
          <button
            onClick={handle_delete}
            className="duration-500 group hover:bg-transparent hover:text-red-600 border-2 border-transparent hover:border-red-600 flex justify-center items-center rounded-full bg-red-600 text-slate-50 w-7 h-7 p-[6px]"
          >
            <Image
              src={cross_icon}
              className="duration-500 filter invert brightness-0 group-hover:brightness-100 group-hover:invert-0"
              alt="cross_icon"
            />
          </button>
          {is_content_changed.title && (
            <>
              <button
                onClick={handle_save}
                className="duration-500 hover:bg-transparent  border-2 border-transparent hover:border-blue-400 flex justify-center items-center rounded-md bg-blue-400 w-7 h-7"
              >
                <Image
                  src={edit_icon}
                  className="duration-500 filter invert-0"
                  alt="cross_icon"
                />
              </button>
              <button
                onClick={handle_undo}
                className="duration-500 group hover:bg-transparent border-2 border-transparent hover:border-green-400 flex justify-center items-center rounded-md bg-green-400 w-7 h-7"
              >
                <Image
                  src={undo_icon}
                  className="duration-500 filter group-hover:invert-0 group-hover:hue-rotate-30 group-hover:brightness-100 invert brightness-0"
                  alt="cross_icon"
                />
              </button>
            </>
          )}
        </section>
        <section className="flex-grow flex justify-between">
          <div className="text-base 2xl:text-lg flex justify-center items-center gap-1">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.shiftKey) {
                  e.preventDefault();
                  console.log("shift + enter");
                  set_title(title + "\n");
                } else {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handle_save();
                  }
                }
              }}
              className="px-2 rounded-md w-full outline-none bg-transparent focus:shadow-[0px_3px_10px_1px_var(--primary-color)] hover:shadow-[0px_3px_10px_1px_var(--primary-color)] duration-[300ms]"
              value={title}
              onChange={(e) => {
                set_title(e.target.value);
              }}
            />
          </div>
          <div className="text-base 2xl:text-lg flex flex-row gap-1">
            <p>{time}</p>
            <p>{day}</p>
          </div>
        </section>
      </header>
      <ul
        onClick={() => {
          onClick();
        }}
        className="flex-grow flex flex-col rounded-lg rounded-t-none  w-full hover:shadow-[0px_3px_10px_1px_var(--primary-color)] duration-[300ms] px-2"
      >
        {collection.notes.map((note: Note) => {
          return (
            <li key={note.id} className="w-full flex  flex-row items-center">
              <Image src={bullet_icon} alt="bullet icon" className="w-4 h-4" />
              <NoteCard Note={note} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
