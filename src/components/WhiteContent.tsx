import React from 'react';

/**
 * WHITE CONTENT - Safe/Basic content
 * Shown to bots, reviewers, or users without valid cloaker cookie
 * This should be a safe, compliant version of your content
 */
export default function WhiteContent() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bem-vindo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Conteúdo em manutenção
          </p>
          
          <div className="bg-gray-100 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Informações Gerais
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Esta página está temporariamente em manutenção. 
              Volte em breve para acessar o conteúdo completo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Seguro</h3>
              <p className="text-blue-700 text-sm">Plataforma confiável</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Rápido</h3>
              <p className="text-green-700 text-sm">Acesso imediato</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Confiável</h3>
              <p className="text-purple-700 text-sm">Suporte dedicado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
