/* ===================================================
   RAION PEÇAS ELÉTRICAS ONLINE — MAIN JAVASCRIPT
   =================================================== */

'use strict';

/* ===== CART STATE ===== */
let cart = JSON.parse(localStorage.getItem('raion_cart') || '[]');

/* ===== CAROUSEL STATE ===== */
let currentSlide = 0;
const totalSlides = 3;
let carouselInterval = null;

/* ===== BRAND STATE ===== */
let currentBrand = null;

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', function () {
  initCarousel();
  initCountdown();
  updateCartUI();
  initScrollEffects();
  setupNavOverlay();
});

/* ========================================================
   1. CAROUSEL / BANNER
   ======================================================== */
function initCarousel() {
  goToSlide(0);
  startCarouselAutoPlay();
}

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  applySlide();
  resetCarouselAutoPlay();
}

function goToSlide(index) {
  currentSlide = index;
  applySlide();
}

function applySlide() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');

  slides.forEach((s, i) => {
    s.classList.toggle('active', i === currentSlide);
    s.style.display = i === currentSlide ? 'flex' : 'none';
  });

  dots.forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

function startCarouselAutoPlay() {
  carouselInterval = setInterval(() => {
    changeSlide(1);
  }, 5500);
}

function resetCarouselAutoPlay() {
  clearInterval(carouselInterval);
  startCarouselAutoPlay();
}

/* ========================================================
   2. SEARCH — PLACA / CHASSIS
   ======================================================== */
function switchSearchTab(tab) {
  document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.search-tab[data-tab="${tab}"]`).classList.add('active');

  document.querySelectorAll('.search-pane').forEach(p => p.classList.remove('active'));
  document.getElementById(`pane-${tab}`).classList.add('active');

  setSearchHint('');
}

function formatPlaca(input) {
  let val = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');

  // Formato: ABC1234 ou ABC1D23 (Mercosul)
  if (val.length > 7) val = val.substring(0, 7);

  // Inserir hífen após 3 caracteres
  if (val.length > 3) {
    val = val.substring(0, 3) + '-' + val.substring(3);
  }

  input.value = val;
  validatePlaca(val.replace('-', ''));
}

function validatePlaca(val) {
  const oldFormat = /^[A-Z]{3}[0-9]{4}$/;
  const mercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

  if (val.length === 0) {
    setSearchHint('');
  } else if (val.length < 7) {
    setSearchHint('Continue digitando a placa...', 'neutral');
  } else if (oldFormat.test(val)) {
    setSearchHint('✓ Placa no formato antigo detectada', 'success');
  } else if (mercosul.test(val)) {
    setSearchHint('✓ Placa Mercosul detectada', 'success');
  } else {
    setSearchHint('✗ Formato inválido. Use: ABC-1234 ou ABC1D23', 'error');
  }
}

function formatChassis(input) {
  let val = input.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
  if (val.length > 17) val = val.substring(0, 17);
  input.value = val;
  validateChassis(val);
}

function validateChassis(val) {
  if (val.length === 0) {
    setSearchHint('');
  } else if (val.length < 17) {
    setSearchHint(`Chassis: ${val.length}/17 caracteres`, 'neutral');
  } else if (val.length === 17) {
    setSearchHint('✓ Chassis válido! Clique em Buscar', 'success');
  }
}

function setSearchHint(msg, type = 'neutral') {
  const hint = document.getElementById('search-hint');
  hint.textContent = msg;
  hint.className = 'search-hint';
  if (type === 'success') hint.classList.add('success');
  if (type === 'error') hint.classList.add('error');
}

function doSearch() {
  const activeTab = document.querySelector('.search-tab.active').dataset.tab;

  if (activeTab === 'placa') {
    const placa = document.getElementById('input-placa').value.replace('-', '');
    if (!placa) {
      showToast('Por favor, digite a placa do veículo.', 'error');
      return;
    }
    if (placa.length < 7) {
      showToast('Placa incompleta. Verifique e tente novamente.', 'error');
      return;
    }
    performSearch('placa', placa);
  } else {
    const chassis = document.getElementById('input-chassis').value;
    if (!chassis) {
      showToast('Por favor, digite o chassis do veículo.', 'error');
      return;
    }
    if (chassis.length < 17) {
      showToast('Chassis deve ter 17 caracteres.', 'error');
      return;
    }
    performSearch('chassis', chassis);
  }
}

function performSearch(type, value) {
  // Simula busca de peças compatíveis
  const label = type === 'placa' ? `Placa: ${value.substring(0,3)}-${value.substring(3)}` : `Chassis: ${value}`;

  const mockResults = getMockSearchResults(type, value);
  showSearchResults(label, mockResults);
}

function getMockSearchResults(type, value) {
  const sampleProducts = [
    { icon: '⚡', name: 'Bobina de Ignição Original', compat: 'Compatível com seu veículo', price: 'R$ 129,90' },
    { icon: '🔥', name: 'Jogo de Velas NGK Iridium', compat: 'Compatível com seu veículo', price: 'R$ 89,90' },
    { icon: '📡', name: 'Sensor de Oxigênio (Lambda)', compat: 'Compatível com seu veículo', price: 'R$ 139,90' },
    { icon: '💡', name: 'Kit Lâmpada Farol H7 LED', compat: 'Compatível com seu veículo', price: 'R$ 119,90' },
    { icon: '⚙️', name: 'Módulo de Ignição', compat: 'Compatível com seu veículo', price: 'R$ 199,90' },
    { icon: '💧', name: 'Bomba de Combustível Elétrica', compat: 'Compatível com seu veículo', price: 'R$ 179,90' },
  ];
  return sampleProducts;
}

function showSearchResults(label, results) {
  const overlay = document.getElementById('search-results-overlay');
  const title = document.getElementById('search-results-title');
  const content = document.getElementById('search-results-content');

  title.textContent = `🔍 Peças Encontradas — ${label}`;
  content.innerHTML = '';

  if (results.length === 0) {
    content.innerHTML = '<p style="color: var(--muted); text-align:center; padding: 2rem;">Nenhum resultado encontrado. Tente com outra placa.</p>';
  } else {
    results.forEach(r => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      item.innerHTML = `
        <div class="result-icon">${r.icon}</div>
        <div class="result-info">
          <div class="result-name">${r.name}</div>
          <div class="result-compat">${r.compat}</div>
        </div>
        <div class="result-price">${r.price}</div>
        <button class="btn-add-cart" onclick="addToCart('${r.name}', parseFloat('${r.price}'.replace('R$ ','').replace(',','.')))" style="padding: 6px 14px; font-size: 0.78rem; white-space:nowrap;">
          <i class="fas fa-cart-plus"></i> Comprar
        </button>
      `;
      content.appendChild(item);
    });
  }

  overlay.style.display = 'flex';
}

function closeSearchResults() {
  document.getElementById('search-results-overlay').style.display = 'none';
}

/* ========================================================
   3. VEHICLE BRAND SELECTOR + COLOR SWITCHER
   ======================================================== */
function selectBrand(card) {
  // Remove seleção anterior
  document.querySelectorAll('.brand-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');

  const brand = card.dataset.brand;
  const color = card.dataset.color;
  const color2 = card.dataset.color2;

  // Remove classes de marca anteriores
  document.body.className = document.body.className.replace(/brand-\w+/g, '').trim();
  document.body.classList.add(`brand-${brand}`);

  // Aplica CSS custom properties globalmente
  document.documentElement.style.setProperty('--brand-accent', color);
  document.documentElement.style.setProperty('--brand-accent-2', color2);
  document.documentElement.style.setProperty('--brand-glow', hexToRgba(color, 0.3));

  currentBrand = brand;

  // Atualiza info de marca selecionada
  const names = { fiat: 'FIAT', ford: 'FORD', gm: 'GM - CHEVROLET', vw: 'VW - VOLKSWAGEN', importados: 'IMPORTADOS' };
  const info = document.getElementById('brand-selected-info');
  info.textContent = `⚡ Mostrando peças para: ${names[brand] || brand}`;

  showToast(`Filtrando peças para ${names[brand] || brand}`, 'success');
}

function resetBrand() {
  document.querySelectorAll('.brand-card').forEach(c => c.classList.remove('selected'));
  document.body.className = document.body.className.replace(/brand-\w+/g, '').trim();
  document.documentElement.style.setProperty('--brand-accent', '#1E8BFF');
  document.documentElement.style.setProperty('--brand-accent-2', '#66DFFF');
  document.documentElement.style.setProperty('--brand-glow', 'rgba(30, 139, 255, 0.3)');
  currentBrand = null;
  document.getElementById('brand-selected-info').textContent = '';
  showToast('Mostrando todas as marcas', 'info');
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ========================================================
   4. CATEGORY & BRAND FILTER
   ======================================================== */
function filterCategory(cat) {
  const names = {
    bobina: 'Bobina de Ignição',
    velas: 'Velas de Ignição',
    baterias: 'Baterias',
    bomba: 'Bomba de Combustível',
    sensores: 'Sensores',
    lampadas: 'Lâmpadas',
    modulos: 'Módulos',
    chicotes: 'Chicotes Elétricos',
    alternadores: 'Alternadores',
    partida: 'Motores de Partida'
  };

  showToast(`Filtrando: ${names[cat] || cat}`, 'info');

  // Scroll até a seção de categorias
  document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });

  // Highlight the matching category card
  document.querySelectorAll('.category-card').forEach(card => {
    const match = card.dataset.cat === cat;
    card.style.borderColor = match ? 'var(--brand-accent)' : '';
    card.style.boxShadow = match ? '0 0 20px var(--brand-glow)' : '';
    if (match) {
      setTimeout(() => {
        card.style.borderColor = '';
        card.style.boxShadow = '';
      }, 3000);
    }
  });

  return false;
}

function filterBrand(brand) {
  const names = {
    philips: 'Philips',
    osram: 'Osram',
    bosch: 'Bosch',
    ngk: 'NGK',
    denso: 'Denso',
    magneti: 'Magneti Marelli',
    importada: 'Importada/Genérica'
  };

  showToast(`Filtrando produtos: ${names[brand] || brand}`, 'info');
  document.getElementById('offers-section').scrollIntoView({ behavior: 'smooth' });
  return false;
}

/* ========================================================
   5. CART
   ======================================================== */
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: Date.now(), name, price, qty: 1, icon: getProductIcon(name) });
  }
  saveCart();
  updateCartUI();
  showToast(`"${name}" adicionado ao carrinho!`, 'success');
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
  showToast('Item removido do carrinho.', 'info');
}

function saveCart() {
  localStorage.setItem('raion_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  document.getElementById('cart-count').textContent = count;

  const itemsContainer = document.getElementById('mini-cart-items');
  const footer = document.getElementById('mini-cart-footer');

  if (cart.length === 0) {
    itemsContainer.innerHTML = '<p class="empty-cart-msg">Seu carrinho está vazio 🛒</p>';
    footer.style.display = 'none';
  } else {
    itemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.qty;
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <div class="cart-item-icon">${item.icon}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">R$ ${(item.price).toFixed(2).replace('.', ',')} × ${item.qty}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remover">
          <i class="fas fa-times"></i>
        </button>
      `;
      itemsContainer.appendChild(el);
    });

    document.getElementById('cart-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    footer.style.display = 'block';
  }
}

function getProductIcon(name) {
  const lc = name.toLowerCase();
  if (lc.includes('bobina')) return '⚡';
  if (lc.includes('vela') || lc.includes('velas')) return '🔥';
  if (lc.includes('bateria')) return '🔋';
  if (lc.includes('bomba')) return '💧';
  if (lc.includes('sensor') || lc.includes('lambda')) return '📡';
  if (lc.includes('lâmpada') || lc.includes('led') || lc.includes('farol')) return '💡';
  if (lc.includes('módulo')) return '🖥️';
  if (lc.includes('alternador')) return '⚙️';
  return '🔌';
}

function toggleCart(event) {
  if (event) event.preventDefault();
  const miniCart = document.getElementById('mini-cart');
  const overlay = document.getElementById('cart-overlay');
  miniCart.classList.toggle('open');
  overlay.classList.toggle('visible');
}

/* ========================================================
   6. COUNTDOWN TIMER
   ======================================================== */
function initCountdown() {
  // Definir fim da oferta: 23h59 do dia atual
  const now = new Date();
  const endTime = new Date(now);
  endTime.setHours(23, 59, 59, 0);

  if (now > endTime) {
    endTime.setDate(endTime.getDate() + 1);
  }

  function updateTimer() {
    const remaining = endTime - new Date();
    if (remaining <= 0) {
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent = '00';
      document.getElementById('cd-secs').textContent = '00';
      return;
    }
    const h = Math.floor(remaining / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    const s = Math.floor((remaining % 60000) / 1000);
    document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ========================================================
   7. SCROLL EFFECTS
   ======================================================== */
function initScrollEffects() {
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ========================================================
   8. NAVIGATION (MOBILE)
   ======================================================== */
function toggleMenu() {
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('hamburger');
  nav.classList.toggle('open');
  hamburger.classList.toggle('open');
}

function setupNavOverlay() {
  // Fechar menu ao clicar em link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('main-nav').classList.remove('open');
      document.getElementById('hamburger').classList.remove('open');
    });
  });
}

/* ========================================================
   9. MODALS
   ======================================================== */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function closeModalOutside(event, id) {
  if (event.target.id === id) {
    closeModal(id);
  }
}

function switchModal(closeId, openId) {
  closeModal(closeId);
  setTimeout(() => openModal(openId), 200);
}

function doLogin(event) {
  event.preventDefault();
  closeModal('loginModal');
  showToast('Login realizado com sucesso! Bem-vindo(a)!', 'success');
}

function doRegister(event) {
  event.preventDefault();
  closeModal('registerModal');
  showToast('Cadastro realizado! Verifique seu e-mail.', 'success');
}

/* ========================================================
   10. NEWSLETTER
   ======================================================== */
function subscribeNewsletter(event) {
  event.preventDefault();
  event.target.reset();
  showToast('✅ Cadastro realizado! Você receberá nossas ofertas.', 'success');
}

/* ========================================================
   11. TOAST NOTIFICATION
   ======================================================== */
let toastTimeout = null;

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toast-msg');
  const icon = document.getElementById('toast-icon');

  msg.textContent = message;
  toast.className = 'toast';

  if (type === 'success') {
    toast.classList.add('success');
    icon.className = 'fas fa-check-circle';
  } else if (type === 'error') {
    toast.classList.add('error');
    icon.className = 'fas fa-times-circle';
  } else {
    toast.classList.add('info');
    icon.className = 'fas fa-info-circle';
  }

  toast.classList.add('visible');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3500);
}

/* ========================================================
   12. KEYBOARD SHORTCUTS
   ======================================================== */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal('loginModal');
    closeModal('registerModal');
    closeSearchResults();
    document.getElementById('search-results-overlay').style.display = 'none';
    if (document.getElementById('mini-cart').classList.contains('open')) {
      toggleCart(null);
    }
  }
});

/* ========================================================
   13. SEARCH INPUT — Enter key support
   ======================================================== */
document.addEventListener('DOMContentLoaded', function () {
  ['input-placa', 'input-chassis'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') doSearch();
      });
    }
  });
});

/* ========================================================
   14. ANIMATED ENTRY FOR CARDS (Intersection Observer)
   ======================================================== */
document.addEventListener('DOMContentLoaded', function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatableElements = document.querySelectorAll(
    '.category-card, .offer-card, .why-card, .brand-card, .brand-badge'
  );

  animatableElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    observer.observe(el);
  });
});

/* ========================================================
   15. CAROUSEL TOUCH SUPPORT
   ======================================================== */
(function () {
  let touchStartX = 0;
  let touchEndX = 0;

  const banner = document.getElementById('hero-banner');
  if (!banner) return;

  banner.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  banner.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      changeSlide(diff > 0 ? 1 : -1);
    }
  }, { passive: true });
})();

/* ========================================================
   16. SMOOTH SCROLL FOR ANCHOR LINKS
   ======================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
