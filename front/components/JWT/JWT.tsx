"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { get_token } from "@/functions/globals";

export default function JWT({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [flag_session, set_flag_session] = useState<Boolean | null>(null);
  async function validate_sesion() {
    const current_token = get_token();
    const response = await fetch("/api/validate_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${current_token}`,
      },
      body: JSON.stringify({ current_token }),
    });
    console.log(response);
    if (response.status === 200) {
      set_flag_session(true);
      console.log("session valid");
    } else {
      console.log("session invalid");
      set_flag_session(false);
    }
  }

  useEffect(() => {
    validate_sesion();
  }, []);

  useEffect(() => {
    if (flag_session === null) return;
    if (!flag_session) router.push("/login");
  }, [flag_session]);

  if (flag_session === null) return <div>Loading...</div>;
  if (!flag_session) return <div>Redirecting...</div>;
  return <>{children}</>;
}
