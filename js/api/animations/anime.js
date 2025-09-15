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
 