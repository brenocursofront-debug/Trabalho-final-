"use strict";

/* ==========================================================
   Cardápio de restaurante: lógica
   Os dados vêm de data.js (RESTAURANT e MENU). Normalmente
   você NÃO precisa editar este arquivo.
   ========================================================== */

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: RESTAURANT.currency || "BRL",
});

/* Remove acentos e põe em minúsculas, para a busca ignorar "é" x "e" */
const normalize = (text) =>
  String(text).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/* Imagem de reserva: aparece se a foto ainda não estiver na pasta "images" */
const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#EFE8DD"/>
      <circle cx="200" cy="150" r="62" fill="none" stroke="#C9BDAA" stroke-width="6"/>
      <circle cx="200" cy="150" r="38" fill="none" stroke="#C9BDAA" stroke-width="4"/>
      <path d="M96 118v64M84 118v24a12 12 0 0 0 24 0v-24M304 118c-14 8-20 26-20 44h20v20" fill="none" stroke="#C9BDAA" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  );

document.addEventListener(
  "error",
  (event) => {
    const img = event.target;
    if (img instanceof HTMLImageElement && img.src !== PLACEHOLDER) {
      if (img.id === "hero-image") {
        img.hidden = true; // o hero continua bonito só com o fundo escuro
      } else {
        img.src = PLACEHOLDER;
      }
    }
  },
  true // "error" não borbulha, então escutamos na fase de captura
);

/* ---------- Estado ---------- */
const state = { query: "", tags: new Set() };

/* ---------- Informações do restaurante ---------- */
function bindRestaurantInfo() {
  $$("[data-bind]").forEach((el) => {
    const value = RESTAURANT[el.dataset.bind];
    if (value) el.textContent = value;
  });

  document.title = `${RESTAURANT.name} | Cardápio`;
  $("#hero-image").src = RESTAURANT.heroImage;
  $("#about-image").src = RESTAURANT.aboutImage;
  $("#year").textContent = new Date().getFullYear();

  const whatsapp = $("#whatsapp");
  if (RESTAURANT.whatsapp) {
    whatsapp.href = `https://wa.me/${RESTAURANT.whatsapp}`;
    whatsapp.hidden = false;
  }
}

/* ---------- Filtros ---------- */
function allTags() {
  const tags = new Set();
  MENU.forEach((cat) => cat.items.forEach((item) => (item.tags || []).forEach((t) => tags.add(t))));
  return [...tags];
}

function renderChips() {
  const list = $("#chips");
  list.innerHTML = "";

  allTags().forEach((tag) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chip";
    button.textContent = tag;
    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", () => {
      const active = !state.tags.has(tag);
      active ? state.tags.add(tag) : state.tags.delete(tag);
      button.setAttribute("aria-pressed", String(active));
      renderMenu();
    });

    li.append(button);
    list.append(li);
  });
}

function matches(item) {
  const text = normalize(`${item.name} ${item.description} ${(item.tags || []).join(" ")}`);
  const okQuery = !state.query || text.includes(normalize(state.query));
  const okTags = [...state.tags].every((tag) => (item.tags || []).includes(tag));
  return okQuery && okTags;
}

$("#search").addEventListener("input", (event) => {
  state.query = event.target.value.trim();
  renderMenu();
});

/* ---------- Cardápio ---------- */
function createDish(item, index) {
  const li = document.createElement("li");
  li.className = "reveal";
  li.style.setProperty("--delay", `${(index % 4) * 0.08}s`);

  const article = document.createElement("article");
  article.className = "dish";

  const figure = document.createElement("figure");
  figure.className = "dish__media";
  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.name;
  img.loading = "lazy";
  img.width = 640;
  img.height = 480;
  figure.append(img);

  const body = document.createElement("div");
  body.className = "dish__body";

  const title = document.createElement("h4");
  title.className = "dish__title";
  const open = document.createElement("button");
  open.type = "button";
  open.className = "dish__open";
  open.textContent = item.name;
  open.addEventListener("click", () => openDialog(item));
  title.append(open);

  const desc = document.createElement("p");
  desc.className = "dish__desc";
  desc.textContent = item.description;

  const price = document.createElement("p");
  price.className = "dish__price";
  price.textContent = money.format(item.price);

  body.append(title, createTags(item.tags), desc, price);
  article.append(figure, body);
  li.append(article);
  return li;
}

function createTags(tags = []) {
  const ul = document.createElement("ul");
  ul.className = "tags";
  tags.forEach((tag) => {
    const li = document.createElement("li");
    li.className = `tag${tag === "picante" ? " tag--picante" : ""}`;
    li.textContent = tag;
    ul.append(li);
  });
  return ul;
}

function renderMenu() {
  const container = $("#menu-sections");
  container.innerHTML = "";
  let total = 0;
  const visibleCategories = [];

  MENU.forEach((category) => {
    const items = category.items.filter(matches);
    if (!items.length) return;

    total += items.length;
    visibleCategories.push(category);

    const section = document.createElement("section");
    section.className = "menu-section";
    section.id = category.id;
    section.setAttribute("aria-labelledby", `${category.id}-titulo`);

    const head = document.createElement("header");
    head.className = "menu-section__head reveal";
    head.innerHTML = `<h3 id="${category.id}-titulo"></h3><p></p>`;
    $("h3", head).textContent = category.title;
    $("p", head).textContent = category.description || "";

    const list = document.createElement("ul");
    list.className = "dishes";
    items.forEach((item, index) => list.append(createDish(item, index)));

    section.append(head, list);
    container.append(section);
  });

  $("#empty").hidden = total > 0;
  renderCategoryNav(visibleCategories);
  observeReveal();
  setupScrollSpy();
}

/* ---------- Navegação por categorias + scrollspy ---------- */
function renderCategoryNav(categories) {
  const list = $("#catnav-list");
  list.innerHTML = "";

  categories.forEach((category) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${category.id}`;
    link.textContent = category.title;
    link.dataset.target = category.id;
    li.append(link);
    list.append(li);
  });
}

let spyObserver = null;

function setupScrollSpy() {
  if (spyObserver) spyObserver.disconnect();
  if (!("IntersectionObserver" in window)) return;

  spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const list = $("#catnav-list");

        $$("#catnav-list a").forEach((link) => {
          const isActive = link.dataset.target === entry.target.id;

          if (!isActive) {
            link.removeAttribute("aria-current");
            return;
          }

          if (link.getAttribute("aria-current") === "true") return; // já está ativo

          link.setAttribute("aria-current", "true");

          /* Centraliza o botão rolando SÓ a barra na horizontal.
             (scrollIntoView também rolaria a página e causava o "travar e voltar") */
          list.scrollTo({
            left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2,
            behavior: "smooth",
          });
        });
      });
    },
    { rootMargin: "-35% 0px -60% 0px" }
  );

  $$(".menu-section").forEach((section) => spyObserver.observe(section));
}

/* ---------- Animação de entrada ao rolar ---------- */
let revealObserver = null;

function observeReveal() {
  const elements = $$(".reveal:not(.is-visible)");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
  }

  elements.forEach((el) => revealObserver.observe(el));
}

/* ---------- Janela de detalhes do prato ---------- */
const dialog = $("#dish-dialog");

function openDialog(item) {
  const img = $("#dialog-image");
  img.src = item.image;
  img.alt = item.name;

  $("#dialog-title").textContent = item.name;
  $("#dialog-desc").textContent = item.description;
  $("#dialog-details").textContent = item.details || "";
  $("#dialog-price").textContent = money.format(item.price);

  const tags = $("#dialog-tags");
  tags.replaceWith(Object.assign(createTags(item.tags), { id: "dialog-tags" }));

  dialog.showModal();
}

$("#dialog-close").addEventListener("click", () => dialog.close());

/* Clicar fora do cartão também fecha */
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

/* ---------- Início ---------- */
bindRestaurantInfo();
renderChips();
renderMenu();
observeReveal();
