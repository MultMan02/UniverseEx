"use client";

import React, { useEffect, useState, useCallback } from "react";

/**
 * Botão flutuante "Voltar ao topo".
 *
 * Características:
 * - Fica fixo no canto inferior (direita em telas médias+; centralizado horizontalmente por translate-x).
 * - Só aparece após rolar ~200px.
 * - Ao passar o mouse, aumenta a largura (abre para os dois lados) e a seta sobe (com overflow hidden).
 * - Cor de hover em sky-400, como solicitado.
 */
const BackToTop: React.FC = () => {
  /**
   * `visible` controla a visibilidade do botão com base na rolagem atual.
   * Ex.: aparece após passar de 200px de scroll.
   */
  const [visible, setVisible] = useState(false);

  /**
   * `suppressHover` desliga temporariamente as classes de hover (Tailwind),
   * impedindo que o estado "hover" fique preso em dispositivos touch.
   * - true  -> NÃO aplicamos as classes `hover:` / `group-hover:`
   * - false -> aplicamos normalmente (desktop e mobile quando adequado)
   */
  const [suppressHover, setSuppressHover] = useState(false);

  /**
   * Handler de scroll:
   * - Atualiza a visibilidade do botão (exibe quando `scrollY > 200`).
   * - Se estávamos suprimindo hover, **qualquer rolagem** do usuário
   *   sinaliza que podemos restaurar os efeitos de hover.
   */
  const onScroll = useCallback(() => {
    const y = window.scrollY || window.pageYOffset || 0;
    setVisible(y > 200);

    // Ao detectar nova rolagem, reabilitamos o hover caso estivesse suprimido.
    if (suppressHover) setSuppressHover(false);
  }, [suppressHover]);

  /**
   * Efeito: acrescenta/remover listener de rolagem.
   * `passive: true` ajuda na performance de scroll.
   */
  useEffect(() => {
    // Sincroniza estado ao montar (caso a página já esteja rolada)
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  /**
   * Realiza o scroll suave para o topo e aplica o "reset" de hover para mobile.
   *
   * @param e Evento de clique do botão (opcional; usado para `blur()`).
   */
  const toTop = (e?: React.MouseEvent<HTMLButtonElement>) => {
    // Rolagem suave até o topo
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Remover foco/touch highlight do botão ajuda a evitar hover/focus preso
    e?.currentTarget?.blur?.();

    // Suprime temporariamente os estilos de hover até o usuário rolar novamente
    setSuppressHover(true);
  };

  /**
   * Utilitário simples para montar className condicionalmente.
   */
  const cx = (...parts: Array<string | false>) => parts.filter(Boolean).join(" ");

  return (
    <button
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
      onClick={toTop}
      /**
       * Classes do botão:
       * - Mantemos a mesma base visual e transições.
       * - **Importante**: as classes com `hover:` só entram quando `!suppressHover`.
       */
      className={cx(
        // Layout/fixação
        "group fixed bottom-6 left-[84%] md:left-[95%] -translate-x-1/2 z-50",
        // Tamanho/base
        "h-12 w-12 rounded-full border-none bg-neutral-900",
        // Centralização de conteúdo
        "flex items-center justify-center overflow-hidden",
        // Realce/borda luminosa (exemplo)
        "shadow-[0_0_0_3px_rgba(14,165,233,0.25)]",
        // Transições
        "transition-all duration-300",
        // Expansão lateral ao passar o mouse (apenas quando hover não está suprimido)
        !suppressHover && "hover:w-36",
        // Visibilidade (some com fade + desativa ponteiros quando invisível)
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      {/* Ícone da seta (subindo) */}
      <svg
        viewBox="0 0 384 512"
        aria-hidden="true"
        className={cx(
          "h-4 w-4 transition-transform duration-300",
          // Move a seta para cima no hover (somente quando permitido)
          !suppressHover && "group-hover:-translate-y-12"
        )}
      >
        {/* Caminho padrão "seta para cima" (FontAwesome estilo "chevron-up"/"arrow-up") */}
        <path
          fill="currentColor"
          d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 145.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V145.3L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
        />
      </svg>

      {/* Rótulo que aparece ao "abrir" o botão no hover */}
      <span
        className={cx(
          "absolute text-[0px] text-white",
          // Uma leve sombra no texto ajuda no contraste sobre o fundo
          "drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]",
          "transition-all duration-300",
          // Só cresce para `text-sm` quando hover estiver habilitado
          !suppressHover && "group-hover:text-sm"
        )}
      >
        Back to Top
      </span>

      {/* Fundo que muda de cor no hover */}
      <div
        className={cx(
          "absolute inset-0 -z-10 rounded-full",
          "bg-transparent",
          "transition-colors duration-300",
          // Só aplica a cor de destaque quando hover estiver habilitado
          !suppressHover && "group-hover:bg-sky-400"
        )}
      />
    </button>
  );
};

export default BackToTop;
