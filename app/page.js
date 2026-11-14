"use client";

import { useState } from "react";

const answer = "Fortnite";

export default function Home() {
  const [guess, setGuess] = useState("");
  const [revealedLetters, setRevealedLetters] = useState(0);
  const [won, setWon] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (guess.trim().toLocaleLowerCase("pt-BR") === answer.toLocaleLowerCase("pt-BR")) {
      setWon(true);
      return;
    }

    setRevealedLetters((count) => Math.min(count + 1, answer.length));
    setGuess("");
  }

  const feedback = won
    ? "Acertou! Meu jogo preferido é Fortnite!"
    : revealedLetters === 0
      ? "Acerte o nome do jogo para revelar!"
      : revealedLetters === answer.length
        ? "Não foi dessa vez! Todas as letras foram reveladas."
        : `Não foi dessa vez! A primeira letra é: ${answer[0]}${
            revealedLetters > 1
              ? ` e mais ${revealedLetters - 1} ${
                  revealedLetters === 2 ? "letra foi" : "letras foram"
                } revelada${revealedLetters === 2 ? "" : "s"}`
              : ""
          }.`;

  return (
    <main>
      <h1>Qual meu jogo preferido?</h1>
      <div className="word" aria-label="Jogo escondido">
        {[...answer].map((letter, index) => (
          <span className="letter" key={index}>
            {won || index < revealedLetters ? letter : "?"}
          </span>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Dê seu palpite"
          aria-label="Seu palpite"
          autoComplete="off"
          required
          value={guess}
          onChange={(event) => setGuess(event.target.value)}
          disabled={won}
        />
        <button type="submit" disabled={won}>
          Chutar
        </button>
      </form>
      <p id="feedback" aria-live="polite">
        {feedback}
      </p>
    </main>
  );
}
