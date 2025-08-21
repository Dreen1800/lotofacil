import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems: FAQItem[] = [
    {
      question: "Como recebo meus jogos diários da LotoSorte?",
      answer: "Assim que sua assinatura for confirmada, você receberá acesso imediato à plataforma, onde todos os dias úteis nossos jogos são atualizados automaticamente."
    },
    {
      question: "Esses jogos garantem que eu vou ganhar?",
      answer: "Nenhum jogo pode garantir 100% de vitória, pois loteria é probabilidade. Mas nossos jogos são gerados com inteligência artificial baseada em estatísticas reais, aumentando muito suas chances."
    },
    {
      question: "Quando os jogos são atualizados?",
      answer: "Todos os dias úteis, sempre antes do sorteio. Basta acessar a plataforma para visualizar seus jogos atualizados."
    },
    {
      question: "Como funciona a garantia de 30 dias?",
      answer: "Você tem 30 dias para usar a LotoSorte sem riscos. Se não gostar ou mudar de ideia, é só pedir reembolso dentro desse prazo que devolvemos 100% do seu dinheiro."
    },
    {
      question: "Como vou jogar com os jogos da LotoSorte?",
      answer: "É simples! Você acessa a plataforma, copia os números dos jogos que disponibilizamos e faz sua aposta normalmente em qualquer lotérica ou pelo app da Caixa. Rapidinho você já está concorrendo!"
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="mt-8 mb-8">
      <h3 className="text-lg md:text-xl font-bold text-purple-800 mb-6 text-center">
        Perguntas Frequentes
      </h3>
      
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
            >
              <span className="font-medium text-gray-800 text-sm md:text-base pr-4">
                {item.question}
              </span>
              {openItems.includes(index) ? (
                <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-purple-600 flex-shrink-0" />
              )}
            </button>
            
            {openItems.includes(index) && (
              <div className="px-4 py-4 bg-white border-t border-gray-200">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed text-left">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;