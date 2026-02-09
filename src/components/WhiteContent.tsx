import { useState } from 'react';

/**
 * WHITE CONTENT - Safe/Basic content
 * Shown to bots, reviewers, or users without valid cloaker cookie
 * Modern landing page about LotoSorte product
 */
export default function WhiteContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Section 1: Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItMnptMCAzNnYtMiAyem0tMi0yaDJ2MmgtMnptMiAwaDJ2MmgtMnptMC0zNGgydjJoLTJ6bTAtMmgydjJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              ✨ Sistema Inteligente de Análise
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Transforme Sua Forma de
              <span className="block text-yellow-300 mt-2">Jogar na Loteria</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-green-50 leading-relaxed">
              Descubra o método que milhares de pessoas estão usando para aumentar suas chances de ganhar na Lotofácil
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-full text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all shadow-2xl hover:shadow-yellow-400/50">
                Quero Conhecer Agora
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full text-lg hover:bg-white/20 transition-all border-2 border-white/30">
                Assistir Vídeo
              </button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>Mais de 50.000 usuários</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>Sistema 100% online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>Suporte especializado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Sobre o Produto */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              O Que É o LotoSorte?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uma plataforma completa que utiliza inteligência artificial e análise estatística 
              para ajudar você a fazer jogos mais estratégicos na Lotofácil
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Análise Inteligente</h3>
                    <p className="text-gray-600">
                      Algoritmos avançados analisam milhares de sorteios anteriores para identificar padrões e tendências
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Simulador Interativo</h3>
                    <p className="text-gray-600">
                      Teste diferentes combinações e veja em tempo real as estatísticas de cada número
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl border border-yellow-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Estratégias Personalizadas</h3>
                    <p className="text-gray-600">
                      Receba sugestões de jogos baseadas no seu perfil e histórico de apostas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-3xl shadow-2xl p-8 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-7xl font-bold mb-4">15</div>
                  <div className="text-2xl font-semibold mb-2">Números</div>
                  <div className="text-lg opacity-90">para acertar na Lotofácil</div>
                  <div className="mt-8 grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => (
                      <div key={num} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center font-bold text-sm">
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-green-400 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Como Funciona */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Como Funciona?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Em apenas 3 passos simples, você começa a usar o LotoSorte
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Cadastro Rápido
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Crie sua conta gratuitamente em menos de 1 minuto. Sem complicações, sem burocracia.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Análise Inteligente
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nosso sistema analisa padrões, frequências e tendências dos últimos sorteios automaticamente.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-lg">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Jogue com Estratégia
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Receba sugestões de jogos otimizados e aumente suas chances de ganhar na Lotofácil.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full text-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-xl">
              Começar Agora Gratuitamente
            </button>
          </div>
        </div>
      </section>

      {/* Section 4: Benefícios */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Por Que Escolher o LotoSorte?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🎯",
                title: "Precisão",
                description: "Análise baseada em dados reais de milhares de sorteios"
              },
              {
                icon: "⚡",
                title: "Rapidez",
                description: "Resultados e sugestões em tempo real, sem espera"
              },
              {
                icon: "📊",
                title: "Estatísticas",
                description: "Gráficos e relatórios detalhados sobre suas apostas"
              },
              {
                icon: "🔒",
                title: "Segurança",
                description: "Seus dados protegidos com criptografia de ponta"
              },
              {
                icon: "💰",
                title: "Economia",
                description: "Otimize seus gastos jogando de forma mais inteligente"
              },
              {
                icon: "📱",
                title: "Mobile",
                description: "Acesse de qualquer lugar, do celular ou computador"
              },
              {
                icon: "🎓",
                title: "Educação",
                description: "Aprenda estratégias e técnicas de apostas"
              },
              {
                icon: "👥",
                title: "Comunidade",
                description: "Faça parte de uma comunidade de apostadores estratégicos"
              }
            ].map((benefit, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:border-green-300 transition-all hover:shadow-lg h-full">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Estatísticas */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItMnptMCAzNnYtMiAyem0tMi0yaDJ2MmgtMnptMiAwaDJ2MmgtMnptMC0zNGgydjJoLTJ6bTAtMmgydjJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Números Que Impressionam
            </h2>
            <p className="text-xl text-green-100">
              Milhares de pessoas já confiam no LotoSorte
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "50.000+", label: "Usuários Ativos" },
              { number: "2M+", label: "Jogos Analisados" },
              { number: "98%", label: "Satisfação" },
              { number: "24/7", label: "Suporte Online" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-5xl md:text-6xl font-bold mb-2 text-yellow-300">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-green-50">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">R$ 127 milhões</div>
                <div className="text-green-100">Prêmios distribuídos pela Lotofácil em 2024</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">3.268 sorteios</div>
                <div className="text-green-100">Analisados em nossa base de dados</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">15 números</div>
                <div className="text-green-100">De 25 disponíveis para acertar</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas sobre o LotoSorte
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "O LotoSorte garante que eu vou ganhar na loteria?",
                answer: "Não. Nenhum sistema pode garantir vitória em jogos de sorte. O LotoSorte é uma ferramenta de análise estatística que ajuda você a fazer apostas mais estratégicas baseadas em dados históricos e padrões identificados."
              },
              {
                question: "Como funciona a análise de números?",
                answer: "Nosso algoritmo analisa milhares de sorteios anteriores, identificando padrões de frequência, números quentes e frios, sequências e combinações mais comuns. Essa análise serve como base para sugestões de jogos."
              },
              {
                question: "Preciso pagar para usar o LotoSorte?",
                answer: "Oferecemos um plano gratuito com funcionalidades básicas. Para acesso completo a todas as ferramentas, análises avançadas e suporte prioritário, temos planos premium acessíveis."
              },
              {
                question: "Posso usar no celular?",
                answer: "Sim! O LotoSorte é totalmente responsivo e funciona perfeitamente em smartphones, tablets e computadores. Você pode acessar de qualquer lugar, a qualquer momento."
              },
              {
                question: "Os dados são atualizados com frequência?",
                answer: "Sim! Atualizamos nossa base de dados automaticamente após cada sorteio da Lotofácil, garantindo que você sempre tenha acesso às informações mais recentes."
              },
              {
                question: "Como faço para começar?",
                answer: "É muito simples! Clique no botão 'Começar Agora', faça seu cadastro gratuito e você já pode começar a usar o simulador e ver as primeiras análises."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 text-2xl text-green-600">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: CTA Final + Footer */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto Para Transformar Suas Apostas?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-green-50 leading-relaxed">
            Junte-se a mais de 50.000 pessoas que já estão usando o LotoSorte para fazer jogos mais inteligentes
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="px-10 py-5 bg-yellow-400 text-gray-900 font-bold rounded-full text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all shadow-2xl">
              Começar Gratuitamente Agora
            </button>
            <button className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full text-lg hover:bg-white/20 transition-all border-2 border-white/30">
              Conhecer os Planos
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm mb-16">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Sem taxas escondidas</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Cancele quando quiser</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Suporte em português</span>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/20 pt-12">
            <div className="grid md:grid-cols-3 gap-8 text-left mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Sobre</h3>
                <ul className="space-y-2 text-green-100 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Quem Somos</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Como Funciona</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Depoimentos</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Suporte</h3>
                <ul className="space-y-2 text-green-100 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Perguntas Frequentes</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Legal</h3>
                <ul className="space-y-2 text-green-100 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Aviso Legal</a></li>
                </ul>
              </div>
            </div>

            <div className="text-center text-green-100 text-sm">
              <p className="mb-2">
                © {new Date().getFullYear()} LotoSorte. Todos os direitos reservados.
              </p>
              <p className="text-xs">
                Este site não tem vínculo com a Caixa Econômica Federal. 
                As loterias são jogos de azar e não há garantia de ganhos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
