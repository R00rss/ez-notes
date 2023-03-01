import { Note } from "./note";

export interface Collection {
    name: string;
    id: number;
    created_at: string;
    updated_at: string;
    status: number;
    user_id: number;
    notes: Note[];
  }