/* =========================================================
   TAP NOVA STUDIO — main.js
   -----------------------------------------------------------
   CONFIGURACIÓN RÁPIDA
   Cambia aquí el número de WhatsApp y tus redes sociales.
   No necesitas tocar nada más en este archivo para eso.
   ========================================================= */

// 1) NÚMERO DE WHATSAPP
// Formato: código de país + número, SIN espacios, SIN "+", SIN guiones.
// Ejemplo México: "5216671234567" (52 + 1 + número a 10 dígitos)
const WHATSAPP_NUMBER = "XXXXXXXXXX"; // <-- REEMPLAZAR AQUÍ

// 2) MENSAJE POR DEFECTO cuando un botón no especifica uno propio
const WHATSAPP_DEFAULT_MESSAGE = "Hola Tap Nova, me interesa conocer sus soluciones para mi negocio.";

// 3) REDES SOCIALES — reemplaza estas URLs por las reales de Tap Nova Studio
const SOCIAL_LINKS = {
  instagram: "https://instagram.com/tapnova.studio", // <-- REEMPLAZAR AQUÍ
  facebook: "https://facebook.com/tapnova.studio",   // <-- REEMPLAZAR AQUÍ
  tiktok: "https://tiktok.com/@tapnova.studio",       // <-- REEMPLAZAR AQUÍ
};

/* =========================================================
   No hace falta editar nada debajo de esta línea.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  setupWhatsAppLinks();
  setupSocialLinks();
  setupMobileNav();
  renderExamplesGrid();
  renderIndustriesGrid();
  renderFaq();
  setupPrivacyModal();
  setupTapDemo();
  setupScrollReveal();
});

/* ---------- WhatsApp links ---------- */
function buildWhatsAppUrl(message) {
  const text = encodeURIComponent(message || WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function setupWhatsAppLinks() {
  document.querySelectorAll(".wa-link").forEach((el) => {
    const customMessage = el.getAttribute("data-msg");
    el.setAttribute("href", buildWhatsAppUrl(customMessage));
  });

  const headerBtn = document.getElementById("wa-header-btn");
  if (headerBtn) headerBtn.setAttribute("href", buildWhatsAppUrl());
}

/* ---------- Social links ---------- */
function setupSocialLinks() {
  const map = {
    "social-instagram": SOCIAL_LINKS.instagram,
    "social-facebook": SOCIAL_LINKS.facebook,
    "social-tiktok": SOCIAL_LINKS.tiktok,
    "social-whatsapp": buildWhatsAppUrl(),
  };
  Object.entries(map).forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute("href", url);
  });
}

/* ---------- Mobile nav ---------- */
function setupMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-mobile");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Icons (inline SVG strings, reused across grids) ---------- */
const ICONS = {
  whatsapp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16v16H4z"/><path d="M9 9h6v6H9z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>`,
  reviews: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m12 2 3 6 6 .9-4.5 4.3 1.1 6-5.6-3-5.6 3 1.1-6L3 8.9 9 8l3-6Z"/></svg>`,
  catalog: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4h16v16H4z"/><path d="M4 9h16M9 9v11"/></svg>`,
  promo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 12a8 8 0 1 1-3-6.2"/><path d="M20 5v5h-5"/></svg>`,
  landing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg>`,
};

/* ---------- TAP -> Experiencia examples grid ---------- */
const TAP_EXAMPLES = [
  { label: "WhatsApp", icon: ICONS.whatsapp },
  { label: "Menú digital", icon: ICONS.menu },
  { label: "Instagram", icon: ICONS.instagram },
  { label: "Google Reviews", icon: ICONS.reviews },
  { label: "Catálogo", icon: ICONS.catalog },
  { label: "Promoción", icon: ICONS.promo },
  { label: "Landing Page", icon: ICONS.landing },
];

function renderExamplesGrid() {
  const grid = document.getElementById("examples-grid");
  if (!grid) return;
  grid.innerHTML = TAP_EXAMPLES.map(
    (item) => `
    <div class="example-card">
      <div class="example-card__icon">${item.icon}</div>
      <span>TAP → ${item.label}</span>
    </div>`
  ).join("");
}

/* ---------- Industries grid ---------- */
const INDUSTRIES = [
  { icon: "☕", name: "Cafeterías", desc: "Pon un TAP en tu vaso y lleva al cliente directo a tu menú, Instagram, promoción o programa de lealtad." },
  { icon: "🍔", name: "Restaurantes", desc: "Convierte cada mesa en un punto de interacción." },
  { icon: "💈", name: "Barberías", desc: "Facilita reservas, WhatsApp y redes sociales." },
  { icon: "🏋️", name: "Gimnasios", desc: "Conecta a tus miembros con clases, promociones y contacto directo." },
  { icon: "🏨", name: "Hoteles", desc: "Da acceso rápido a servicios, wifi, reseñas y recomendaciones." },
  { icon: "🛍️", name: "Tiendas", desc: "Lleva al cliente de un producto físico a tu catálogo o promoción." },
  { icon: "🏫", name: "Escuelas", desc: "Facilita el contacto en artículos personales, cuidando la privacidad." },
  { icon: "🚗", name: "Movilidad eléctrica", desc: "Suma carga para vehículos eléctricos como parte de tu experiencia." },
];

function renderIndustriesGrid() {
  const grid = document.getElementById("industries-grid");
  if (!grid) return;
  grid.innerHTML = INDUSTRIES.map(
    (item) => `
    <div class="industry-card">
      <div class="industry-card__icon" aria-hidden="true">${item.icon}</div>
      <h4>${item.name}</h4>
      <p>${item.desc}</p>
    </div>`
  ).join("");
}

/* ---------- FAQ ---------- */
const FAQ_ITEMS = [
  { q: "¿Qué teléfonos funcionan con NFC?", a: "La gran mayoría de los teléfonos Android e iPhone (desde iPhone 7) traen NFC activado de fábrica. No se necesita ningún accesorio adicional." },
  { q: "¿Necesito descargar una aplicación?", a: "No. El cliente solo acerca su teléfono y la experiencia se abre automáticamente en el navegador." },
  { q: "¿Puedo cambiar el contenido después?", a: "Sí. El destino del TAP puede actualizarse cuando lo necesites, sin cambiar el sticker físico." },
  { q: "¿Puedo usar NFC para WhatsApp?", a: "Sí, es uno de los usos más comunes: un TAP abre directamente un chat de WhatsApp con tu negocio." },
  { q: "¿Puedo poner NFC en vasos?", a: "Sí. Es una de nuestras soluciones más populares para cafeterías y restaurantes." },
  { q: "¿Puedo utilizar NFC en una tarjeta de presentación?", a: "Sí. Tu tarjeta puede compartir tu contacto, redes o portafolio con un solo TAP." },
  { q: "¿La información personal queda expuesta?", a: "No. Diseñamos cada experiencia pensando en privacidad primero, especialmente en soluciones para familias y escuelas." },
  { q: "¿Pueden crearme una landing page?", a: "Sí, es parte de nuestros planes Tap Business y Tap Experience." },
  { q: "¿También trabajan con cargadores para vehículos eléctricos?", a: "Sí, a través de Tap Charge Network, nuestra solución de carga eléctrica para negocios." },
];

function renderFaq() {
  const list = document.getElementById("faq-list");
  if (!list) return;

  list.innerHTML = FAQ_ITEMS.map(
    (item, i) => `
    <div class="faq-item" data-index="${i}">
      <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}">
        <span>${item.q}</span>
        <span class="faq-question__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </span>
      </button>
      <div class="faq-answer" id="faq-answer-${i}">
        <div class="faq-answer__inner">${item.a}</div>
      </div>
    </div>`
  ).join("");

  list.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Cierra los demás (acordeón de uno a la vez)
      list.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("is-open");
          openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          openItem.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("is-open");
        question.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* ---------- Privacy modal ---------- */
function setupPrivacyModal() {
  const openBtn = document.getElementById("open-privacy-modal");
  const closeBtn = document.getElementById("close-privacy-modal");
  const overlay = document.getElementById("privacy-modal");
  if (!openBtn || !overlay) return;

  const open = () => {
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
  });
}

/* ---------- Simulate TAP demo ---------- */
function setupTapDemo() {
  const btn = document.getElementById("simulate-tap-btn");
  const idle = document.getElementById("demo-idle");
  const result = document.getElementById("demo-result");
  const resetBtn = document.getElementById("demo-reset-btn");
  if (!btn || !idle || !result) return;

  btn.addEventListener("click", () => {
    idle.style.display = "none";
    result.classList.add("is-active");

    const items = result.querySelectorAll(".demo-result__btn");
    items.forEach((el, i) => {
      el.classList.remove("is-shown");
      el.style.animationDelay = `${i * 90}ms`;
      // Forzar reflow para reiniciar animación si se repite
      void el.offsetWidth;
      el.classList.add("is-shown");
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      result.classList.remove("is-active");
      idle.style.display = "flex";
    });
  }
}

/* ---------- Scroll reveal ---------- */
function setupScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}
