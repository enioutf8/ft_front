document.addEventListener("DOMContentLoaded", () => {
  const primaryColunm = document.getElementById(
    "primary-carrocel-imagens-aboult"
  );
  const secondaryColunm = document.getElementById(
    "secondary-carrocel-imagens-aboult"
  );
  const thirdColunm = document.getElementById("third-carrocel-imagens-aboult");

  if (!primaryColunm || !secondaryColunm || !thirdColunm) {
    console.error("Um ou mais elementos do carrossel não foram encontrados.");
    return;
  }

  const imgsPrimary = ["DSC_03.jpg", "DSC_09.jpg", "DSC_12.jpg"];
  const imgsSecondary = [
    "DSC_06.jpg",
    "DSC_07.jpg",
    "DSC_08.jpg",
    "DSC_04.jpg",
  ];
  const imgsThird = ["DSC_02.jpg", "DSC_11.jpg", "DSC_10.jpg"];

  // Função para criar os elementos e anexar
  const applyImages = (container, imageArray) => {
    imageArray.forEach((imgContent) => {
      const divImage = document.createElement("div");
      divImage.innerHTML = `<div class="card-image"><img src="../imgs/about/${imgContent}"></div>`;
      container.appendChild(divImage);
    });

    // Clona os itens para o loop infinito
    const items = container.children;
    for (let i = 0; i < imageArray.length; i++) {
      const clone = items[i].cloneNode(true);
      container.appendChild(clone);
    }
  };

  applyImages(primaryColunm, imgsPrimary);
  applyImages(secondaryColunm, imgsSecondary);
  applyImages(thirdColunm, imgsThird);

  // Variáveis para controlar a animação
  let positions = {
    primary: 0,
    secondary: 0,
    third: 0,
  };

  // Velocidades de movimento (em pixels por frame)
  const speedPrimary = 0.5;
  const speedSecondary = 0.25;
  const speedThird = 0.5;

  // Função para animar cada carrossel
  const animateScroll = () => {
    const primaryScrollHeight = primaryColunm.scrollHeight / 2;
    const secondaryScrollHeight = secondaryColunm.scrollHeight / 2;
    const thirdScrollHeight = thirdColunm.scrollHeight / 2;

    // Animação da coluna primária
    positions.primary += speedPrimary;
    if (positions.primary >= primaryScrollHeight) {
      positions.primary = 0;
    }
    primaryColunm.scrollTop = positions.primary;

    // Animação da coluna secundária
    positions.secondary += speedSecondary;
    if (positions.secondary >= secondaryScrollHeight) {
      positions.secondary = 0;
    }
    secondaryColunm.scrollTop = positions.secondary;

    // Animação da coluna terciária
    positions.third += speedThird;
    if (positions.third >= thirdScrollHeight) {
      positions.third = 0;
    }
    thirdColunm.scrollTop = positions.third;

    requestAnimationFrame(animateScroll);
  };

  // Inicia a animação
  requestAnimationFrame(animateScroll);
});
