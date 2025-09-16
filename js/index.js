const carouselTexts = document.getElementById("carousel-texts");
const texts = Array.from(carouselTexts.querySelectorAll(".text-home-brothers"));
const carouselImage = document.getElementById("carousel-image");

// Função para detectar o índice mais próximo
function getActiveIndex() {
  const scroll = carouselTexts.scrollLeft;
  const itemWidth = texts[0].offsetWidth + 10; // 10 = gap
  return Math.round(scroll / itemWidth);
}

// Atualiza imagem com fade
let lastIndex = -1;
function updateImage() {
  const index = getActiveIndex();
  if (index !== lastIndex) {
    lastIndex = index;
    const activeText = texts[index] || texts[0];
    carouselImage.classList.add("fade-out");
    setTimeout(() => {
      carouselImage.src = activeText.dataset.img;
      carouselImage.classList.remove("fade-out");
    }, 100);
  }
}

// Detecta scroll contínuo
carouselTexts.addEventListener("scroll", () => {
  updateImage();
});

 
// ===== NOVO: autoplay com loop =====
let autoPlayIndex = 0;
const itemWidth = texts[0].offsetWidth + 10; // mesmo cálculo do scroll

setInterval(() => {
  autoPlayIndex++;

  if (autoPlayIndex >= texts.length) {
    autoPlayIndex = 0; // volta para o primeiro
    // PULA direto para o início, sem animar o caminho de volta
    carouselTexts.scrollLeft = 0;
  } else {
    // faz scroll suave normalmente
    carouselTexts.scrollTo({
      left: autoPlayIndex * itemWidth,
      behavior: "smooth"
    });
  }

  updateImage();
}, 13000); // muda a cada 3 segundos

