import Footer from "@/components/footer/Footer";
import JWT from "@/components/JWT/JWT";
import ContainerSidebar from "@/components/sidebar/ContainerSidebar";
import Sidebar from "@/components/sidebar/Sidebar";
import "../globals.css";

export default function layout_home({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="relative min-h-[100dvh]">
        <JWT>
          <main
            // className={`${style.bg_home} flex flex-row min-h-[calc(100dvh-40px)]`}
            className={`bg-[#e2e3ea] flex flex-row min-h-[calc(100dvh-40px)]`}
          >
            <ContainerSidebar>{children}</ContainerSidebar>
          </main>
          <Footer />
        </JWT>
      </body>
    </html>
  );
}
