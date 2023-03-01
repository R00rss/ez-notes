import Footer from "@/components/footer/Footer";
import JWT from "@/components/JWT/JWT";
import Sidebar from "../../components/sidebar/Sidebar";
import style from "./Home.module.css";
export default function layout_home({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main
        // className={`${style.bg_home} flex flex-row min-h-[calc(100dvh-40px)]`}
        className={`bg-[#e2e3ea] flex flex-row min-h-[calc(100dvh-40px)]`}
      >
        <Sidebar />
        <JWT>{children}</JWT>
      </main>
      <Footer />
    </>
  );
}
