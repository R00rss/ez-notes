import { Image } from "./image";

export interface NoteCreate {
  name: string;
  text_content: string;
  collection_id: number;
}
export interface Note extends NoteCreate {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: number;
  images: Image[];
}
