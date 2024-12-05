let docRef = document.getElementById("item-content");

function getPizzaTemplate(blockIndex) {
  // multiply price x amount
  let totalPrice =
    pizzas[blockIndex].amount * parseFloat(pizzas[blockIndex].price);

  // return html block to function to add in other functions
  return `<div class="item-title"><h3>${pizzas[blockIndex].title}</h3></div>
                <div class="item-infos">
                    <button onclick="amountDown(${blockIndex})" class="button-down"><div class="hoverEffect"><div></div></div></button>
                    <p id="amount-${blockIndex}">x${
    pizzas[blockIndex].amount
  }</p>
                    <button onclick="amountUp(${blockIndex})" class="button-up"><div class="hoverEffect"><div></div></div></button>
                    <p id="price-${blockIndex}">${totalPrice.toFixed(2)}€</p>
                    <button onclick="deletePizza(${blockIndex})" class="button-remove"><div class="hoverEffect"><div></div></div></button>
                </div>`;
}

function addPizzaToBasket(blockIndex) {
  if (pizzas[blockIndex].amount === 0) {
    pizzas[blockIndex].amount += 1;
    docRef.innerHTML += getPizzaTemplate(blockIndex);
  } else {
    amountUp(blockIndex);
  }

  renderBasket();
}

function updatePizzaDisplay(blockIndex) {
  let amountElement = document.getElementById(`amount-${blockIndex}`);
  let priceElement = document.getElementById(`price-${blockIndex}`);
  let totalPrice =
    pizzas[blockIndex].amount * parseFloat(pizzas[blockIndex].price);

  amountElement.innerText = pizzas[blockIndex].amount;
  priceElement.innerText = totalPrice.toFixed(2);
}

function amountUp(blockIndex) {
  pizzas[blockIndex].amount += 1;
  updatePizzaDisplay(blockIndex);
  renderBasket();
}

function amountDown(blockIndex) {
  if (pizzas[blockIndex].amount > 1) {
    pizzas[blockIndex].amount -= 1;
    updatePizzaDisplay(blockIndex);
  } else {
    deletePizza(blockIndex);
  }

  renderBasket();
}

function deletePizza(blockIndex) {
  pizzas[blockIndex].amount = 0; // reset amount
  let pizzaElement = document.getElementById(`pizza-${blockIndex}`);

  if (pizzaElement) {
    pizzaElement.remove(); // remove pizza block with index
  }

  renderBasket();
}

// calculation Sum
function calcSum() {
  let sum = 5;

  for (let i = 0; i < pizzas.length; i++) {
    sum += pizzas[i].amount * parseFloat(pizzas[i].price);
  }

  return sum.toFixed(2);
}

function getSumTemplate(sum) {
  return `<div class="basket-sum"><div><p>subtotal:</p><p>delivery:</p><h3>total:</h3></div>
                                                <div><p>0.00 €</p><p>5.00 €</p><h3>${sum} €</h3></div></div>
                                                <div class="order-section">
                                                    <button onclick="resetBasket()" class="button-order">
                                                        Order now
                                                    </button>
                                                    <div>
                                                        <img id="pay" src="./images/icons/paypal-logo.png" alt="">
                                                        <img id="pay" src="./images/icons/geld.png" alt="">
                                                        <img id="pay" src="./images/icons/symbole.png" alt="">
                                                    </div>
                                                </div>
                                            </div>`;
}

function renderSum() {
  let sum = calcSum();
  let sumTemplate = getSumTemplate(sum);

  docRef.innerHTML += sumTemplate;
}

function renderBasket() {
  docRef.innerHTML = "";

  for (let i = 0; i < pizzas.length; i++) {
    if (pizzas[i].amount > 0) {
      docRef.innerHTML += getPizzaTemplate(i);
    }
  }

  renderSum();
}

//reset all

function returnFeedback() {
  return ` 
    <div class="notifications-container">
      <div class="success">
        <div class="flex">
          <div class="flex-shrink-0">
            
            <svg class="succes-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="success-prompt-wrap">
            <p class="success-prompt-heading">Order completed!</p>
            <div class="success-prompt-prompt">
              <p>You're happy now? Does this impulsive action really satisfy you? Don't answer me, answer yourself. Anyway, your party-size pizza combo with extra cheese dip is on its way.</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function resetBasket() {
  let feedback = returnFeedback();
  docRef.innerHTML = "";
  docRef.innerHTML = feedback;
}

/* Burger Overlay Toggle */

function toggleOverlay(event) {
  let overlayRef = document.getElementById(`side-track`);

  overlayRef.classList.toggle("d_none");

  event.stopPropagation();
}
