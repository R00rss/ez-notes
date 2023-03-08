"use-client";

import { ItemCollection } from "@/types/menu";
import styles from "./MenuCollections.module.css";
interface MenuCollectionsProps {
  collections_items: ItemCollection[];
}

export function MenuCollections({ collections_items }: MenuCollectionsProps) {
  return (
    <ul className="ml-0 pl-3 flex flex-col gap-1">
      {collections_items.map((collection) => (
        <li key={collection.id}>
          <button
            className={`${styles.button_collection} text-slate-50`}
            onClick={() => {
              console.log(collection);
            }}
          >
            {collection.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
