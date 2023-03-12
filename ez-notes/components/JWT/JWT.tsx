"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { get_token } from "@/functions/globals";
import { UserBase } from "@/types/user";
import { get_user_img, validate_session } from "@/services/User";

// context for token
// interface JWTContextType {
//   token: string;
//   set_token: (token: string) => void;
// }
// export const JWTContext = createContext<JWTContextType>({
//   token: "",
//   set_token: () => {},
// });

interface JWTContextType {
  user_info: UserBase | null;
  user_image: string | null;
  set_user_info: (user_info: UserBase | null) => void;
}
export const JWTContext = createContext<JWTContextType>({
  user_info: null,
  user_image: null,
  set_user_info: () => {},
});

export default function JWT({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user_info, set_user_info] = useState<UserBase | null>(null);
  const [user_image, set_user_image] = useState<null | string>(null);
  const [flag_session, set_flag_session] = useState<Boolean | null>(null);

  useEffect(() => {
    validate_session().then((data) => {
      if (data) {
        get_user_img().then((blob) => {
          if (!blob) return;
          const image_src = URL.createObjectURL(blob);
          set_user_image(image_src);
        });
        set_user_info(data);
        set_flag_session(true);
        console.log("session valid");
      } else {
        console.log("session invalid");
        set_flag_session(false);
      }
    });
  }, []);

  useEffect(() => {
    if (flag_session === null) return;
    if (!flag_session) router.push("/login");
  }, [flag_session]);

  if (flag_session === null) return <div>Loading...</div>;
  if (!flag_session) return <div>Redirecting...</div>;
  return (
    <JWTContext.Provider value={{ user_info, user_image, set_user_info }}>
      {children}
    </JWTContext.Provider>
  );
}
