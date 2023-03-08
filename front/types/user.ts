import { Collection } from "./collection";

export interface User {
  username: string;
  name: string;
  id: number;
  created_at: string;
  updated_at: string;
  status: number;
  user_type: number;
  collections: Collection[];
}
