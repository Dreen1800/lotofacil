// Utilitários para otimização de performance de vídeo

export const preloadVideo = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.src = src
    
    video.addEventListener('loadedmetadata', () => {
      resolve()
    })
    
    video.addEventListener('error', () => {
      reject(new Error(`Failed to preload video: ${src}`))
    })
  })
}

export const getOptimalVideoFormat = (userAgent: string = navigator.userAgent) => {
  // Detectar suporte para diferentes formatos
  const video = document.createElement('video')
  
  if (video.canPlayType('video/webm; codecs="vp9"')) {
    return 'webm'
  } else if (video.canPlayType('video/mp4; codecs="avc1.42E01E"')) {
    return 'mp4'
  }
  
  return 'mp4' // fallback
}

export const createVideoWithOptimizations = (src: string, options: {
  preload?: 'none' | 'metadata' | 'auto'
  poster?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
} = {}) => {
  const video = document.createElement('video')
  
  // Configurações de performance
  video.src = src
  video.preload = options.preload || 'metadata'
  video.playsInline = true
  
  if (options.poster) video.poster = options.poster
  if (options.autoplay) video.autoPlay = true
  if (options.muted) video.muted = true
  if (options.loop) video.loop = true
  
  // Otimizações adicionais
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', '')
  
  return video
}

// Hook para monitorar performance de vídeo
export const logVideoPerformance = (videoElement: HTMLVideoElement, videoId: string) => {
  const startTime = performance.now()
  
  const handleLoadStart = () => {
    console.log(`[${videoId}] Video load started at:`, performance.now() - startTime, 'ms')
  }
  
  const handleCanPlay = () => {
    console.log(`[${videoId}] Video can play at:`, performance.now() - startTime, 'ms')
  }
  
  const handleLoadedData = () => {
    console.log(`[${videoId}] Video loaded data at:`, performance.now() - startTime, 'ms')
  }
  
  videoElement.addEventListener('loadstart', handleLoadStart)
  videoElement.addEventListener('canplay', handleCanPlay)
  videoElement.addEventListener('loadeddata', handleLoadedData)
  
  return () => {
    videoElement.removeEventListener('loadstart', handleLoadStart)
    videoElement.removeEventListener('canplay', handleCanPlay)
    videoElement.removeEventListener('loadeddata', handleLoadedData)
  }
}

// Configurações recomendadas para CDNs
export const CDN_CONFIGURATIONS = {
  CLOUDFLARE_R2: {
    // Adicionar parâmetros de otimização na URL
    addOptimizations: (url: string) => {
      return `${url}?cf-video-optimize=true`
    }
  },
  
  CLOUDFLARE_STREAM: {
    // Formato HLS para streaming adaptativo
    getStreamUrl: (videoId: string, accountHash: string) => {
      return `https://videodelivery.net/${videoId}/manifest/video.m3u8`
    }
  }
}
