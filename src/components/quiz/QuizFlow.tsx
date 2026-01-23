import React from 'react';
import { useGameContext } from '../../contexts/GameContext';
import QuizQuestion from './QuizQuestion';

const QuizFlow: React.FC = () => {
  const { currentQuizStep, quizAnswers, setQuizAnswer, nextQuizStep } = useGameContext();

  const handleAnswer = (questionKey: keyof typeof quizAnswers, value: string) => {
    setQuizAnswer(questionKey, value);
  };

  const renderQuestion = () => {
    switch (currentQuizStep) {
      case 1:
        return (
          <QuizQuestion
            subtitle="Estamos liberando a IA da Lotosorte para você testar."
            title="Qual foi o maior prêmio que você já ganhou na loteria?"
            options={[
              { value: 'nothing', label: 'Nunca ganhei nada' },
              { value: 'less100', label: 'Menos de R$ 100' },
              { value: '100to1000', label: 'Entre R$ 100 a R$ 1.000' },
              { value: '1000to10000', label: 'Entre R$ 1.000 a R$ 10.000' },
              { value: 'more10000', label: 'Mais de R$ 10.000' }
            ]}
            selectedValue={quizAnswers.question1}
            onSelect={(value) => handleAnswer('question1', value)}
            onContinue={nextQuizStep}
          />
        );

      case 2:
        return (
          <QuizQuestion
            title="Como você escolhe seus números para apostar?"
            options={[
              { value: 'special', label: 'Datas especiais (aniversários, casamento, etc.)' },
              { value: 'luck', label: 'Números da sorte pessoais' },
              { value: 'random', label: 'Surpresinha (aleatório)' },
              { value: 'statistics', label: 'Baseado em estatísticas dos sorteios anteriores' },
              { value: 'method', label: 'Uso algum método ou sistema' }
            ]}
            selectedValue={quizAnswers.question2}
            onSelect={(value) => handleAnswer('question2', value)}
            onContinue={nextQuizStep}
          />
        );

      case 3:
        return (
          <QuizQuestion
            title="Quanto você gasta por mês com apostas na loteria?"
            options={[
              { value: 'nothing', label: 'Não Gasto Nada' },
              { value: 'to50', label: 'Até R$ 50' },
              { value: '50to100', label: 'Entre R$ 50 a R$ 100' },
              { value: '100to500', label: 'Entre R$ 100 a R$ 500' },
              { value: 'more500', label: 'Mais de R$ 500' }
            ]}
            selectedValue={quizAnswers.question3}
            onSelect={(value) => handleAnswer('question3', value)}
            onContinue={nextQuizStep}
          />
        );

      case 4:
        return (
          <QuizQuestion
            title="Se você ganhasse R$ 50.000 na loteria amanhã, qual seria sua primeira ação?"
            options={[
              { value: 'debts', label: 'Pagaria todas as dívidas', emoji: '💸' },
              { value: 'car', label: 'Compraria um carro novo', emoji: '🚗' },
              { value: 'invest', label: 'Investiria o dinheiro', emoji: '💰' },
              { value: 'house', label: 'Realizaria o sonho da casa própria', emoji: '🏠' },
              { value: 'family', label: 'Ajudaria a família', emoji: '👨‍👩‍👧‍👦' }
            ]}
            selectedValue={quizAnswers.question4}
            onSelect={(value) => handleAnswer('question4', value)}
            onContinue={nextQuizStep}
            footnote="Seus sonhos estão mais próximos do que imagina... Mas há algo que você PRECISA saber antes de continuar jogando do jeito tradicional..."
          />
        );

      case 5:
        return (
          <QuizQuestion
            title="Você já ouviu falar de pessoas que ganharam na loteria mais de 10 vezes?"
            options={[
              { value: 'possible', label: 'Sim, e acredito que é possível' },
              { value: 'luck', label: 'Sim, mas acho que é sorte' },
              { value: 'scam', label: 'Sim, mas desconfio que seja golpe' },
              { value: 'never', label: 'Não, nunca soube disso' },
              { value: 'notreal', label: 'Não acredito que seja real' }
            ]}
            selectedValue={quizAnswers.question5}
            onSelect={(value) => handleAnswer('question5', value)}
            onContinue={nextQuizStep}
          />
        );

      case 6:
        return (
          <QuizQuestion
            title="Qual seu maior obstáculo para ganhar na loteria?"
            options={[
              { value: 'numbers', label: 'Não sei escolher os números certos' },
              { value: 'spend', label: 'Gasto muito e ganho pouco' },
              { value: 'method', label: 'Não tenho um método eficaz' },
              { value: 'luck', label: 'Acho que é tudo sorte mesmo' },
              { value: 'never', label: 'Nunca pensei nisso' }
            ]}
            selectedValue={quizAnswers.question6}
            onSelect={(value) => handleAnswer('question6', value)}
            onContinue={nextQuizStep}
          />
        );

      case 7:
        return (
          <QuizQuestion
            title="Qual seria o valor ideal para você ganhar mensalmente na loteria?"
            options={[
              { value: '1to5', label: 'Entre R$ 1.000 a R$ 5.000', emoji: '💰' },
              { value: '5to15', label: 'Entre R$ 5.000 a R$ 15.000', emoji: '💰' },
              { value: '15to50', label: 'Entre R$ 15.000 a R$ 50.000', emoji: '💰' },
              { value: 'more50', label: 'Mais de R$ 50.000', emoji: '💰' },
              { value: 'any', label: 'Qualquer valor já mudaria minha vida', emoji: '💰' }
            ]}
            selectedValue={quizAnswers.question7}
            onSelect={(value) => handleAnswer('question7', value)}
            onContinue={nextQuizStep}
          />
        );

      default:
        return null;
    }
  };

  return <>{renderQuestion()}</>;
};

export default QuizFlow;
