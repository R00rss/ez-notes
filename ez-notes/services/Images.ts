import { get_token } from "@/functions/globals";
import { ImageCreate } from "@/types/image";

export async function add_image(file: any, token: String | null = get_token()) {
  if (!token) return null;
  const res = await fetch(`${process.env.API_URL}/api/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: file,
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
  return null;
}
export async function delete_image(
  id_image: number,
  token: String | null = get_token()
) {
  if (!token) return null;
  const res = await fetch(`${process.env.API_URL}/api/image/${id_image}`, {
    method: "DELETE",
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
export async function get_image_file(
  id_image: number,
  token: String | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch(`${process.env.API_URL}/api/image/${id_image}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      const blob = await res.blob();
      return blob;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function generate_text_by_image(
  id_image: number,
  token: String | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch(`${process.env.API_URL}/api/send_image_microservice/${id_image}`, {
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
  } catch (e) {
    console.log(e);
    return null;
  }
}
