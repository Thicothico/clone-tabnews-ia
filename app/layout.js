import "./globals.css";

export const metadata = {
  title: "Em Construção | TabNews",
  description: "Estamos reconstruindo o TabNews.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
