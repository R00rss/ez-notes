import Footer from "@/components/footer/Footer";
import JWT from "@/components/JWT/JWT";
import ContainerSidebar from "@/components/sidebar/ContainerSidebar";
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
        <main className="bg-[#e2e3ea] min-h-[calc(100dvh-40px)]">
          <JWT>
          {children}
            {/* <ContainerSidebar>{children}</ContainerSidebar> */}
          </JWT>
        </main>
        <Footer />
      </body>
    </html>
  );
}
