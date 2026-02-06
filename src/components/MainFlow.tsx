import React, { useState, useEffect } from 'react';
import WhiteContent from './WhiteContent';
import GrayContent from './GrayContent';
import BlackContent from './BlackContent';
import { getUserLayer, getUserLayerDescription, type UserLayer } from '../utils/getUserLayer';
import { initCloaker } from '../utils/cloaker';

/**
 * MainFlow - Determines which content to show based on user layer
 * Adapted for Vite (client-side rendering)
 */
export default function MainFlow() {
  const [userLayer, setUserLayer] = useState<UserLayer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize cloaker on mount
    initCloaker();
    
    // Small delay to ensure cookies are set
    setTimeout(() => {
      try {
        const layer = getUserLayer();
        console.log(`User layer determined: ${layer} - ${getUserLayerDescription(layer)}`);
        setUserLayer(layer);
      } catch (error) {
        console.error('Error getting user layer:', error);
        setUserLayer(1); // Fallback to white content
      } finally {
        setIsLoading(false);
      }
    }, 100);
  }, []);

  // Loading state
  if (isLoading || userLayer === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
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