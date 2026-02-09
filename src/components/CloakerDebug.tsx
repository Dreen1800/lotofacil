import { useState, useEffect } from 'react';
import { getCookie, setCookie } from '../utils/cloaker';
import { getUserLayerSync, getUserLayerDescription } from '../utils/getUserLayer';
import { CLOAKER_CONFIG } from '../utils/cloakerConfig';
import { isMobileDevice, isBotUserAgent, getUserLanguage, isFacebookOrInstagramBrowser } from '../utils/browseDetector';

/**
 * CloakerDebug - Component for testing and debugging the cloaker system
 * Shows detailed information about filters and validation
 * 
 * Usage: Import and add <CloakerDebug /> to your component
 */
export default function CloakerDebug() {
  const [currentLayer, setCurrentLayer] = useState(getUserLayerSync().layer);
  const [cookieValue, setCookieValue] = useState(getCookie('cat_valid'));
  const [isVisible, setIsVisible] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateStatus = () => {
    const result = getUserLayerSync();
    const cookie = getCookie('cat_valid');
    setCurrentLayer(result.layer);
    setCookieValue(cookie);
  };

  useEffect(() => {
    updateStatus();
    const interval = setInterval(updateStatus, 2000);
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

  const addTestParam = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('test', CLOAKER_CONFIG.LOCAL_TEST_PASS);
    window.location.href = url.toString();
  };

  // Get device info
  const isMobile = isMobileDevice();
  const isBot = isBotUserAgent();
  const userLang = getUserLanguage();
  const browserCheck = isFacebookOrInstagramBrowser();

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg z-50 transition-all"
        title="Open Cloaker Debug Panel"
      >
        🔍
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-2xl p-4 z-50 max-w-md border-2 border-red-500 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg text-red-600">🔒 Cloaker Debug</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        {/* Current Status */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-lg">
          <p className="text-sm font-semibold text-gray-700">Status Atual:</p>
          <p className="text-2xl font-bold text-purple-600">
            Layer {currentLayer}
          </p>
          <p className="text-xs text-gray-600">
            {getUserLayerDescription(currentLayer)}
          </p>
        </div>

        {/* Cookie Status */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-1">Cookie Status:</p>
          <div className="flex items-center justify-between">
            <code className="text-xs font-mono text-gray-800">
              cat_valid = {cookieValue || 'null'}
            </code>
            {cookieValue === '1' ? (
              <span className="text-green-600 text-sm">✓</span>
            ) : (
              <span className="text-red-600 text-sm">✗</span>
            )}
          </div>
        </div>

        {/* Filters Status */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-sm font-semibold text-blue-700 mb-2">Filtros:</p>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span>Bot Detection:</span>
              {isBot ? (
                <span className="text-red-600 font-bold">🤖 Bot</span>
              ) : (
                <span className="text-green-600">✓ Humano</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span>Device:</span>
              {isMobile ? (
                <span className="text-green-600">📱 Mobile</span>
              ) : (
                <span className="text-orange-600">💻 Desktop</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span>Language:</span>
              <span className="font-mono">{userLang}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>FB/IG Browser:</span>
              {browserCheck.isFBIG ? (
                <span className="text-green-600">✓ Sim ({browserCheck.score})</span>
              ) : (
                <span className="text-orange-600">✗ Não</span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-700">Ações Rápidas:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLayer(1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 rounded text-sm"
            >
              🤖 White
            </button>
            <button
              onClick={() => setLayer(3)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded text-sm"
            >
              ✅ Black
            </button>
          </div>
          <button
            onClick={addTestParam}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-3 rounded text-sm"
          >
            🧪 Ativar Test Mode
          </button>
        </div>

        {/* Test URLs */}
        <div className="bg-yellow-50 border border-yellow-200 p-2 rounded">
          <p className="text-xs font-semibold text-yellow-800 mb-1">URLs de Teste:</p>
          <div className="space-y-1">
            <code className="text-[10px] block text-yellow-700 break-all">
              ?cat={CLOAKER_CONFIG.FACEBOOK_PARAM_PASS}
            </code>
            <code className="text-[10px] block text-yellow-700 break-all">
              ?test={CLOAKER_CONFIG.LOCAL_TEST_PASS}
            </code>
          </div>
        </div>

        {/* Advanced Info Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full text-xs text-blue-600 hover:text-blue-800 underline"
        >
          {showAdvanced ? '▼ Ocultar Config' : '▶ Mostrar Config'}
        </button>

        {/* Advanced Configuration */}
        {showAdvanced && (
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[10px] space-y-1">
            <p className="font-semibold text-slate-700 mb-2">Configuração:</p>
            <div><strong>Mobile Required:</strong> {CLOAKER_CONFIG.REQUIRE_MOBILE ? 'Sim' : 'Não'}</div>
            <div><strong>FB/IG Required:</strong> {CLOAKER_CONFIG.REQUIRE_FBIG_BROWSER ? 'Sim' : 'Não'}</div>
            <div><strong>IP Check:</strong> {CLOAKER_CONFIG.CHECK_SUSPICIOUS_IP ? 'Ativo' : 'Inativo'}</div>
            <div><strong>Blocked Countries:</strong> {CLOAKER_CONFIG.BLOCKED_COUNTRIES.join(', ')}</div>
            <div><strong>Blocked Languages:</strong> {CLOAKER_CONFIG.BLOCKED_LANGUAGES.join(', ')}</div>
          </div>
        )}
      </div>

      {/* Warning */}
      <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
        <p className="text-[10px] text-red-600 font-semibold">
          ⚠️ REMOVER EM PRODUÇÃO
        </p>
      </div>
    </div>
  );
}
