import React, { useState, useEffect } from "react"
import WhiteContent from "./WhiteContent"
import GrayContent from "./GrayContent"
import BlackContentFlow from "./BlackContentFlow"
import { getUserLayerClient } from "@/utils/getUserLayerClient"

// Re-export the type for compatibility
export type { QuizPage as FlowStep } from "./src/contexts/QuizContext"

// Loading component
function LoadingContent() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Carregando...</p>
      </div>
    </div>
  )
}

export default function MainFlow() {
  const [userLayer, setUserLayer] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function determineLayer() {
      try {
        const result = await getUserLayerClient()
        console.log(`✅ User layer determined: ${result.layer} (${result.reason})`)
        setUserLayer(result.layer)
      } catch (error) {
        console.error('❌ Error getting user layer:', error)
        setUserLayer(1) // Fallback to white content
      } finally {
        setLoading(false)
      }
    }

    determineLayer()
  }, [])

  // Show loading while determining layer
  if (loading || userLayer === null) {
    return <LoadingContent />
  }

  // Render content based on user layer
  switch (userLayer) {
    case 1: // WHITE CONTENT - Basic/Safe
      return <WhiteContent />
    
    case 2: // GRAY CONTENT - Intermediate
      return <GrayContent />
    
    case 3: // BLACK CONTENT - Premium/Full Experience
      return <BlackContentFlow />
    
    default:
      return <WhiteContent />
  }
}