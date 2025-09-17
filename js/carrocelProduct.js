// Seleciona todos os carrosséis da página
const carousels = document.querySelectorAll(".carousel-container");

carousels.forEach((carousel) => {
  const list = carousel.querySelector(".product-list");
  const items = carousel.querySelectorAll(".product-item");
  const prev = carousel.querySelector(".carousel-arrow.left");
  const next = carousel.querySelector(".carousel-arrow.right");

  // VERIFICAÇÃO ADICIONADA: Se não houver itens, para a execução para este carrossel
  if (items.length === 0) {
    return;
  }

  // Clona os itens para o efeito de loop infinito
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    list.appendChild(clone);
  });

  const itemWidth = items[0].offsetWidth;
  let scrollPosition = 0;

  // Função para rolagem automática
  function autoNext() {
    scrollPosition += itemWidth;
    list.scrollTo({ left: scrollPosition, behavior: "smooth" });

    // Quando chega na metade (onde os clones começam), reinicia sem animação
    if (scrollPosition >= list.scrollWidth / 2) {
      setTimeout(() => {
        scrollPosition = 0;
        list.scrollTo({ left: scrollPosition, behavior: "auto" });
      }, 300); // espera terminar o scroll suave
    }
  }

  // Event listeners para os botões manuais
  prev.addEventListener("click", () => {
    scrollPosition -= itemWidth;
    // Se a posição for negativa, vai para o final da primeira cópia dos itens
    if (scrollPosition < 0) {
      scrollPosition = list.scrollWidth / 2 - itemWidth;
    }
    list.scrollTo({ left: scrollPosition, behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    scrollPosition += itemWidth;
    // Se a posição for maior que a metade, volta para o início
    if (scrollPosition >= list.scrollWidth / 2) {
      scrollPosition = 0;
    }
    list.scrollTo({ left: scrollPosition, behavior: "smooth" });
  });

  // Auto play
  let autoScroll = setInterval(autoNext, 5000);

  // Pausa no hover
  list.addEventListener("mouseenter", () => clearInterval(autoScroll));
  list.addEventListener("mouseleave", () => {
    autoScroll = setInterval(autoNext, 3000);
  });
});

let isDown = false;
let startX;
let scrollLeft;

// Início do drag (mouse ou touch)
list.addEventListener("mousedown", (e) => {
  isDown = true;
  list.classList.add("dragging");
  startX = e.pageX - list.offsetLeft;
  scrollLeft = list.scrollLeft;
  clearInterval(autoScroll); // pausa autoplay durante drag
});

list.addEventListener("touchstart", (e) => {
  isDown = true;
  startX = e.touches[0].pageX - list.offsetLeft;
  scrollLeft = list.scrollLeft;
  clearInterval(autoScroll);
});

// Durante o drag
list.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - list.offsetLeft;
  const walk = (x - startX) * 1; // multiplicador de velocidade
  list.scrollLeft = scrollLeft - walk;
});

list.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX - list.offsetLeft;
  const walk = (x - startX) * 1;
  list.scrollLeft = scrollLeft - walk;
});

// Fim do drag
list.addEventListener("mouseup", () => {
  isDown = false;
  list.classList.remove("dragging");
  startAutoScroll(); // retoma autoplay
});

list.addEventListener("mouseleave", () => {
  isDown = false;
  list.classList.remove("dragging");
  startAutoScroll();
});

list.addEventListener("touchend", () => {
  isDown = false;
  startAutoScroll();
});
