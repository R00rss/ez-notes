"use client";
import { get_token } from "@/functions/globals";
import { Collection } from "@/types/collection";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";
import CollectionCard from "./CollectionCard";
import NoteCard from "../notes/Note";
import styles from "./Collections.module.css";
// import icon_add_collection from "@/assets/icons/collections/plus.png";
// import icon_add_collection from "@/assets/icons/collections/square-plus.png";
import icon_add_collection from "@/assets/icons/collections/layer-plus.png";
import back_icon from "@/assets/icons/interface/back6.png";
import { getCollections } from "@/services/Collections";
// import Modal from "../modals/simple_modal";
import Modal from "@/components/modals/simple_modal";
import FormCollection from "./FormCollection";
import NoteForm from "../notes/NoteForm";
import { Note } from "@/types/note";
import { getNotes } from "@/services/Notes";

export default function CollectionsContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalNoteOpen, setIsModalNoteOpen] = useState(false);
  const [is_modal_collection_open, set_is_modal_collection_open] =
    useState(false);
  const [selected_collection, set_selected_collection] =
    useState<null | Collection>(null);
  const [loading, set_loading] = useState<boolean>(false);

  const [collections, set_collections] = useState<Collection[] | null>(null);
  const [notes, set_notes] = useState<Note[] | null>(null);

  function update_data_total() {
    update_collections();
    if (selected_collection) {
      update_notes(selected_collection.id);
    }
  }

  useEffect(() => {
    getCollections().then((data) => {
      set_collections(data);
    });
  }, []);
  function update_collections() {
    getCollections().then((data) => {
      set_collections(data);
    });
  }
  function update_notes(id_collection: number) {
    getNotes(id_collection).then((data) => {
      set_notes(data);
    });
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleOpenModalNote = () => {
    setIsModalNoteOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCloseModalNote = () => {
    setIsModalNoteOpen(false);
  };
  function handle_open_notes(collection: Collection) {
    console.log("handle_open_notes");
    console.log(collection);
    set_selected_collection(collection);
  }
  // useEffect(() => {
  //   onkeydown = (event: KeyboardEvent) => {
  //     if (event.key === "Escape") {
  //       handle_go_back();
  //     }
  //   };
  // }, []);
  function handle_go_back() {
    set_selected_collection(null);
  }

  useEffect(() => {
    if (selected_collection) set_notes(selected_collection.notes);
  }, [selected_collection]);

  if (!collections) return <div>Loading...</div>;

  if (collections.length === 0) return <div>No collections</div>;

  return (
    <div className="px-3 md:px-5 pt-4">
      <div className="flex justify-between items-center mb-2">
        {!selected_collection && (
          <h1 className={`${styles.gradient_text} text-3xl`}>
            Colecciones:{" "}
            <span className="text-slate-700">{collections.length}</span>
          </h1>
        )}
        {selected_collection && (
          <h1 className={`${styles.gradient_text} text-3xl`}>
            Notas{" "}
            <span className={`text-slate-700`}>{selected_collection.name}</span>
          </h1>
        )}
        {selected_collection && (
          <button
            onClick={handle_go_back}
            className=" bg-[var(--tertiary-color)] border-2 border-transparent group hover:border-[var(--tertiary-color)] hover:bg-transparent hover:bg-[#4e0258] rounded-md h-12 w-12 p-2"
          >
            <Image
              className="filter invert-[0.2] hue-rotate-[10deg] group-hover:hue-rotate-[50deg]"
              src={back_icon}
              alt="exit_icon"
            />
          </button>
        )}
      </div>
      {!selected_collection && (
        <section
          className={`grid ${
            collections.length > 3
              ? `grid-cols-1 sm:grid-cols-2  gap-2 sm:gap-5 lg:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]`
              : `grid-cols-1 sm:grid-cols-2  gap-2 sm:gap-5 lg:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]`
          } `}
        >
          {collections.map((collection: Collection) => (
            <CollectionCard
              updateCollections={update_collections}
              onClick={() => handle_open_notes(collection as Collection)}
              key={collection.id}
              collection={collection}
            />
          ))}
        </section>
      )}
      {selected_collection && notes && (
        <section
          className={`grid ${
            notes.length > 3
              ? `grid-cols-1 sm:grid-cols-2  gap-2 sm:gap-5 lg:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]`
              : `grid-cols-1 sm:grid-cols-2  gap-2 sm:gap-5 lg:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]`
          } `}
        >
          {notes.length === 0 && <h1>Sin notas, agregue una!</h1>}
          {notes.map((note) => {
            return (
              <NoteCard
                key={note.id}
                note={note}
                update_data_total={update_data_total}
              />
            );
          })}
        </section>
      )}
      <section
        onClick={selected_collection ? handleOpenModalNote : handleOpenModal}
        className="absolute bottom-12 mt-2 group w-14 h-14  lg:w-16 2xl:h-16 cursor-pointer rounded-xl bg-[#fdffff] py-2 px-3 shadow-[-3px_3px_3px_2px_#c0c2c2] duration-[400ms] flex justify-center items-center bg-[var(--purple-300)] hover:bg-[var(--tertiary-color)]"
      >
        <Image
          className="filter invert-[1] group-hover:invert-[0.45]"
          src={icon_add_collection}
          alt="icon add collection"
        />
      </section>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormCollection
          updateCollections={(new_data: Collection[]) =>
            set_collections(new_data)
          }
          close={handleCloseModal}
        />
      </Modal>
      <Modal isOpen={isModalNoteOpen} onClose={handleCloseModalNote}>
        {selected_collection && (
          <NoteForm
            id_collection={selected_collection.id}
            update_data_total={update_data_total}
            close={handleCloseModalNote}
          />
        )}
      </Modal>
    </div>
  );
}
