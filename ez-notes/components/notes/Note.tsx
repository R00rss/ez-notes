import { format_date } from "@/functions/globals";
import { Note } from "@/types/note";
import Image from "next/image";
import cross_icon from "@/assets/icons/interface/cross2.png";
import edit_icon from "@/assets/icons/interface/edit3.png";
import undo_icon from "@/assets/icons/interface/undo8.png";
import upload_icon from "@/assets/icons/interface/upload.png";
import Modal from "@/components/modals/simple_modal";
import { alert_with_callback, simple_alert } from "@/components/alerts/main";
import { delete_note, getNotes, update_note } from "@/services/Notes";
import { useEffect, useState } from "react";
import ImageForm from "../images/ImageForm";
import ImagesContainer from "../images/ImagesContainer";
interface Props {
  note: Note;
  update_data_total: Function;
  onClick?: () => void;
}

export default function NoteCard({
  note,
  update_data_total,
  onClick = () => console.log("clicked"),
}: Props) {
  const [is_modal_upload_open, set_is_modal_upload_open] = useState(false);

  const [text_content, set_text_content] = useState<string>(note.text_content);
  const [title, set_title] = useState<string>(note.name);
  const [content_is_changed, set_content_is_changed] = useState<boolean>(false);
  const [is_content_changed, set_is_content_changed] = useState({
    title: false,
    text_content: false,
  });
  const { updated_at } = note;
  const { day, time } = format_date(note.updated_at);
  function handleOpenModal() {
    set_is_modal_upload_open(true);
  }
  function handleCloseModal() {
    set_is_modal_upload_open(false);
  }
  useEffect(() => {
    const flag_title = note.name !== title;
    const flag_content = note.text_content !== text_content;
    set_content_is_changed(flag_title || flag_content);
  }, [text_content, title, note.text_content, note.name]);

  useEffect(() => {
    const flag_title = note.name !== title;
    const flag_content = note.text_content !== text_content;
    set_is_content_changed({
      title: flag_title,
      text_content: flag_content,
    });
  }, [text_content, title, note.text_content, note.name]);

  function handle_delete() {
    alert_with_callback({
      title: "Eliminar nota",
      content: "¿Estás seguro de eliminar esta nota?",
      icon: "warning",
      callback: () => {
        delete_note(note).then(async (data) => {
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
          // const new_notes = await getNotes(note.collection_id);
          // updateNotes(new_notes);
          update_data_total();
        });
      },
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    });
  }
  function handle_save() {
    const new_note = { ...note, text_content, name: title };
    alert_with_callback({
      title: "Guardar cambios",
      content: "¿Estás seguro de guardar los cambios?",
      icon: "warning",
      callback: () => {
        update_note(new_note).then(async (data) => {
          if (data) {
            simple_alert({
              title: "Nota actualizada",
              content: "La nota se actualizó correctamente",
              icon: "success",
            });
            note.text_content = text_content;
            note.name = title;
            // set_content_is_changed(false);
          } else {
            simple_alert({
              title: "Error",
              content: "No se pudo actualizar la nota",
              icon: "error",
            });
          }
          update_data_total();
        });
      },
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Guardar",
    });
  }
  function handle_undo() {
    set_text_content(note.text_content);
    set_title(note.name);
  }

  return (
    <div
      // onClick={() => {
      //   onClick();
      // }}
      className="flex flex-col min-h-[150px] cursor-pointer rounded-xl bg-[#fdffff]  shadow-[-3px_3px_3px_2px_#c0c2c2] duration-[400ms]"
    >
      <header className="rounded-t-xl  font-normal italic text-slate-600 flex items-center border-b-2 py-2 px-2 hover:shadow-[0px_3px_10px_1px_var(--primary-color)] duration-[300ms]">
        <section className="flex gap-1 pr-4 items-center">
          <button
            onClick={handle_delete}
            className="duration-500  group hover:bg-transparent hover:text-red-600 border-2 border-transparent hover:border-red-600 flex justify-center items-center rounded-full bg-red-600 text-slate-50 w-7 h-7 p-[6px]"
          >
            <Image
              src={cross_icon}
              className="duration-500  filter invert brightness-0 group-hover:brightness-100 group-hover:invert-0"
              alt="cross_icon"
            />
          </button>
          {content_is_changed && (
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
          <button
            onClick={() => {
              handleOpenModal();
            }}
            className="duration-500 group hover:bg-transparent border-2 border-transparent hover:border-cyan-400 flex justify-center items-center rounded-md bg-cyan-400 w-7 h-7"
          >
            <Image
              src={upload_icon}
              className="duration-500  group-hover:invert-0 group-hover:hue-rotate-30 group-hover:brightness-100 invert brightness-0"
              alt="cross_icon"
            />
          </button>
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
              className={
                "px-2 sm:mr-2 rounded-md w-full outline-none bg-transparent focus:shadow-[0px_3px_10px_1px_var(--primary-color)] hover:shadow-[0px_3px_10px_1px_var(--primary-color)] duration-[300ms]"
              }
              // className="w-full outline-none bg-transparent"
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
      <div className="flex-grow flex flex-col rounded-lg rounded-t-none  w-full hover:shadow-[0px_3px_10px_1px_var(--primary-color)] duration-[300ms]">
        <textarea
          className={` ${
            is_content_changed.text_content
              ? "focus:shadow-[0px_3px_10px_1px_var(--tertiary-color)] hover:shadow-[0px_3px_10px_1px_var(--tertiary-color)]"
              : "focus:shadow-[0px_3px_10px_1px_var(--primary-color)] hover:shadow-[0px_3px_10px_1px_var(--primary-color)]"
          } w-full h-full resize-none outline-none rounded-lg rounded-t-none bg-transparent px-2 py-2 duration-[300ms]`}
          value={text_content}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              e.preventDefault();
              console.log("shift + enter");
              set_text_content(text_content + "\n");
            } else {
              if (e.key === "Enter") {
                e.preventDefault();
                handle_save();
              }
            }
          }}
          onChange={(e) => {
            console.log(e.target.value);
            set_text_content(e.target.value);
          }}
        ></textarea>
      </div>
      <Modal isOpen={is_modal_upload_open} onClose={handleCloseModal}>
        <ImagesContainer
          note={note}
          update_data_total={update_data_total}
          close={handleCloseModal}
        />

        {/* <ImageForm
          id_note={note.id}
          update_data_total={update_data_total}
          close={handleCloseModal}
        /> */}
      </Modal>
    </div>
  );
}
