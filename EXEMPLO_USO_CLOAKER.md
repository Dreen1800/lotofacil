# 🎯 Exemplos Práticos de Uso do Sistema de Cloaker

## 📱 Cenário 1: Campanha no Facebook Ads

### Setup da Campanha

**1. Criar anúncio no Facebook Ads**
- Configure seu anúncio normalmente
- URL de destino: `https://seudominio.com/?cat=Zkxidj6qY8JKKyK&utm_source=facebook`

**2. O que acontece:**
```
Usuário clica no anúncio
    ↓
Facebook abre URL no in-app browser
    ↓
Sistema detecta ?cat=senha
    ↓
Cookie cat_valid=1 é criado (72h)
    ↓
Valida: Mobile ✓, FB Browser ✓, Cookie ✓
    ↓
BLACK CONTENT (Quiz Lotofácil) ✅
```

**3. Vantagens:**
- ✅ Bots/moderadores do Facebook veem WHITE CONTENT
- ✅ Usuários reais veem BLACK CONTENT
- ✅ Cookie dura 72h (usuário pode voltar depois)

---

## 🧪 Cenário 2: Testando Localmente

### Método 1: Test Mode (Mais Fácil)

**URL**: `http://localhost:5173/?test=KBC4fEgoQIFGBlrk`

```typescript
// Bypass TODOS os filtros
✓ Ignora verificação de cookie
✓ Ignora verificação de device  
✓ Ignora verificação de browser
✓ Ignora verificação de IP
✓ Ignora verificação de idioma

→ Sempre mostra BLACK CONTENT
```

**Quando usar**: Desenvolvimento e testes rápidos

### Método 2: Simular Facebook (Mais Realista)

**URL**: `http://localhost:5173/?cat=Zkxidj6qY8JKKyK`

```typescript
// Simula usuário vindo do Facebook
✓ Cria cookie cat_valid=1
✓ Mas ainda precisa passar outros filtros:
  - Mobile device
  - Browser FB/IG
  - IP válido
  - Idioma permitido
```

**Quando usar**: Testar o fluxo completo de validação

### Método 3: Usar o Painel de Debug

```tsx
// No seu componente
import CloakerDebug from './components/CloakerDebug';

function App() {
  return (
    <>
      <MainFlow />
      <CloakerDebug />  {/* Adicione isso */}
    </>
  );
}
```

**Recursos do painel**:
- Ver layer atual
- Ver status de cada filtro
- Mudar entre layers com 1 clique
- Copiar URLs de teste
- Ver configurações

---

## 🌐 Cenário 3: Múltiplos Domínios/Campanhas

### Setup com Diferentes Senhas

```typescript
// cloakerConfig.ts
export const CAMPAIGN_PASSES = {
  facebook_campaign_1: 'Zkxidj6qY8JKKyK',
  facebook_campaign_2: 'A8jdK9sLm2NqP4r',
  instagram_campaign: 'X5yT8zKpL3mNqR9',
};
```

### URLs das Campanhas

**Campanha FB 1**: `https://dominio.com/?cat=Zkxidj6qY8JKKyK&utm_campaign=fb1`
**Campanha FB 2**: `https://dominio.com/?cat=A8jdK9sLm2NqP4r&utm_campaign=fb2`
**Campanha IG**: `https://dominio.com/?cat=X5yT8zKpL3mNqR9&utm_campaign=ig1`

### Rastreamento

```typescript
// Adicione tracking no cloaker.ts
export function initCloaker(): void {
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get(URL_PARAM_NAME);
  const utmCampaign = urlParams.get('utm_campaign');
  
  if (catParam && isValidPass(catParam)) {
    // Log qual campanha converteu
    console.log(`Valid access from: ${utmCampaign || 'unknown'}`);
    
    // Envie para analytics
    trackConversion(utmCampaign);
  }
}
```

---

## 🔧 Cenário 4: Customizações Comuns

### A. Desabilitar Verificação de IP (Performance)

```typescript
// cloakerConfig.ts
export const CLOAKER_CONFIG = {
  // ...
  CHECK_SUSPICIOUS_IP: false,  // Desliga IP check
};
```

**Resultado**:
- ⚡ Load time: 3s → 100ms
- ⚠️ Menos seguro (não detecta VPN/Proxy)

### B. Permitir Desktop

```typescript
// cloakerConfig.ts
export const CLOAKER_CONFIG = {
  // ...
  REQUIRE_MOBILE: false,  // Permite desktop
};
```

**Quando usar**: Se você tem tráfego de desktop válido

### C. Permitir Outros Browsers

```typescript
// cloakerConfig.ts
export const CLOAKER_CONFIG = {
  // ...
  REQUIRE_FBIG_BROWSER: false,  // Permite qualquer browser
};
```

**Quando usar**: Tráfego de outras fontes (Google Ads, Email, etc)

### D. Adicionar Países Bloqueados

```typescript
// cloakerConfig.ts
export const CLOAKER_CONFIG = {
  // ...
  BLOCKED_COUNTRIES: ['US', 'RU', 'KP', 'IR', 'CN', 'UK', 'CA'],
};
```

---

## 📊 Cenário 5: Monitoramento e Analytics

### Implementar Logging

```typescript
// getUserLayer.ts
export async function getUserLayerClient(): Promise<LayerResult> {
  const result = await validateUser();
  
  // Enviar para seu analytics
  logLayerAccess({
    layer: result.layer,
    reason: result.reason,
    timestamp: new Date(),
    userAgent: navigator.userAgent,
    referrer: document.referrer,
  });
  
  return result;
}
```

### Dashboard de Estatísticas

```typescript
interface CloakerStats {
  white_content_views: number;   // Bots/blocked
  gray_content_views: number;    // Suspicious
  black_content_views: number;   // Qualified
  
  blocked_reasons: {
    bot: number,
    no_cookie: number,
    desktop: number,
    language: number,
    no_fbig: number,
    suspicious_ip: number,
  };
}
```

### Google Analytics

```typescript
// Track layer views
gtag('event', 'cloaker_layer_view', {
  layer: result.layer,
  reason: result.reason,
});

// Track filter blocks
gtag('event', 'cloaker_block', {
  filter: 'bot_detection',
  user_agent: navigator.userAgent,
});
```

---

## 🚨 Cenário 6: Troubleshooting

### Problema: "Sempre mostra WHITE CONTENT"

**Debug passo a passo**:

```typescript
// 1. Adicione CloakerDebug ao componente
<CloakerDebug />

// 2. Abra o painel e verifique:
// - Cookie está criado? ✓/✗
// - Device é mobile? ✓/✗
// - Browser é FB/IG? ✓/✗
// - Idioma permitido? ✓/✗

// 3. Use test mode para bypass
?test=KBC4fEgoQIFGBlrk

// 4. Ative DEBUG no console
CLOAKER_CONFIG.DEBUG = true;
```

**Checklist**:
```
□ URL tem ?cat=senha correta?
□ Cookie foi criado? (verifique DevTools > Application > Cookies)
□ Está em device mobile? (ou REQUIRE_MOBILE=false)
□ Está no browser do FB/IG? (ou REQUIRE_FBIG_BROWSER=false)
□ Idioma não está bloqueado?
□ IP não está em país bloqueado?
```

### Problema: "IP check muito lento"

**Solução 1**: Desabilitar
```typescript
CHECK_SUSPICIOUS_IP: false
```

**Solução 2**: Cache de IPs
```typescript
const ipCache = new Map<string, IPCheckResult>();

export async function isSuspiciousIP(): Promise<IPCheckResult> {
  const ip = await getUserIP();
  
  if (ipCache.has(ip)) {
    return ipCache.get(ip)!;
  }
  
  const result = await checkAllAPIs(ip);
  ipCache.set(ip, result);
  
  return result;
}
```

**Solução 3**: Verificar em background
```typescript
// getUserLayer.ts
export function getUserLayerSync(): LayerResult {
  // Retorna resultado imediato sem IP check
  return validateUserSync();
}

// Depois verifica IP em background
setTimeout(async () => {
  const ipResult = await isSuspiciousIP();
  if (ipResult.isSuspicious) {
    // Atualiza layer ou registra
    updateUserLayer(2);
  }
}, 0);
```

---

## 🎨 Cenário 7: Customizar Conteúdos

### White Content (Layer 1)

```tsx
// WhiteContent.tsx
export default function WhiteContent() {
  return (
    <div className="min-h-screen bg-white">
      <h1>Portal de Espiritualidade</h1>
      <p>Conteúdo genérico e seguro...</p>
      {/* SEO friendly, nada suspeito */}
    </div>
  );
}
```

### Gray Content (Layer 2)

```tsx
// GrayContent.tsx
export default function GrayContent() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1>Acesso Restrito</h1>
      <p>Detectamos que você pode estar usando VPN ou proxy.</p>
      <button>Verificar Novamente</button>
      {/* Conteúdo intermediário, não mostra nada sensível */}
    </div>
  );
}
```

### Black Content (Layer 3)

```tsx
// BlackContent.tsx
export default function BlackContent() {
  return (
    <GameContainer>
      <LotterySimulator />
      <QuizFlow />
      {/* Seu conteúdo principal completo */}
    </GameContainer>
  );
}
```

---

## 💡 Dicas Avançadas

### 1. A/B Testing de Filtros

```typescript
// Teste diferentes configurações
const CONFIG_A = {
  REQUIRE_MOBILE: true,
  CHECK_SUSPICIOUS_IP: true,
};

const CONFIG_B = {
  REQUIRE_MOBILE: false,
  CHECK_SUSPICIOUS_IP: false,
};

// Use 50% do tráfego para cada
const useConfigA = Math.random() > 0.5;
const config = useConfigA ? CONFIG_A : CONFIG_B;
```

### 2. Whitelist de IPs

```typescript
const WHITELISTED_IPS = [
  '123.456.789.0',  // Seu IP
  '234.567.890.1',  // Cliente VIP
];

if (WHITELISTED_IPS.includes(userIP)) {
  return { layer: 3, reason: 'Whitelisted IP' };
}
```

### 3. Rotação de Senhas

```typescript
const ACTIVE_PASSES = [
  { pass: 'Zkxidj6qY8JKKyK', expires: '2026-03-01' },
  { pass: 'NewPass123456', expires: '2026-04-01' },
];

function isValidPass(catParam: string): boolean {
  return ACTIVE_PASSES.some(p => 
    p.pass === catParam && new Date(p.expires) > new Date()
  );
}
```

### 4. Rate Limiting

```typescript
const accessCount = new Map<string, number>();

export async function getUserLayerClient(): Promise<LayerResult> {
  const ip = await getUserIP();
  const count = (accessCount.get(ip) || 0) + 1;
  
  if (count > 10) {  // Máximo 10 acessos
    return { layer: 1, reason: 'Rate limit exceeded' };
  }
  
  accessCount.set(ip, count);
  
  // Continue validação normal...
}
```

---

## 📚 Recursos Adicionais

### Documentação Completa
- Ver: `CLOAKER_SYSTEM.md`

### Arquivos Principais
- `src/utils/cloakerConfig.ts` - Configurações
- `src/utils/getUserLayer.ts` - Lógica principal
- `src/components/MainFlow.tsx` - Roteamento
- `src/components/CloakerDebug.tsx` - Debug panel

### APIs Externas
- [ProxyCheck.io](https://proxycheck.io/)
- [AbstractAPI](https://www.abstractapi.com/)
- [IPInfo.io](https://ipinfo.io/)

---

**Última atualização**: 2026-02-08  
**Versão**: 2.0
