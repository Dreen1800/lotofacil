import { useState, useEffect } from 'react';
import WhiteContent from './WhiteContent';
import GrayContent from './GrayContent';
import BlackContent from './BlackContent';
import { getUserLayerClient, getUserLayerDescription, type UserLayer } from '../utils/getUserLayer';
import { initCloaker } from '../utils/cloaker';
import { CLOAKER_CONFIG } from '../utils/cloakerConfig';

/**
 * MainFlow - Determines which content to show based on user layer
 * Uses comprehensive validation system with multiple filters
 */
export default function MainFlow() {
  const [userLayer, setUserLayer] = useState<UserLayer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function determineLayer() {
      try {
        // Initialize cloaker (handles ?cat parameter and sets cookie)
        initCloaker();
        
        // Small delay to ensure cookies are processed
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Get user layer with comprehensive validation
        const result = await getUserLayerClient();
        
        if (CLOAKER_CONFIG.DEBUG) {
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log(`✅ User Layer: ${result.layer} - ${getUserLayerDescription(result.layer)}`);
          console.log(`📋 Reason: ${result.reason}`);
          if (result.details) {
            console.log('📊 Details:', result.details);
          }
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        }
        
        setUserLayer(result.layer);
      } catch (error) {
        console.error('❌ Error getting user layer:', error);
        setUserLayer(1); // Fallback to white content
      } finally {
        setIsLoading(false);
      }
    }

    determineLayer();
  }, []);

  // Loading state
  if (isLoading || userLayer === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Carregando...</p>
          {CLOAKER_CONFIG.DEBUG && (
            <p className="text-xs text-slate-400 mt-2">Validando acesso...</p>
          )}
        </div>
      </div>
    );
  }

  // Render content based on user layer
  switch (userLayer) {
    case 1: // WHITE CONTENT - Basic/Safe
      return <WhiteContent />;
    
    case 2: // GRAY CONTENT - Intermediate
      return <GrayContent />;
    
    case 3: // BLACK CONTENT - Premium/Full Experience
      return <BlackContent />;
    
    default:
      return <WhiteContent />;
  }
}