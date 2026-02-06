import React from 'react';

/**
 * GRAY CONTENT - Intermediate content
 * Can be used for A/B testing or gradual rollout
 */
export default function GrayContent() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Versão Intermediária
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Você está visualizando uma versão em desenvolvimento
          </p>
          
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Acesso Parcial
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Esta é uma versão intermediária do conteúdo.
              Para acessar a versão completa, utilize o link correto.
            </p>
          </div>

          <div className="mt-8">
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Entre em Contato
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
