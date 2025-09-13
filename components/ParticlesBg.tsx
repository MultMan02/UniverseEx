'use client';

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

/**
 * Componente de fundo com partículas interativas.
 *
 * - Inicializa o engine do tsParticles uma única vez no cliente.
 * - Renderiza um canvas "fixo" atrás do conteúdo da página (z-index negativo).
 * - Habilita interação de "repulse" ao passar o mouse (as partículas se afastam).
 */
export default function ParticlesBg() {
  // Controla quando o engine está pronto para renderizar o <Particles />
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Inicializa o engine do tsParticles (apenas no cliente).
    // Usamos o bundle "slim" para reduzir tamanho (links, movimento, hover/repulse, etc.).
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  // Enquanto o engine não estiver pronto, não renderiza nada (evita flash).
  if (!ready) return null;

  return (
    <Particles
      id="bg-particles"
      // CSS: ocupa a tela toda e fica "atrás" do conteúdo
      className="fixed inset-0 -z-10"
      /**
       * Opções do tsParticles
       * Documentação: https://particles.js.org/docs/
       */
      options={{
        // Sem cor de fundo (transparente) para deixar o layout visível
        background: { color: { value: 'transparent' } },
        // Desabilita o modo fullscreen do tsParticles, pois controlamos via CSS
        fullScreen: { enable: false },
        fpsLimit: 60,
        detectRetina: true,
        interactivity: {
          // Detecta interações na janela (funciona mesmo sob outros elementos)
          detectsOn: 'window',
          events: {
            onHover: {
              enable: true,
              mode: 'repulse', // As partículas "fogem" do cursor
            },
            resize: { enable: true },
          },
          modes: {
            repulse: {
              distance: 100, // Distância de repulsão
              duration: 0.4, // Duração do efeito
            },
          },
        },
        particles: {
          number: {
            value: 80,
            density: { enable: true, area: 900 }, // Densidade para boa distribuição
          },
          color: { value: '#ffffff' }, // Círculos brancos pequenos
          links: {
            enable: true,
            color: '#ffffff',
            distance: 140,
            opacity: 0.25,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.6, // Movimento suave/constante
            direction: 'none',
            outModes: { default: 'out' }, // Sai fora e reaparece
            random: false,
            straight: false,
          },
          opacity: { value: 0.55 },
          size: { value: { min: 1, max: 3 } },
          shape: { type: 'circle' },
        },
      }}
    />
  );
}
