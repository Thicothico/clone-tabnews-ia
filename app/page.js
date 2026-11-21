import { Suspense } from "react";
import Confetti from "./confetti";

async function getPublishedContentCount() {
  try {
    const response = await fetch(
      "https://www.tabnews.com.br/api/v1/contents?parent_id=root&strategy=new&per_page=1",
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) {
      return null;
    }

    const total = response.headers.get("x-pagination-total-rows");
    const count = Number(total);

    if (!total || !Number.isSafeInteger(count) || count < 0) {
      return null;
    }

    return count;
  } catch {
    return null;
  }
}

async function PublishedContentCount() {
  const contentCount = await getPublishedContentCount();

  if (contentCount === null) {
    return null;
  }

  return (
    <p className="content-count">
      <strong>{contentCount.toLocaleString("pt-BR")}</strong> conteúdos
      publicados no TabNews
    </p>
  );
}

export default function Home() {
  return (
    <>
      <Confetti />
      <main>
        <section className="construction" aria-labelledby="page-title">
          <p className="eyebrow">TabNews</p>
          <h1 id="page-title">Em Construção</h1>
          <p className="message">
            Estamos nesse exato momento reconstruindo o TabNews, um lugar na
            internet para quem trabalha com tecnologia e precisa consumir
            conteudos com valor concreto
          </p>
          <Suspense
            fallback={
              <p className="content-count" aria-label="Carregando quantidade de conteúdos">
                <strong>—</strong> conteúdos publicados no TabNews
              </p>
            }
          >
            <PublishedContentCount />
          </Suspense>
          <a
            className="official-link"
            href="https://www.tabnews.com.br"
            target="_blank"
            rel="noreferrer"
          >
            Acesse o site oficial
          </a>
        </section>
      </main>
    </>
  );
}
