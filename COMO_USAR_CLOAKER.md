# 🎯 Como Usar o Cloaker - Guia Rápido

## Para Anúncios do Facebook

### 1️⃣ Configure sua URL de anúncio assim:

```
https://seudominio.com/?cat=Zkxidj6qY8JKKyK
```

**O que vai acontecer:**
- ✅ Usuário clica no anúncio do Facebook
- ✅ Sistema valida o parâmetro `cat`
- ✅ Cria cookie de validação (72 horas)
- ✅ Remove o parâmetro da URL
- ✅ Mostra o app completo (BLACK CONTENT)

### 2️⃣ Usuário sem o parâmetro correto vê:

```
https://seudominio.com/
```

- ❌ Sem cookie válido
- ❌ Mostra WHITE CONTENT (página genérica)
- ❌ Protege seu conteúdo de bots e revisores

## 🧪 Para Testar no Desenvolvimento

### Opção 1: Adicionar o parâmetro na URL

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse com o parâmetro cat
http://localhost:5173/?cat=Zkxidj6qY8JKKyK
```

### Opção 2: Usar o CloakerDebug (Recomendado)

Adicione o componente de debug ao seu `App.tsx`:

```tsx
import CloakerDebug from './components/CloakerDebug';

function App() {
  return (
    <>
      <MainFlow />
      {/* Adicione isso apenas em desenvolvimento */}
      {import.meta.env.DEV && <CloakerDebug />}
    </>
  );
}
```

Agora você terá um botão 🔍 no canto inferior direito que permite:
- Ver o layer atual
- Ver o status do cookie
- Alternar entre WHITE e BLACK content
- Testar URL de validação

### Opção 3: Console do Navegador

```javascript
// Para ativar BLACK CONTENT
document.cookie = "cat_valid=1; expires=" + new Date(Date.now() + 72*60*60*1000).toUTCString() + "; path=/";
location.reload();

// Para desativar (voltar para WHITE)
document.cookie = "cat_valid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
location.reload();
```

## 📊 Verificar se está funcionando

### Console do navegador mostrará:

```
Cloaker: cat parameter validated and cookie set
User layer determined: 3 - BLACK CONTENT - Premium/Full Experience
```

### No DevTools > Application > Cookies:

```
Name: cat_valid
Value: 1
Expires: (3 dias a partir de agora)
```

## 🎨 Conteúdo de Cada Layer

### Layer 1 - WHITE CONTENT
- `src/components/WhiteContent.tsx`
- Página genérica e segura
- Para bots, revisores, visitantes não autorizados
- ⚠️ **Edite este arquivo para sua página "safe"**

### Layer 2 - GRAY CONTENT
- `src/components/GrayContent.tsx`
- Conteúdo intermediário
- Para A/B tests ou rollout gradual
- (Atualmente não está sendo usado)

### Layer 3 - BLACK CONTENT
- `src/components/BlackContent.tsx`
- **Seu app completo da loteria**
- Mostrado apenas com cookie válido

## 🔐 Alterar a Senha (Parâmetro)

Edite `src/utils/cloaker.ts`:

```typescript
const FACEBOOK_PARAM_PASS = 'SuaNovaSenhaAqui123';
```

**Importante:** Use uma senha forte e única!

## ⚙️ Configurações Adicionais

### Alterar duração do cookie

Em `src/utils/cloaker.ts`:

```typescript
const COOKIE_DURATION_HOURS = 72; // Padrão: 3 dias
```

### Adicionar mais lógica de validação

Em `src/utils/getUserLayer.ts`, adicione mais verificações:

```typescript
export function getUserLayer(): UserLayer {
  const hasValidCookie = hasValidCloakerCookie();
  
  if (hasValidCookie) {
    return 3; // BLACK CONTENT
  }
  
  // Detectar bots pelo user agent
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('bot') || userAgent.includes('crawler')) {
    return 1; // WHITE CONTENT
  }
  
  // Verificar referrer do Facebook
  if (document.referrer.includes('facebook.com')) {
    return 2; // GRAY CONTENT
  }
  
  return 1; // WHITE CONTENT (padrão)
}
```

## 🚀 Deploy em Produção

1. **Build do projeto:**
```bash
npm run build
```

2. **Configure sua URL de anúncio:**
```
https://seudominio.com/?cat=Zkxidj6qY8JKKyK&utm_source=facebook&utm_campaign=teste
```

3. **Teste antes de publicar:**
   - Acesse sem o parâmetro `cat` → Deve ver WHITE CONTENT
   - Acesse com o parâmetro `cat` → Deve ver BLACK CONTENT
   - Cookie deve persistir por 3 dias

## ⚠️ Checklist de Segurança

- [ ] Senha do parâmetro `cat` é única e forte
- [ ] WHITE CONTENT é genérico e compliance
- [ ] BLACK CONTENT só aparece com cookie válido
- [ ] Teste em navegador anônimo
- [ ] Verifique se cookie persiste após fechar o navegador
- [ ] Use HTTPS em produção

## 🐛 Problemas Comuns

### "Sempre mostra WHITE CONTENT"
- Verifique se o parâmetro `cat` está correto
- Veja o console: deve aparecer "Cloaker: cat parameter validated"
- Verifique cookies no DevTools

### "Cookie não persiste"
- Verifique se está usando HTTPS em produção
- Alguns navegadores bloqueiam cookies de terceiros

### "Erro de build"
- Execute `npm install`
- Limpe cache: `rm -rf node_modules/.vite`
- Tente novamente: `npm run build`

## 📞 Dúvidas?

- Leia o `CLOAKER_README.md` para documentação completa
- Verifique logs no console do navegador
- Use o `CloakerDebug` para testar
