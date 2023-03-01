import { Image } from "./image";

export interface Note {
    name: string;
    text_content: string;
    id: number;
    created_at: string;
    updated_at: string;
    status: number;
    collection_id: number;
    images: Image[];
  }