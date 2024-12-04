function renderBlock() {
  let contentRef = document.getElementById('render-pizza');
  contentRef.innerHTML = "";

  for (let blockIndex = 0; blockIndex < pizzas.length; blockIndex++) {
      contentRef.innerHTML += getBlockTemplate(blockIndex);
  }
}

function getBlockTemplate(blockIndex) {
  return `<div class="render-menu" id="render-menu-${blockIndex}">           
          <button onclick="addPizzaToBasket(${blockIndex})" class="add_icon"></button>
          <h2>${pizzas[blockIndex].title}</h2>
          <p>${pizzas[blockIndex].ingredients}</p>
          <h6>${pizzas[blockIndex].price.toFixed(2)} €</h6>
          </div>`;
}
