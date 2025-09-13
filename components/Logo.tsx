"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Componente de identidade visual da aplicação.
 *
 * - Exibe o logotipo no header, envolto por um <Link /> para a rota raiz ("/").
 * - Aplica efeitos visuais sutis no hover (brilho/leve glow) para dar feedback ao usuário.
 * - Implementa um fallback *progressivo* caso a imagem não carregue:
 *   esconde o <img> quebrado e injeta um <h1> com o texto "UniverseEx",
 *   mantendo a marca e evitando layout quebrado (graceful degradation).
 *
 * Observações:
 * - O fallback é inserido diretamente no DOM via `insertAdjacentHTML`.
 * - A classe `.logo-fallback` permite estilização extra se for necessário no CSS global.
 * - Mantemos `width`/`height` no <Image> para melhor CLS (cumulative layout shift).
 */
export default function Logo() {
  return (
    <Link href="/" className="group relative inline-block" aria-label="Página inicial">
      <Image
        src="/images/logo.png"
        alt="UniverseEx Logo"
        width={120}
        height={120}
        className="h-16 w-auto object-contain transition duration-700 group-hover:brightness-125 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        /**
         * Handler de erro de carregamento da imagem:
         * - Esconde o elemento <img> quebrado (display: none).
         * - Insere um título textual como fallback, preservando identidade e acessibilidade.
         */
        priority
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          // Esconde a imagem quebrada
          target.style.display = "none";
          // Insere um fallback textual estilizado
          target.insertAdjacentHTML(
            "afterend",
            `<h1 class="text-lg font-semibold tracking-wide logo-fallback">
               <span class="transition duration-700 group-hover:brightness-125 text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">Universe</span>
               <span class="font-bold text-lg text-sky-400">Ex</span>
             </h1>`
          );
        }}
      />
    </Link>
  );
}
