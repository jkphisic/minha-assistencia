// CONFIGURE ESTES DADOS ANTES DE PUBLICAR
// WhatsApp no formato internacional: 55 + DDD + número, somente dígitos.
const WHATSAPP_NUMBER = "55DDNUMEROAQUI";
const WHATSAPP_MESSAGE = "Olá! Gostaria de solicitar um orçamento com a Digital Fone.";
const STORE_ADDRESS = "Adicionar endereço completo da loja, Nova Aurora - PR";
const BUSINESS_HOURS = "Adicionar horário de atendimento";

// Links do WhatsApp
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
document.querySelectorAll(".whatsapp-link").forEach(link => link.href = whatsappUrl);

// Endereço e mapa — atualizar com o endereço real
document.querySelector("[data-address]").textContent = STORE_ADDRESS;
document.querySelector("[data-hours]").textContent = BUSINESS_HOURS;
const mapQuery = encodeURIComponent(STORE_ADDRESS);
document.querySelector("#map-link").href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
// Atualize também o src do iframe no index.html com o endereço confirmado.

document.querySelector("#year").textContent = new Date().getFullYear();

// Menu para telas pequenas
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  menuButton.textContent = isOpen ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}));

// Slider automático com controles manuais
const slides = [...document.querySelectorAll(".slide")];
const dots = [...document.querySelectorAll(".dot")];
let currentSlide = 0;
let sliderTimer;
function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("active", i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
  document.querySelector(".slider-caption span").textContent = `0${currentSlide + 1} — 0${slides.length}`;
}
function restartSlider() {
  clearInterval(sliderTimer);
  sliderTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
}
document.querySelector(".prev").addEventListener("click", () => { showSlide(currentSlide - 1); restartSlider(); });
document.querySelector(".next").addEventListener("click", () => { showSlide(currentSlide + 1); restartSlider(); });
dots.forEach((dot, i) => dot.addEventListener("click", () => { showSlide(i); restartSlider(); }));
restartSlider();

// Entrada suave das seções conforme a rolagem
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".section-top,.section-heading,.device-card,.repair-area,.store-layout,.map-frame,.payment-content").forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});
