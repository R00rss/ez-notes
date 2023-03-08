import { get_token } from "@/functions/globals";
import { Collection, CollectionBase } from "@/types/collection";

export async function addCollection(
  collection: CollectionBase,
  token: String | null = get_token()
) {
  if (!token) return null;
  const res = await fetch("/api/collection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(collection),
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
  return null;
}
export async function delete_collection(
  collection: Collection,
  token: String | null = get_token()
) {
  if (!token) return null;
  const res = await fetch("/api/collection", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(collection),
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
  return null;
}

export async function getCollections(token: String | null = get_token()) {
  if (!token) return null;
  const res = await fetch("/api/collections", {
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
export async function update_collection(
  collection: Collection,
  token: String | null = get_token()
) {
  if (!token) return null;
  const res = await fetch("/api/collection", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(collection),
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
  return null;
}
