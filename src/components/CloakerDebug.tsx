import React, { useState, useEffect } from 'react';
import { getCookie, setCookie } from '../utils/cloaker';
import { getUserLayer, getUserLayerDescription } from '../utils/getUserLayer';

/**
 * CloakerDebug - Component for testing and debugging the cloaker system
 * Add this to your app during development to test different layers
 * 
 * Usage: Import and add <CloakerDebug /> to your component
 */
export default function CloakerDebug() {
  const [currentLayer, setCurrentLayer] = useState(getUserLayer());
  const [cookieValue, setCookieValue] = useState(getCookie('cat_valid'));
  const [isVisible, setIsVisible] = useState(false);

  const updateStatus = () => {
    const layer = getUserLayer();
    const cookie = getCookie('cat_valid');
    setCurrentLayer(layer);
    setCookieValue(cookie);
  };

  useEffect(() => {
    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const setLayer = (layer: 1 | 3) => {
    if (layer === 3) {
      setCookie('cat_valid', '1', 72);
    } else {
      // Clear cookie
      document.cookie = "cat_valid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    setTimeout(() => {
      updateStatus();
      window.location.reload();
    }, 100);
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg z-50"
        title="Open Cloaker Debug"
      >
        🔍
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-2xl p-4 z-50 max-w-sm border-2 border-red-500">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg text-red-600">Cloaker Debug</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700 font-bold"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-100 p-3 rounded">
          <p className="text-sm font-semibold text-gray-700">Status Atual:</p>
          <p className="text-lg font-bold text-purple-600">
            Layer {currentLayer}
          </p>
          <p className="text-xs text-gray-600">
            {getUserLayerDescription(currentLayer)}
          </p>
        </div>

        <div className="bg-gray-100 p-3 rounded">
          <p className="text-sm font-semibold text-gray-700">Cookie:</p>
          <p className="text-sm font-mono text-gray-800">
            cat_valid = {cookieValue || 'null'}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-700">Mudar Layer:</p>
          <button
            onClick={() => setLayer(1)}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            🤖 Layer 1 (White)
          </button>
          <button
            onClick={() => setLayer(3)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            ✅ Layer 3 (Black)
          </button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-2 rounded">
          <p className="text-xs text-yellow-800">
            <strong>URL de teste:</strong><br />
            <code className="text-xs">?cat=Zkxidj6qY8JKKyK</code>
          </p>
        </div>
      </div>
    </div>
  );
}
