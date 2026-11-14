import "./globals.css";

export const metadata = {
  title: "Qual meu jogo preferido?",
  description: "Acerte o nome do meu jogo preferido.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
