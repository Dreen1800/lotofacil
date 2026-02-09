# ⚡ Teste Rápido do Sistema de Cloaker

## 🎯 Checklist de Validação

### ✅ Fase 1: Verificação Básica (5 min)

**1. Instalar e Rodar**
```bash
cd /Users/mac/Direct\ Response/Scale/lotofacil
npm install
npm run dev
```

**2. Testar Test Mode**
- Abra: `http://localhost:5173/?test=KBC4fEgoQIFGBlrk`
- ✅ **Esperado**: BLACK CONTENT (Quiz Lotofácil)
- ✅ **Console**: "🧪 TEST MODE: Bypassing all filters → BLACK CONTENT"

**3. Testar Sem Parâmetros**
- Abra: `http://localhost:5173/`
- ✅ **Esperado**: WHITE CONTENT (Portal de Espiritualidade)
- ✅ **Console**: "❌ NO VALID COOKIE → WHITE CONTENT"

**4. Testar Cat Parameter**
- Abra: `http://localhost:5173/?cat=Zkxidj6qY8JKKyK`
- ✅ **Esperado**: Cria cookie e redireciona
- ✅ **Console**: "Cloaker: cat parameter validated and cookie set"
- ⚠️ **Atenção**: Pode mostrar GRAY ou WHITE dependendo dos outros filtros

---

### ✅ Fase 2: Teste do Debug Panel (3 min)

**1. Adicionar Debug ao App**
```tsx
// src/App.tsx ou onde MainFlow é chamado
import CloakerDebug from './components/CloakerDebug';

<>
  <MainFlow />
  <CloakerDebug />  {/* Adicione aqui */}
</>
```

**2. Abrir Painel**
- Clique no botão 🔍 no canto inferior direito
- ✅ **Esperado**: Painel de debug abre

**3. Verificar Status**
- ✅ Layer atual mostrado
- ✅ Cookie status (null ou 1)
- ✅ Filtros status:
  - Bot Detection
  - Device (Mobile/Desktop)
  - Language
  - FB/IG Browser

**4. Testar Mudança de Layer**
- Clique em "🤖 White" → deve recarregar com WHITE CONTENT
- Clique em "✅ Black" → deve recarregar com BLACK CONTENT

**5. Testar Test Mode Button**
- Clique em "🧪 Ativar Test Mode"
- ✅ **Esperado**: URL adiciona `?test=...` e mostra BLACK CONTENT

---

### ✅ Fase 3: Validação de Filtros (10 min)

**1. Bot Detection**
```javascript
// Console do browser
import { isBotUserAgent } from './utils/browseDetector';
console.log('Is Bot?', isBotUserAgent());
```
✅ **Esperado**: `false` (em browser normal)

**2. Mobile Detection**
```javascript
import { isMobileDevice } from './utils/browseDetector';
console.log('Is Mobile?', isMobileDevice());
```
✅ **Esperado**: `true` em mobile, `false` em desktop

**3. Language Detection**
```javascript
import { getUserLanguage } from './utils/browseDetector';
console.log('Language:', getUserLanguage());
```
✅ **Esperado**: `pt-br` ou similar

**4. FB/IG Browser Detection**
```javascript
import { isFacebookOrInstagramBrowser } from './utils/browseDetector';
console.log('FB/IG?', isFacebookOrInstagramBrowser());
```
✅ **Esperado**: `{ isFBIG: false, score: 0, reasons: [...] }` (em browser normal)

**5. Cookie Validation**
```javascript
import { getCookie, hasValidCloakerCookie } from './utils/cloaker';
console.log('Cookie:', getCookie('cat_valid'));
console.log('Valid?', hasValidCloakerCookie());
```
✅ **Esperado**: Ver status do cookie

---

### ✅ Fase 4: Teste de Fluxo Completo (5 min)

**Cenário: Simular Usuário do Facebook**

**Passo 1**: Limpar tudo
```javascript
// Console
document.cookie = "cat_valid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
location.reload();
```

**Passo 2**: Acessar com cat parameter
```
http://localhost:5173/?cat=Zkxidj6qY8JKKyK
```

**Passo 3**: Verificar
- ✅ Cookie criado? (DevTools > Application > Cookies > cat_valid)
- ✅ Parameter removido da URL?
- ✅ Qual layer foi mostrado?

**Passo 4**: Recarregar página
```
http://localhost:5173/
```
- ✅ Mantém o mesmo layer? (cookie persiste)

**Passo 5**: Limpar cookie e testar
```javascript
// Console
document.cookie = "cat_valid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
location.reload();
```
- ✅ Volta para WHITE CONTENT?

---

### ✅ Fase 5: Teste de Configurações (5 min)

**1. Desabilitar Mobile Check**
```typescript
// src/utils/cloakerConfig.ts
REQUIRE_MOBILE: false,
```
- ✅ Desktop agora passa para BLACK?

**2. Desabilitar FB/IG Check**
```typescript
REQUIRE_FBIG_BROWSER: false,
```
- ✅ Browsers normais agora passam?

**3. Desabilitar IP Check**
```typescript
CHECK_SUSPICIOUS_IP: false,
```
- ✅ Load time diminuiu?

**4. Trocar Default Layer**
```typescript
DEFAULT_LAYER: 2,
```
- ✅ Fallback agora é GRAY CONTENT?

---

### ✅ Fase 6: Teste de Performance (3 min)

**1. Sem IP Check**
```typescript
CHECK_SUSPICIOUS_IP: false,
```
- ✅ Timing: ~50-100ms

**2. Com IP Check**
```typescript
CHECK_SUSPICIOUS_IP: true,
```
- ✅ Timing: ~1-3 segundos

**Medir no console**:
```javascript
console.time('layer-detection');
getUserLayerClient().then(() => console.timeEnd('layer-detection'));
```

---

### ✅ Fase 7: Teste em Device Real (Mobile)

**Setup**:
1. Abra o projeto na rede local
2. Configure firewall/porta
3. Acesse de um celular

**Ou use Chrome DevTools**:
1. F12 > Toggle Device Toolbar (Ctrl+Shift+M)
2. Selecione iPhone ou Android
3. Recarregue página

**Verificar**:
- ✅ `isMobileDevice()` retorna `true`?
- ✅ Se REQUIRE_MOBILE=true, passa para BLACK?

---

## 🚨 Problemas Comuns

### "Sempre mostra WHITE CONTENT"

**Debug**:
```javascript
// Console
import { getUserLayerSync } from './utils/getUserLayer';
const result = getUserLayerSync();
console.log('Layer:', result.layer);
console.log('Reason:', result.reason);
```

**Checklist**:
- [ ] Cookie foi criado? (`cat_valid=1`)
- [ ] Device é mobile? (ou REQUIRE_MOBILE=false)
- [ ] Browser é FB/IG? (ou REQUIRE_FBIG_BROWSER=false)
- [ ] Idioma permitido?

**Solução Rápida**: Use test mode
```
?test=KBC4fEgoQIFGBlrk
```

---

### "Load muito lento"

**Causa**: IP check com 3 APIs

**Solução 1**: Desabilitar
```typescript
CHECK_SUSPICIOUS_IP: false
```

**Solução 2**: Usar sync mode
```typescript
// getUserLayer.ts
const result = getUserLayerSync(); // Sem IP check
```

---

### "Debug panel não aparece"

**Checklist**:
- [ ] `<CloakerDebug />` foi adicionado?
- [ ] Import está correto?
- [ ] Botão 🔍 está visível? (canto inferior direito)

**Teste alternativo**: Debug manual
```javascript
// Console
import { getUserLayerClient } from './utils/getUserLayer';
getUserLayerClient().then(console.log);
```

---

### "Cookie não persiste"

**Possíveis causas**:
- Browser em modo privado
- Cookies desabilitados
- SameSite policy

**Debug**:
```javascript
// Console
document.cookie = "test=1; path=/; max-age=3600";
console.log(document.cookie); // Deve mostrar test=1
```

---

## 📊 Matriz de Resultados Esperados

| Condição | Layer Esperado | Motivo |
|----------|---------------|---------|
| `?test=senha` | 3 (BLACK) | Test mode bypass |
| `?cat=senha` + Mobile + FB/IG + PT | 3 (BLACK) | Tudo OK |
| `?cat=senha` + Desktop | 1 (WHITE) | Não é mobile |
| `?cat=senha` + Mobile + Chrome | 2 (GRAY) | Não é FB/IG |
| Sem parâmetros | 1 (WHITE) | Sem cookie |
| Bot user-agent | 1 (WHITE) | Bot detectado |
| Idioma EN | 1 (WHITE) | Idioma bloqueado |
| IP com VPN | 2 (GRAY) | IP suspeito |

---

## ✅ Checklist Final (Antes de Deploy)

### Configuração
- [ ] `FACEBOOK_PARAM_PASS` trocado para senha única
- [ ] `LOCAL_TEST_PASS` trocado para senha única
- [ ] API Keys configuradas (se usar IP check)
- [ ] `DEBUG: false` em produção
- [ ] `BLOCKED_COUNTRIES` configurado conforme necessário
- [ ] `BLOCKED_LANGUAGES` configurado conforme necessário

### Código
- [ ] `<CloakerDebug />` **REMOVIDO** de todos os componentes
- [ ] `console.log` de debug removidos (ou dentro de `if (DEBUG)`)
- [ ] WhiteContent.tsx tem conteúdo apropriado
- [ ] GrayContent.tsx tem conteúdo apropriado
- [ ] BlackContent.tsx tem conteúdo completo

### Testes
- [ ] Test mode funciona
- [ ] Cat parameter funciona
- [ ] Cookie persiste por 72h
- [ ] Filters funcionam corretamente
- [ ] Load time aceitável
- [ ] Mobile real testado
- [ ] Facebook real testado (se possível)

### Segurança
- [ ] Senhas não commitadas em repositório público
- [ ] API keys não expostas
- [ ] Rate limiting considerado
- [ ] Logs não expõem informações sensíveis

---

## 🎯 Teste de Integração Final

**1. Limpar tudo**
```bash
# Limpar build
rm -rf dist/
rm -rf node_modules/.vite/

# Reinstalar
npm install
```

**2. Build de produção**
```bash
npm run build
npm run preview
```

**3. Testar build**
- [ ] Test mode funciona
- [ ] Cat parameter funciona
- [ ] Debug mode desabilitado
- [ ] Performance OK

**4. Deploy**
```bash
# Seu comando de deploy
npm run deploy
# ou
vercel deploy
# ou
netlify deploy
```

**5. Testar em produção**
- [ ] URL com `?test=senha` funciona
- [ ] URL com `?cat=senha` funciona
- [ ] Sem parâmetros mostra WHITE
- [ ] Cookie persiste entre sessões

---

## 📞 Suporte

Se algo não funcionar:

1. **Ative DEBUG mode**
   ```typescript
   DEBUG: true
   ```

2. **Verifique console do browser** (F12)
   - Procure por erros
   - Verifique logs do cloaker

3. **Use CloakerDebug panel**
   - Veja status de cada filtro
   - Teste mudanças rápidas

4. **Teste com test mode**
   ```
   ?test=KBC4fEgoQIFGBlrk
   ```

5. **Consulte documentação**
   - `CLOAKER_SYSTEM.md`
   - `EXEMPLO_USO_CLOAKER.md`

---

**Tempo total estimado**: 30-40 minutos  
**Última atualização**: 2026-02-08
