declare global {
  interface Window {
    vturbScriptsLoaded?: Set<string>
    vturbLoadingPromises?: Map<string, Promise<void>>
  }
}

type PlayerType = 'ab-test' | 'players'

interface LoadVturbPlayerOptions {
  playerId: string
  accountId: string
  type?: PlayerType
}

/**
 * Carrega um player Vturb de forma única, evitando duplicações
 * @param options - Opções de configuração do player
 * @returns Promise que resolve quando o player é carregado
 */
export function loadVturbPlayer(
  playerId: string, 
  accountId: string, 
  type: PlayerType = 'ab-test'
): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()

  // Inicializa os conjuntos de controle se não existirem
  if (!window.vturbScriptsLoaded) window.vturbScriptsLoaded = new Set()
  if (!window.vturbLoadingPromises) window.vturbLoadingPromises = new Map()

  // Se já foi carregado, retorna imediatamente
  if (window.vturbScriptsLoaded.has(playerId)) {
    return Promise.resolve()
  }

  // Se já está carregando, retorna a promise existente
  if (window.vturbLoadingPromises.has(playerId)) {
    return window.vturbLoadingPromises.get(playerId)!
  }

  // Cria nova promise de carregamento
  const loadingPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    
    // Constrói a URL correta baseado no tipo
    if (type === 'ab-test') {
      script.src = `https://scripts.converteai.net/${accountId}/ab-test/${playerId}/player.js`
    } else {
      script.src = `https://scripts.converteai.net/${accountId}/players/${playerId}/v4/player.js`
    }
    
    script.async = true
    script.setAttribute('data-vturb-player', playerId)
    
    script.onload = () => {
      window.vturbScriptsLoaded!.add(playerId)
      window.vturbLoadingPromises!.delete(playerId)
      console.log(`Vturb player ${playerId} (${type}) carregado com sucesso`)
      resolve()
    }
    
    script.onerror = (error) => {
      window.vturbLoadingPromises!.delete(playerId)
      console.error(`Erro ao carregar Vturb player ${playerId} (${type}):`, error)
      reject(error)
    }

    document.head.appendChild(script)
  })

  window.vturbLoadingPromises.set(playerId, loadingPromise)
  return loadingPromise
}

