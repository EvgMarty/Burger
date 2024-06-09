// listen all window
window.addEventListener('click', (event) => {
  let counter;

  if (
    event.target.dataset.action == 'plus' ||
    event.target.dataset.action == 'minus'
  ) {
    const counterWrapper = event.target.closest('.product__counter-wrapper');
    counter = counterWrapper.querySelector('[data-counter]');
  }

  //chack btn plus?
  if (event.target.dataset.action == 'plus') {
    counter.innerText = ++counter.innerText;
  }

  //chack btn minus?
  if (
    event.target.dataset.action == 'minus' &&
    parseInt(counter.textContent) > 0
  ) {
    counter.innerText = --counter.innerText;
  }
});

// CREATE BURGER
document.addEventListener('DOMContentLoaded', () => {
  updateBurgerImages();
});

const maxImages = 15;

function updateBurgerImages() {
  const burgerCreate = document.querySelector('.burger-create__wrapper');
  const warning = document.querySelector('.warning');
  const burgerImages = burgerCreate.querySelectorAll('.burger-img');

  const baseOffset = 5;
  const offsetStep = 8;

  burgerImages.forEach((img, index) => {
    img.style.bottom = `${baseOffset + index * offsetStep}%`;
  });

  if (burgerImages.length > maxImages) {
    warning.classList.add('warning--open');
  } else {
    warning.classList.remove('warning--open');
  }
}

// ADD PRODUCT
let cart = [
  {
    id: '00',
    imgSrc: 'footer_bun',
    kcal: 50,
    time: 0,
    gram: 0,
    price: 0,
  },
];

window.addEventListener('click', (event) => {
  const card = event.target.closest('.product__card');
  if (!card) return;

  const productId = card.dataset.id;

  const productInfo = {
    id: productId,
    imgSrc: card.dataset.name,
    count: parseInt(card.querySelector('[data-counter]').innerText, 10),
    kcal: parseInt(card.querySelector('.info').dataset.kcal, 10),
    time: parseInt(card.querySelector('.info').dataset.time, 10),
    gram: parseInt(card.querySelector('.info').dataset.gram, 10),
    price: parseFloat(card.querySelector('.info').dataset.price),
  };

  console.log(cart);

  if (event.target.dataset.action == 'plus') {
    cart.push(productInfo); // add
    displaUpdate();
  } else if (event.target.dataset.action == 'minus') {
    const index = cart.findIndex((item) => item.id === productId);
    if (index !== -1) {
      cart.splice(index, 1); // delet
      displaUpdate();
    }
  }
});

//DRAW BURGER
const burgerCreate = document.querySelector('.burger-create__wrapper');

function drawBurger() {
  burgerCreate.innerHTML = '';

  cart.forEach((item) => {
    const imgProducts = `
       <img class="burger-img" src="./img/burger/${item.imgSrc}.svg" alt="foot-bun" />`;
    burgerCreate.insertAdjacentHTML('beforeend', imgProducts);
  });
}

// TOTAL PRICE
function calculateTotalValues() {
  let totalKcal = 0;
  let totalGram = 0;
  let totalTime = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    totalKcal += item.kcal;
    totalGram += item.gram;
    totalTime += item.time;
    totalPrice += item.price;
  });

  const kcalElement = document.querySelector('[data-sum-kcal]');
  const timeElement = document.querySelector('[data-sum-time]');
  const gramElement = document.querySelector('[data-sum-gram]');
  const priceElement = document.querySelector('[data-sum-price]');

  kcalElement.innerText = totalKcal;
  timeElement.innerText = totalTime;
  gramElement.innerText = totalGram;
  priceElement.innerText = totalPrice.toFixed(2);

  return { totalKcal, totalGram, totalTime, totalPrice };
}

// FREE SOUCE
const appeal = document.querySelector('.appeal');
const plusSouce = document.querySelector('.free-wrapper');

function freeSouce() {
  const { totalPrice } = calculateTotalValues();

  if (totalPrice > 5) {
    appeal.classList.add('hidden');
    plusSouce.classList.remove('hidden');
  } else {
    appeal.classList.remove('hidden');
    plusSouce.classList.add('hidden');
  }
}

// ACTIVE ORDER
const btnOrder = document.querySelector('.btn-order');
function activeOrder() {
  const { totalPrice } = calculateTotalValues();
  if (totalPrice > 0) {
    btnOrder.classList.add('btn-order--active');
  } else {
    btnOrder.classList.remove('btn-order--active');
  }
}

//UPDATE DISPLAY
function displaUpdate() {
  drawBurger();
  updateBurgerImages();
  calculateTotalValues();
  activeOrder();
  freeSouce();
}

displaUpdate();
