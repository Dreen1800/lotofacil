# Sistema de Cloaker - Vite

Sistema de cloaker adaptado do Next.js para funcionar no Vite com React.

## 🎯 Como Funciona

O sistema identifica diferentes tipos de usuários e mostra conteúdo diferente baseado em validação via parâmetro URL e cookie.

### Camadas de Conteúdo

1. **WHITE CONTENT (Layer 1)** - Conteúdo Básico/Seguro
   - Mostrado para bots, revisores, ou usuários sem cookie válido
   - Conteúdo genérico e compliance

2. **GRAY CONTENT (Layer 2)** - Conteúdo Intermediário
   - Pode ser usado para A/B testing
   - Rollout gradual de features

3. **BLACK CONTENT (Layer 3)** - Experiência Completa
   - Aplicativo completo da loteria
   - Mostrado apenas para usuários com cookie válido

## 🔑 Parâmetro de Validação

Para acessar o conteúdo completo (BLACK CONTENT), adicione o parâmetro `cat` na URL:

```
https://seudominio.com/?cat=Zkxidj6qY8JKKyK
```

### O que acontece:

1. Sistema detecta o parâmetro `cat` com o valor correto
2. Cria um cookie `cat_valid=1` com validade de 72 horas
3. Remove o parâmetro `cat` da URL automaticamente
4. Redireciona para a versão limpa da URL
5. Usuário vê o BLACK CONTENT (app completo)

## 📁 Estrutura de Arquivos

```
src/
├── utils/
│   ├── cloaker.ts           # Lógica principal do cloaker
│   └── getUserLayer.ts      # Determina qual layer mostrar
├── components/
│   ├── MainFlow.tsx         # Componente principal que gerencia layers
│   ├── WhiteContent.tsx     # Conteúdo safe (Layer 1)
│   ├── GrayContent.tsx      # Conteúdo intermediário (Layer 2)
│   └── BlackContent.tsx     # Conteúdo completo (Layer 3)
└── App.tsx                  # Entry point que usa MainFlow
```

## 🔧 Configuração

### Alterar o parâmetro de validação

Em `src/utils/cloaker.ts`:

```typescript
const FACEBOOK_PARAM_PASS = 'SuaSenhaAqui';
```

### Alterar duração do cookie

Em `src/utils/cloaker.ts`:

```typescript
const COOKIE_DURATION_HOURS = 72; // 3 dias
```

## 🚀 Como Usar

### Para Tráfego do Facebook Ads

1. Configure seus anúncios com o parâmetro `cat`:
   ```
   https://seudominio.com/?cat=Zkxidj6qY8JKKyK&utm_source=facebook
   ```

2. O sistema automaticamente:
   - Valida o usuário
   - Cria o cookie
   - Limpa a URL
   - Mostra o conteúdo completo

### Para Testes

**Testar WHITE CONTENT:**
```
https://seudominio.com/
```

**Testar BLACK CONTENT:**
```
https://seudominio.com/?cat=Zkxidj6qY8JKKyK
```

**Limpar cookie (voltar para WHITE):**
```javascript
// No console do navegador
document.cookie = "cat_valid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
location.reload();
```

## 📊 Logs e Debug

O sistema gera logs no console:

```javascript
// Quando o parâmetro é validado
"Cloaker: cat parameter validated and cookie set"

// Quando o layer é determinado
"User layer determined: 3 - BLACK CONTENT - Premium/Full Experience"
```

## 🔒 Segurança

- Cookie `cat_valid` é httpOnly: false (para JS access)
- Validade de 72 horas
- Validação no lado do cliente
- Parâmetro removido da URL após validação

## ⚙️ Extensões Futuras

Você pode adicionar mais lógica de detecção em `src/utils/getUserLayer.ts`:

```typescript
export function getUserLayer(): UserLayer {
  const hasValidCookie = hasValidCloakerCookie();
  
  if (hasValidCookie) {
    return 3; // BLACK CONTENT
  }
  
  // Adicione mais validações:
  // - Detectar bots pelo user agent
  // - Verificar referrer
  // - Verificar geolocalização
  // - Verificar fingerprint
  
  return 1; // WHITE CONTENT
}
```

## 🎨 Customizar Conteúdo

### White Content
Edite `src/components/WhiteContent.tsx` para mostrar conteúdo genérico e seguro.

### Gray Content
Edite `src/components/GrayContent.tsx` para versões intermediárias.

### Black Content
O `BlackContent.tsx` já está configurado para mostrar o app completo da loteria.

## 📝 Notas Importantes

1. **Diferença do Next.js**: No Next.js o middleware roda no servidor. No Vite, tudo roda no cliente.
2. **Cookie**: É setado via JavaScript no navegador, não via HTTP headers.
3. **SEO**: Bots vão ver sempre o WHITE CONTENT (a não ser que venham com o parâmetro cat).
4. **Performance**: Há um pequeno delay (~100ms) para verificar cookies antes de renderizar.

## 🧪 Testes

```bash
# Desenvolvimento local
npm run dev

# Build de produção
npm run build

# Preview da build
npm run preview
```

## ⚠️ Importante

- Nunca commite o parâmetro `cat` em código público
- Mantenha o valor da senha seguro
- Use HTTPS em produção para proteger cookies
- Teste bem antes de usar em produção
