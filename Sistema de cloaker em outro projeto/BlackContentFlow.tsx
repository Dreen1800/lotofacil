import Index from "./src/pages/Index"

// BLACK CONTENT - Projeto principal completo (Quiz de Quaresma)
// Renderizado apenas para tráfego qualificado (Layer 3)
export default function BlackContentFlow() {
  return <Index />
}

// Re-exportar o tipo FlowStep se necessário
export type { QuizPage as FlowStep } from "./src/contexts/QuizContext"
