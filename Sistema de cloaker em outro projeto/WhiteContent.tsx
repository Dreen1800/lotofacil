// WHITE CONTENT - Conteúdo genérico e seguro
// Renderizado para bots, crawlers e tráfego não qualificado (Layer 1)

import { CloakerDebug } from '@/components/CloakerDebug';

export default function WhiteContent() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Debug Component - REMOVER EM PRODUÇÃO */}
      <CloakerDebug />
      <div className="max-w-4xl w-full">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Bem-vindo
          </h1>
          <p className="text-xl text-slate-600">
            Portal de Reflexão e Espiritualidade
          </p>
        </header>

        {/* Main Content */}
        <main className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Sobre Nós
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Este é um espaço dedicado à reflexão espiritual, ao crescimento pessoal e à busca 
              por uma vida mais significativa e conectada com valores transcendentes.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Acreditamos que a espiritualidade é uma jornada pessoal e única para cada indivíduo, 
              e nosso objetivo é oferecer recursos, inspiração e orientação para aqueles que buscam 
              fortalecer sua fé e encontrar paz interior.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Nossa Missão
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Proporcionar um ambiente acolhedor onde pessoas de todas as origens possam explorar 
              questões espirituais, encontrar conforto em momentos difíceis e celebrar as alegrias 
              da vida com gratidão e fé.
            </p>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Nossos Valores
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Fé e devoção genuínas</li>
                <li>• Respeito pela jornada individual de cada pessoa</li>
                <li>• Compaixão e empatia em todas as interações</li>
                <li>• Busca constante por crescimento espiritual</li>
                <li>• Compromisso com a verdade e a integridade</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Recursos Disponíveis
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  📖 Reflexões Diárias
                </h3>
                <p className="text-slate-600">
                  Pensamentos e meditações para inspirar seu dia e fortalecer sua conexão espiritual.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  🙏 Orações e Práticas
                </h3>
                <p className="text-slate-600">
                  Guias práticos para aprofundar sua vida de oração e meditação contemplativa.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  ✨ Estudos Espirituais
                </h3>
                <p className="text-slate-600">
                  Conteúdos educativos sobre tradições religiosas, escrituras sagradas e história da fé.
                </p>
              </div>
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  🤝 Comunidade
                </h3>
                <p className="text-slate-600">
                  Um espaço para compartilhar experiências e crescer junto com outros em jornada de fé.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Contato
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Estamos aqui para apoiar você em sua jornada espiritual. Se tiver dúvidas, sugestões 
              ou simplesmente quiser compartilhar sua história, entre em contato conosco.
            </p>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <p className="text-slate-700">
                <strong>Email:</strong> contato@exemplo.com<br />
                <strong>Horário:</strong> Segunda a Sexta, 9h às 18h
              </p>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-500">
          <p className="mb-2">
            © {new Date().getFullYear()} Portal de Reflexão e Espiritualidade. Todos os direitos reservados.
          </p>
          <p className="text-sm">
            Um espaço dedicado ao crescimento espiritual e à busca por uma vida mais plena.
          </p>
        </footer>
      </div>
    </div>
  )
}
