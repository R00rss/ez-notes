import { Note } from "./note";

export interface CollectionBase {
  name: string;
}

export interface Collection extends CollectionBase {
  id: number;
  created_at: Date;
  updated_at: Date;
  status: number;
  notes: Note[];
}
