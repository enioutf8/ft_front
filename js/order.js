const MAX_QUANTITY = 5; // Limite máximo de unidades

// Seleciona todos os controles de quantidade
const controls = document.querySelectorAll(".quantity-control");

controls.forEach((control) => {
  const decreaseBtn = control.querySelector(".decrease");
  const increaseBtn = control.querySelector(".increase");
  const quantityInput = control.querySelector(".quantity");

  decreaseBtn.addEventListener("click", () => {
    let current = parseInt(quantityInput.value) || 1;
    if (current > 1) quantityInput.value = current - 1;
  });

  increaseBtn.addEventListener("click", () => {
    let current = parseInt(quantityInput.value) || 1;
    if (current < MAX_QUANTITY) {
      quantityInput.value = current + 1;
    } else {
      alert(`Quantidade máxima permitida: ${MAX_QUANTITY}`);
    }
  });
});
