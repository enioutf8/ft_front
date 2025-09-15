document.addEventListener("DOMContentLoaded", () => {
  const mainPhoto = document.querySelector(".main-photo");
  const thumbnails = document.querySelectorAll(".thumbnail-photo");

  // Define a primeira thumbnail como ativa por padrão
  if (thumbnails.length > 0) {
    thumbnails[0].classList.add("active");
    mainPhoto.src = thumbnails[0].src;
  }

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // Troca a imagem principal
      mainPhoto.src = thumbnail.src;

      // Remove a classe active de todas e adiciona à clicada
      thumbnails.forEach((t) => t.classList.remove("active"));
      thumbnail.classList.add("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const thumbnailItems = document.querySelectorAll(".thumbnail-item");

  thumbnailItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove a classe active de todos
      thumbnailItems.forEach((i) => i.classList.remove("active"));
      // Adiciona a classe active ao clicado
      item.classList.add("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const colorItems = document.querySelectorAll(".thumbnail-item-color");

  colorItems.forEach((item, index) => {
    // Se quiser, deixa a primeira selecionada por padrão
    if (index === 0) item.classList.add("active");

    item.addEventListener("click", () => {
      // Remove active de todos
      colorItems.forEach((i) => i.classList.remove("active"));
      // Adiciona active ao clicado
      item.classList.add("active");
    });
  });
});
