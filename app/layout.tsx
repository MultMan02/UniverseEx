import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from "@/components/BackToTop";
import ParticlesBg from '@/components/ParticlesBg';

/**
 * Metadados básicos do app para SEO e social.
 * Next.js usa este export em páginas/app router para gerar <title> e <meta>.
 */
export const metadata = {
  title: 'UniverseEx • Mars Rover Gallery',
  description: 'View, search and filter Mars Rover photos from NASA.',
};

/**
 * RootLayout: “capa” da aplicação.
 *
 * Responsável por:
 * - Definir a estrutura comum (Header, Footer, Particles e BackToTop).
 * - Envolver o conteúdo de cada rota dentro de <main>.
 * - Configurar o idioma do documento.
 *
 * Boas práticas adotadas:
 * - Mantemos o layout enxuto e sem lógica de dados.
 * - O <main> centraliza e limita a largura (max-w-6xl) para melhor leitura.
 * - Efeitos visuais globais (ParticlesBg) e utilidades (BackToTop) ficam no layout.
 *
 * @param {{ children: React.ReactNode }} props - Elementos da página atual.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* O <body> guarda a “casca” visual do app. */}
      <body>
        {/* Cabeçalho fixo/“sticky”, navegação e título/filtros dinâmicos */}
        <Header />

        {/* Plano de fundo com partículas (canvas fixo atrás do conteúdo) */}
        <ParticlesBg />

        {/* Conteúdo específico da rota */}
        <main className="mx-auto max-w-6xl px-4 py-6">
          {children}
        </main>

        {/* Rodapé com links, branding e atribuição da NASA */}
        <Footer />

        {/* Botão flutuante para “voltar ao topo” (UX) */}
        <BackToTop />
      </body>
    </html>
  );
}
