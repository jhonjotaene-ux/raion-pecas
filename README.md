# ⚡ RaiOn Peças Elétricas Online

Site de vendas online especializado em **peças automotivas elétricas**, com foco em bobinas de ignição, velas, baterias, bombas de combustível, sensores, lâmpadas e muito mais.

---

## ✅ Funcionalidades Implementadas

### 🔎 Busca Inteligente
- **Buscar por Placa** — suporte aos formatos antigo (ABC-1234) e Mercosul (ABC1D23), com validação em tempo real
- **Buscar por Chassis/VIN** — validação de 17 caracteres, exibe resultados compatíveis

### 🚗 Seletor de Marca de Veículo
- FIAT, FORD, GM-Chevrolet, VW-Volkswagen, Importados
- **Troca de tema de cor** ao clicar em cada marca (CSS custom properties via JavaScript)
- Botão "Ver Todas as Marcas" para resetar filtro

### 🎠 Banner / Carrossel Hero
- 3 slides animados com efeitos de relâmpago
- Autoplay a cada 5,5 segundos
- Controles por botões, dots e swipe touch (mobile)

### 🛒 Carrinho de Compras
- Adicionar / remover produtos
- Persistência via localStorage
- Mini cart lateral com overlay

### ⏱️ Countdown de Ofertas
- Timer regressivo até o fim do dia (atualizado a cada segundo)

### 📦 Seções Completas
- Top bar com contato, redes sociais e botões Login/Cadastro
- Navegação com dropdown de categorias
- Seletor de marcas de veículos (FIAT, FORD, GM, VW, Importados)
- Grid de categorias de peças (8 categorias)
- Seção de marcas premium (Philips, Osram, Bosch, NGK, Denso, Magneti Marelli, Importada)
- Seção de ofertas especiais com 6 produtos e badges de desconto
- Seção "Por que escolher a RaiOn?" (4 diferenciais)
- Formulário de contato e newsletter
- Footer completo (links, pagamentos, redes sociais, CNPJ)

### 💬 Elementos Flutuantes
- Botão WhatsApp flutuante
- Botão "Voltar ao topo"
- Toast notifications (sucesso/erro/info)
- Modais de login e cadastro

### 🎨 Efeitos Visuais
- Tema dark/neon com paleta extraída do logo (azul elétrico + laranja/ouro)
- Animações: glow pulsante, relâmpago, float, shimmer, badge pulse, fire flicker
- Intersection Observer para entrada animada dos cards
- Responsive: mobile, tablet e desktop
- Hamburger menu para mobile

---

## 🗂️ Estrutura de Arquivos

```
index.html          → Página principal completa
css/
  style.css         → Estilos completos (CSS variables, animações, responsivo)
js/
  main.js           → JavaScript principal (todos os módulos)
README.md           → Documentação
```

---

## 🎨 Paleta de Cores

| Cor | Valor |
|-----|-------|
| Background principal | `#050816` |
| Background secundário | `#0D1B33` |
| Background card | `#0A1628` |
| Azul elétrico | `#1E8BFF` |
| Ciano brilhante | `#66DFFF` |
| Laranja/ouro | `#FF9900` |
| Âmbar | `#FFC84A` |
| Texto chrome | `#E6ECF5` |

---

## 🚀 Funcionalidades Pendentes / Próximos Passos

- [ ] Conectar com backend real ou API de busca de placa (ex.: FIPE, SinBio)
- [ ] Sistema de autenticação real (login/cadastro com banco de dados)
- [ ] Página de produto individual com galeria de fotos e especificações técnicas
- [ ] Sistema de pagamento integrado (Mercado Pago, PagSeguro, Stripe)
- [ ] Painel administrativo para gerenciar produtos, estoque e pedidos
- [ ] Busca com autocomplete e filtros avançados (preço, marca, compatibilidade)
- [ ] Integração com WhatsApp Business API para rastreamento de pedidos
- [ ] SEO avançado: sitemap.xml, schema.org (Product, Organization)
- [ ] PWA (Progressive Web App) com suporte offline
- [ ] Avaliações e comentários de clientes
- [ ] Rastreamento de pedidos em tempo real
- [ ] Múltiplas fotos reais de produtos
- [ ] Carrinho multicanal (sincronizado entre dispositivos)

---

## 📱 Responsividade

| Breakpoint | Layout |
|-----------|--------|
| Desktop (≥1100px) | Layout completo com busca no header |
| Tablet (900px–1100px) | Menu hamburger, busca no header compacta |
| Mobile (≤900px) | Menu lateral deslizante, carrossel touch, layout coluna única |

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** semântico com meta SEO
- **CSS3** com Custom Properties, Grid, Flexbox, Animations
- **JavaScript** ES6+ (vanilla, sem frameworks)
- **Google Fonts**: Orbitron, Rajdhani, Inter
- **Font Awesome 6.4** via CDN (ícones)
- **localStorage** para persistência do carrinho
- **IntersectionObserver** para animações de entrada

---

## 📞 Contato da Loja

- WhatsApp: (00) 00000-0000
- Email: contato@raionpecas.com.br
- CNPJ: 00.000.000/0001-00

---

*© 2025 RaiOn Peças Elétricas Online — Todos os direitos reservados*
