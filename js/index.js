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
      behavior: "smooth",
    });
  }

  updateImage();
}, 13000); // muda a cada 3 segundos


// Desktop

document.addEventListener("DOMContentLoaded", () => {
  // Renomeie os IDs para evitar conflito com outros componentes
  const institutionalCarousel = document.getElementById("institutional-texts");
  const texts = Array.from(
    institutionalCarousel.querySelectorAll("p.institucional-description")
  );
  const imageElement = document.getElementById("institutional-carousel-image");

  // Certifique-se de que a imagem e os textos existem
  if (!institutionalCarousel || !imageElement || texts.length === 0) {
    return;
  }

  let currentIndex = 0;
  const intervalTime = 13000; // Tempo em milissegundos para a transição (13 segundos)

  // Esconde todos os textos, exceto o primeiro
  texts.forEach((text, index) => {
    if (index !== 0) {
      text.style.display = "none";
    }
  });

  function showNextItem() {
    // Esconde o texto atual
    texts[currentIndex].style.display = "none";

    // Atualiza para o próximo índice
    currentIndex = (currentIndex + 1) % texts.length;
    const nextText = texts[currentIndex];

    // Muda a imagem com efeito de fade
    imageElement.classList.add("fade-out");
    setTimeout(() => {
      imageElement.src = nextText.dataset.img;
      imageElement.classList.remove("fade-out");
    }, 100);

    // Exibe o novo texto
    nextText.style.display = "block";
  }

  // Inicia o carrossel automático
  setInterval(showNextItem, intervalTime);
});
