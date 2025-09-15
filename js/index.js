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
  if(index !== lastIndex) {
    lastIndex = index;
    const activeText = texts[index] || texts[0];
    carouselImage.classList.add("fade-out");
    setTimeout(() => {
      carouselImage.src = activeText.dataset.img;
      carouselImage.classList.remove("fade-out");
    }, 200);
  }
}

// Detecta scroll contínuo
carouselTexts.addEventListener("scroll", () => {
  updateImage();
});
