document.addEventListener("DOMContentLoaded", function () {
  const elementos = document.querySelectorAll(".animar-ao-scroll");
  const observer = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          obs.unobserve(entrada.target); // se quiser que a animação só rode uma vez
        }
      });
    },
    {
      threshold: 0.5, // quando 50% do elemento estiver visível
    }
  );

  elementos.forEach((el) => {
    observer.observe(el);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const elementos = document.querySelectorAll(".animar-ao-scroll");

  // Observer para animação ao scroll
  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
        } else {
          entrada.target.classList.remove("visivel");
        }
      });
    },
    {
      threshold: 0.5, // dispara quando 50% do produto aparece
    }
  );

  elementos.forEach((el) => observer.observe(el));

  // Adiciona clique para rolar direto para o elemento
  elementos.forEach((el) => {
    el.addEventListener("click", () => {
      el.scrollIntoView({
        behavior: "smooth", // animação suave
        block: "center", // centraliza o elemento na tela
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const products = document.querySelectorAll(".brand");
  const gap = 20; // margem entre produtos
  let index = 0;
  let isHovered = false;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  const intervalTime = 2000;

  function updateSlide() {
    currentTranslate = -index * (products[0].offsetWidth + gap);
    prevTranslate = currentTranslate;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  // Loop automático
  setInterval(() => {
    if (!isHovered && !isDragging) {
      index = (index + 1) % products.length;
      updateSlide();
    }
  }, intervalTime);

  // Pausa ao hover
  track.addEventListener("mouseenter", () => (isHovered = true));
  track.addEventListener("mouseleave", () => (isHovered = false));

  // Arrastar mouse
  track.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    track.style.transition = "none";
    track.style.cursor = "grabbing";
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.pageX - startX;
    currentTranslate = prevTranslate + dx;
    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  track.addEventListener("mouseup", (e) => finishDrag(e.pageX));
  track.addEventListener("mouseleave", (e) => {
    if (isDragging) finishDrag(e.pageX);
  });

  // Touch events
  track.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    track.style.transition = "none";
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].pageX - startX;
    currentTranslate = prevTranslate + dx;
    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  track.addEventListener("touchend", (e) =>
    finishDrag(e.changedTouches[0].pageX)
  );

  // Finaliza arraste
  function finishDrag(endX) {
    isDragging = false;
    track.style.cursor = "grab";
    const dx = endX - startX;
    const movedIndex = Math.round(
      -(prevTranslate + dx) / (products[0].offsetWidth + gap)
    );
    index = Math.min(Math.max(movedIndex, 0), products.length - 1);
    updateSlide();
  }
});
