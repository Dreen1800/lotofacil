# 🔒 Sistema de Cloaker Avançado - Documentação

## 📋 Visão Geral

Sistema completo de cloaking com múltiplas camadas de validação para proteger seu conteúdo e garantir que apenas tráfego qualificado do Facebook/Instagram veja o conteúdo principal.

## 🎯 Camadas de Conteúdo

### Layer 1 - WHITE CONTENT (Conteúdo Seguro)
- **Quem vê**: Bots, crawlers, países bloqueados, desktop, idiomas bloqueados
- **Propósito**: Conteúdo genérico e seguro para moderação de plataformas
- **Componente**: `WhiteContent.tsx`

### Layer 2 - GRAY CONTENT (Conteúdo Intermediário)
- **Quem vê**: Tráfego suspeito (VPN, Proxy, browsers não-FB/IG)
- **Propósito**: Conteúdo intermediário para tráfego válido mas não-qualificado
- **Componente**: `GrayContent.tsx`

### Layer 3 - BLACK CONTENT (Conteúdo Premium)
- **Quem vê**: Tráfego 100% qualificado que passou por todos os filtros
- **Propósito**: Experiência completa do produto/serviço
- **Componente**: `BlackContent.tsx`

## 🔐 Sistema de Validação

### 1. Parâmetro de Teste (BYPASS)
```
?test=KBC4fEgoQIFGBlrk
```
- **Prioridade**: MÁXIMA (bypassa todos os filtros)
- **Uso**: Desenvolvimento e testes locais
- **Resultado**: Sempre mostra BLACK CONTENT

### 2. Parâmetro Cat (Facebook)
```
?cat=Zkxidj6qY8JKKyK
```
- **Função**: Valida que o tráfego veio do Facebook
- **Ação**: Cria cookie `cat_valid=1` válido por 72h
- **Resultado**: Necessário mas não suficiente para BLACK CONTENT

### 3. Detecção de Bot
- **Verifica**: User-Agent por palavras-chave de bots
- **Keywords**: bot, spider, crawler, google, bing, yandex, etc
- **Se for bot**: WHITE CONTENT

### 4. Validação de Cookie
- **Verifica**: Presença do cookie `cat_valid=1`
- **Se não tiver**: WHITE CONTENT
- **Validade**: 72 horas (3 dias)

### 5. Filtro de Device
- **Verifica**: Se é dispositivo mobile
- **Se for desktop**: WHITE CONTENT
- **Configurável**: `REQUIRE_MOBILE` em `cloakerConfig.ts`

### 6. Filtro de Idioma
- **Verifica**: Accept-Language do navegador
- **Bloqueados**: en-us, en
- **Se for bloqueado**: WHITE CONTENT
- **Configurável**: `BLOCKED_LANGUAGES` em `cloakerConfig.ts`

### 7. Detecção de Browser FB/IG
Sistema de pontuação para detectar Facebook/Instagram in-app browser:

**Pontos**:
- User-Agent com `fb_iab|fbav|instagram|iabmv|fban`: +2 pontos
- Referrer de `facebook.com` ou `instagram.com`: +1 ponto
- Parâmetros `fbclid` ou `igshid` na URL: +1 ponto

**Threshold**: Score >= 1 para passar
**Se não passar**: GRAY CONTENT

### 8. Verificação de IP Suspeito
Usa 3 APIs diferentes para máxima precisão:

#### ProxyCheck.io
- Detecta: Proxy, VPN
- Verifica: País de origem
- API Key: Configurável

#### AbstractAPI
- Detecta: VPN, Proxy, Tor
- Verifica: País de origem
- API Key: Configurável

#### IPInfo.io
- Detecta: IPs de datacenter (AWS, Google, Azure, etc)
- Verifica: País de origem
- API Key: Configurável

**Se detectar qualquer suspeita**: GRAY CONTENT
**Países bloqueados**: US, RU, KP, IR

## ⚙️ Configuração

Arquivo: `src/utils/cloakerConfig.ts`

```typescript
export const CLOAKER_CONFIG = {
  // Senhas
  FACEBOOK_PARAM_PASS: 'Zkxidj6qY8JKKyK',    // Mude para sua senha
  LOCAL_TEST_PASS: 'KBC4fEgoQIFGBlrk',       // Senha de teste
  
  // Cookies
  COOKIE_NAME: 'cat_valid',
  COOKIE_DURATION_HOURS: 72,
  
  // Parâmetros de URL
  URL_PARAM_NAME: 'cat',
  TEST_PARAM_NAME: 'test',
  
  // Debug
  DEBUG: import.meta.env.DEV,  // Logs apenas em dev
  DEFAULT_LAYER: 1,            // Fallback para WHITE
  
  // Filtros
  BLOCKED_COUNTRIES: ['US', 'RU', 'KP', 'IR'],
  BLOCKED_LANGUAGES: ['en-us', 'en'],
  REQUIRE_MOBILE: true,
  REQUIRE_FBIG_BROWSER: true,
  CHECK_SUSPICIOUS_IP: true,
  
  // API Keys
  API_KEYS: {
    PROXYCHECK: 'sua-chave-aqui',
    ABSTRACT: 'sua-chave-aqui',
    IPINFO: 'sua-chave-aqui',
  },
};
```

## 🧪 Testando o Sistema

### 1. Usando o Painel de Debug
Adicione ao seu componente:
```tsx
import CloakerDebug from './components/CloakerDebug';

<CloakerDebug />
```

O painel mostra:
- Layer atual
- Status do cookie
- Resultados de cada filtro
- Botões de teste rápido
- URLs de teste

### 2. URLs de Teste

**Forçar BLACK CONTENT (test mode)**:
```
http://localhost/?test=KBC4fEgoQIFGBlrk
```

**Simular tráfego do Facebook**:
```
http://localhost/?cat=Zkxidj6qY8JKKyK
```

**Combinar parâmetros**:
```
http://localhost/?cat=Zkxidj6qY8JKKyK&utm_source=facebook
```

### 3. Testando Manualmente

**Console do Browser**:
```javascript
// Ver layer atual
getUserLayerClient().then(console.log)

// Ver status dos filtros
console.log({
  mobile: isMobileDevice(),
  bot: isBotUserAgent(),
  language: getUserLanguage(),
  fbig: isFacebookOrInstagramBrowser(),
})
```

## 📊 Fluxo de Validação

```
Usuário acessa site
    ↓
[1] Tem ?test=senha? → SIM → BLACK CONTENT ✅
    ↓ NÃO
[2] User-Agent é bot? → SIM → WHITE CONTENT ⬜
    ↓ NÃO
[3] Tem cookie cat_valid? → NÃO → WHITE CONTENT ⬜
    ↓ SIM
[4] É mobile? → NÃO → WHITE CONTENT ⬜
    ↓ SIM
[5] Idioma bloqueado? → SIM → WHITE CONTENT ⬜
    ↓ NÃO
[6] É browser FB/IG? → NÃO → GRAY CONTENT 🔶
    ↓ SIM
[7] IP suspeito? → SIM → GRAY CONTENT 🔶
    ↓ NÃO
BLACK CONTENT ✅
```

## 🔑 Obtendo API Keys

### ProxyCheck.io
1. Acesse: https://proxycheck.io/
2. Criar conta grátis
3. Free tier: 1.000 queries/dia
4. Copie sua API key

### AbstractAPI
1. Acesse: https://www.abstractapi.com/ip-geolocation-api
2. Criar conta grátis
3. Free tier: 20.000 requests/mês
4. Copie sua API key

### IPInfo.io
1. Acesse: https://ipinfo.io/
2. Criar conta grátis
3. Free tier: 50.000 requests/mês
4. Copie seu token

## 🚀 Deploy em Produção

### Checklist:
- [ ] Trocar `FACEBOOK_PARAM_PASS` para senha única
- [ ] Trocar `LOCAL_TEST_PASS` para senha única
- [ ] Adicionar suas próprias API Keys
- [ ] **REMOVER** `<CloakerDebug />` de todos os componentes
- [ ] Verificar se `DEBUG: false` em produção
- [ ] Testar com device mobile real
- [ ] Testar com tráfego do Facebook real

### Variáveis de Ambiente (opcional)
```env
VITE_FACEBOOK_PASS=sua-senha
VITE_TEST_PASS=sua-senha-teste
VITE_PROXYCHECK_KEY=sua-key
VITE_ABSTRACT_KEY=sua-key
VITE_IPINFO_KEY=sua-key
```

## 🎨 Customização

### Desabilitar Verificação de IP (mais rápido)
```typescript
CHECK_SUSPICIOUS_IP: false
```

### Permitir Desktop
```typescript
REQUIRE_MOBILE: false
```

### Desabilitar Filtro de Browser FB/IG
```typescript
REQUIRE_FBIG_BROWSER: false
```

### Adicionar Mais Países Bloqueados
```typescript
BLOCKED_COUNTRIES: ['US', 'RU', 'KP', 'IR', 'CN', 'UK']
```

## 📝 Arquivos do Sistema

```
src/
├── utils/
│   ├── cloakerConfig.ts      # Configuração central
│   ├── cloaker.ts             # Funções de cookie e init
│   ├── getUserLayer.ts        # Lógica principal de validação
│   ├── browseDetector.ts      # Detectores de device/browser
│   └── IPChecker.ts           # Validação de IP
├── components/
│   ├── MainFlow.tsx           # Roteador principal
│   ├── WhiteContent.tsx       # Layer 1
│   ├── GrayContent.tsx        # Layer 2
│   ├── BlackContent.tsx       # Layer 3
│   └── CloakerDebug.tsx       # Painel de debug
```

## 🐛 Troubleshooting

### Problema: Sempre mostra WHITE CONTENT

**Soluções**:
1. Verifique se o cookie `cat_valid` está sendo criado
2. Use `?test=senha` para bypassar filtros e identificar o problema
3. Abra o painel de debug e veja qual filtro está bloqueando
4. Verifique o console do browser (se DEBUG=true)

### Problema: IP check muito lento

**Soluções**:
1. Desabilite `CHECK_SUSPICIOUS_IP: false`
2. Use apenas 1 ou 2 APIs ao invés de 3
3. Implemente cache de IPs já verificados

### Problema: Não detecta Facebook browser

**Soluções**:
1. Verifique se está usando o in-app browser do FB (não o Chrome/Safari)
2. Verifique se os parâmetros `fbclid` estão na URL
3. Reduza o threshold do score no `browseDetector.ts`

## 📈 Performance

### Tempos Médios:
- **Sem IP check**: ~50-100ms
- **Com IP check**: ~1-3 segundos (3 APIs em paralelo)

### Otimizações:
1. Use `getUserLayerSync()` para render imediato (sem IP check)
2. Faça IP check em background e atualize se necessário
3. Implemente cache de resultados de IP
4. Use service worker para pré-validação

## 🔒 Segurança

### Boas Práticas:
- ✅ Use senhas fortes e únicas para `FACEBOOK_PARAM_PASS`
- ✅ Mude as senhas regularmente
- ✅ Monitore logs de acesso para padrões suspeitos
- ✅ Use HTTPS em produção
- ✅ Considere rate limiting por IP
- ⚠️ **NUNCA** commite API keys em repositórios públicos
- ⚠️ **REMOVA** CloakerDebug em produção

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique esta documentação
2. Ative o modo DEBUG e analise os logs
3. Use o painel CloakerDebug para diagnosticar
4. Consulte a documentação das APIs de IP

---

**Versão**: 2.0  
**Última atualização**: 2026-02-08  
**Compatível com**: React 18+, Vite 4+
