# Implementação do Quiz - LotoSorte

## 📋 Resumo da Implementação

Foi implementado um sistema completo de quiz com 7 perguntas antes do fluxo principal da aplicação, seguindo exatamente o design fornecido nas imagens.

## 🎯 Estrutura do Quiz

### Fluxo Implementado:

1. **Welcome Popup** → 2. **Simulação Regular (2 rodadas)** → 3. **Transition Popup** → 4. **Quiz (7 perguntas)** → 5. **Tela de Loading/Análise** → 6. **Simulação com IA** → 7. **Resumo de Resultados** → 8. **Oferta Final**

### Perguntas do Quiz:

#### Pergunta 1
**Título:** "Qual foi o maior prêmio que você já ganhou na loteria?"
- Nunca ganhei nada
- Menos de R$ 100
- Entre R$ 100 a R$ 1.000
- Entre R$ 1.000 a R$ 10.000
- Mais de R$ 10.000

#### Pergunta 2
**Título:** "Como você escolhe seus números para apostar?"
- Datas especiais (aniversários, casamento, etc.)
- Números da sorte pessoais
- Surpresinha (aleatório)
- Baseado em estatísticas dos sorteios anteriores
- Uso algum método ou sistema

#### Pergunta 3
**Título:** "Quanto você gasta por mês com apostas na loteria?"
- Não Gasto Nada
- Até R$ 50
- Entre R$ 50 a R$ 100
- Entre R$ 100 a R$ 500
- Mais de R$ 500

#### Pergunta 4
**Título:** "Se você ganhasse R$ 50.000 na loteria amanhã, qual seria sua primeira ação?"
- 💸 Pagaria todas as dívidas
- 🚗 Compraria um carro novo
- 💰 Investiria o dinheiro
- 🏠 Realizaria o sonho da casa própria
- 👨‍👩‍👧‍👦 Ajudaria a família

*Nota de rodapé:* "Seus sonhos estão mais próximos do que imagina... Mas há algo que você PRECISA saber antes de continuar jogando do jeito tradicional..."

#### Pergunta 5
**Título:** "Você já ouviu falar de pessoas que ganharam na loteria mais de 10 vezes?"
- Sim, e acredito que é possível
- Sim, mas acho que é sorte
- Sim, mas desconfio que seja golpe
- Não, nunca soube disso
- Não acredito que seja real

#### Pergunta 6
**Título:** "Qual seu maior obstáculo para ganhar na loteria?"
- Não sei escolher os números certos
- Gasto muito e ganho pouco
- Não tenho um método eficaz
- Acho que é tudo sorte mesmo
- Nunca pensei nisso

#### Pergunta 7
**Título:** "Qual seria o valor ideal para você ganhar mensalmente na loteria?"
- 💰 Entre R$ 1.000 a R$ 5.000
- 💰 Entre R$ 5.000 a R$ 15.000
- 💰 Entre R$ 15.000 a R$ 50.000
- 💰 Mais de R$ 50.000
- 💰 Qualquer valor já mudaria minha vida

#### Tela 8 - Loading
**Título:** "Analisando suas respostas..."
- Barra de progresso animada (17% → 100%)
- Texto: "AGUARDE... Estamos processando suas respostas através de nosso algoritmo exclusivo que já identificou mais de 12.847 perfis de ganhadores..."
- Duração: 3 segundos

## 📁 Arquivos Criados

### 1. `/src/components/quiz/QuizQuestion.tsx`
Componente genérico reutilizável para exibir perguntas do quiz com:
- Título e subtítulo
- Lista de opções (com suporte a emojis)
- Seleção única
- Botão "CONTINUAR"
- Nota de rodapé opcional

### 2. `/src/components/quiz/QuizFlow.tsx`
Gerenciador do fluxo das 7 perguntas:
- Controla qual pergunta exibir
- Gerencia as respostas
- Navega entre as perguntas

### 3. `/src/components/quiz/QuizLoading.tsx`
Tela de loading com:
- Barra de progresso animada
- Transição automática para o Welcome Popup após 3 segundos

## 🔧 Arquivos Modificados

### 1. `/src/contexts/GameContext.tsx`
**Adicionado:**
- Tipo `QuizAnswers` para armazenar respostas
- Estados: `quizAnswers`, `currentQuizStep`
- Novos stages: `'quiz'` e `'quiz-loading'`
- Funções: `setQuizAnswer()`, `nextQuizStep()`

### 2. `/src/components/TransitionPopup.tsx`
**Modificado:**
- Botão "QUERO TESTAR AGORA" agora leva para o quiz (`stage: 'quiz'`) ao invés de ir direto para a simulação com IA

### 3. `/src/components/GameContainer.tsx`
**Adicionado:**
- Import dos componentes `QuizFlow` e `QuizLoading`
- Cases para renderizar os novos stages no switch

## 🎨 Características do Design

### Cores e Estilo
- **Cor principal:** `#8f339a` (roxo)
- **Cor secundária:** `#fbbf24` (amarelo/dourado)
- **Fundo:** Branco com sombra 2xl
- **Bordas:** Arredondadas (rounded-2xl)
- **Fonte do título:** Anton (bold)

### Interações
- Botões de opção com hover e estados selecionados
- Transições suaves
- Botão "CONTINUAR" desabilitado até selecionar uma opção
- Animações de entrada (fadeIn)
- Barra de progresso animada

## 🚀 Como Funciona

1. **Usuário acessa a aplicação** → Welcome Popup
2. **Faz 2 simulações sem IA** → Vê resultados ruins
3. **Chega na Transition Popup** → "Conheça a IA da LotoSorte!"
4. **Clica em "QUERO TESTAR AGORA"** → Entra no Quiz (Pergunta 1)
5. **Responde cada pergunta** → Avança automaticamente
6. **Após 7ª pergunta** → Tela de Loading (3 segundos)
7. **Após Loading** → Simulação com IA (jogos sugeridos)

## 💾 Dados Coletados

As respostas são armazenadas no contexto global em `quizAnswers`:
```typescript
{
  question1: string,
  question2: string,
  question3: string,
  question4: string,
  question5: string,
  question6: string,
  question7: string
}
```

Esses dados podem ser usados para:
- Segmentação de usuários
- Personalização da experiência
- Análise de perfil
- Envio para backend/analytics

## ✅ Status

- ✅ 7 Perguntas implementadas
- ✅ Tela de loading implementada
- ✅ Integração com fluxo existente
- ✅ Design fiel às imagens fornecidas
- ✅ Responsivo
- ✅ Sem erros de compilação
- ✅ Servidor rodando em http://localhost:5174/

## 🎯 Próximos Passos (Opcionais)

1. Integrar respostas com backend/API
2. Adicionar validação das respostas
3. Implementar sistema de pontuação/perfil
4. Adicionar analytics para tracking
5. Implementar salvamento de progresso (localStorage)
