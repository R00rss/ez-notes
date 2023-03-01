import "./globals.css";
import "@/styles/fonts.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="relative min-h-[100dvh]">{children}</body>
    </html>
  );
}
