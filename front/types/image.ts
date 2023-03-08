export interface ImageCreate {
  name: string;
  path_file: string;
  note_id: number;
}

export interface Image extends ImageCreate {
  id: number;
  created_at: string;
  updated_at: string;
  status: number;
}
