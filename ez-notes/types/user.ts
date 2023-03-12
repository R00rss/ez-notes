import { Collection } from "./collection";

export interface UserBase {
  username: string;
  name: string;
  id: number;
  created_at: string;
  image_path: string;
  updated_at: string;
  status: number;
  user_type: number;
}

export interface User extends UserBase {
  collections: Collection[];
}
