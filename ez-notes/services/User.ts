import { get_token } from "@/functions/globals";

interface user_credentials {
  username: string;
  password: string;
}
export async function get_user_img(token: String | null = get_token()) {
  try {
    if (!token) return null;
    const res = await fetch(`${process.env.API_URL}/api/user_image`, {
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
export async function validate_session(token: string | null = get_token()) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/validate_session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token }),
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
export async function send_credentials(credentials: user_credentials) {
  // try {
  //   const res = await fetch("${process.env.API_URL}/api/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(credentials),
  //   });
  //   return res;
  // } catch (e) {
  //   console.log(e);
  //   return null;
  // }

  return await fetch(`${process.env.API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}
