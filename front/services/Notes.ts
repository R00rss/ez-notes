import { get_token } from "@/functions/globals";
import { NoteCreate,Note } from "@/types/note";

export async function addNote(
  note: NoteCreate,
  token: String | null = get_token()
) {
  if (!token) return null;
  const res = await fetch("/api/note", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
  return null;
}
export async function update_note(
  note: NoteCreate,
  token: String | null = get_token()
) {
  if (!token) return null;
  const res = await fetch("/api/note", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
  return null;
}
export async function delete_note(
  note: Note,
  token: String | null = get_token()
) {
  if (!token) return null;
  const res = await fetch("/api/note", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
  return null;
}
export async function getNotes(
  id_collection: number,
  token: String | null = get_token()
) {
  if (!token) return null;
  const res = await fetch(`/api/notes?id_collection=${id_collection}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
  return null;
}
