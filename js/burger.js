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
  updateBurgerImages(document.querySelector('.burger-create__wrapper'));
  updateBurgerImages(document.querySelector('.burger__wrapper--pop-up'));
});

const maxImages = 20;

function updateBurgerImages(container) {
  const warning = document.querySelector('.warning');
  const burgerImages = container.querySelectorAll('.burger-img');
  if (!warning) return;
  const baseOffset = 2;
  const offsetStep = 5;
  const cheeseOffsetAdjustment = -4; //CHEESe
  burgerImages.forEach((img, index) => {
    let offset = baseOffset + index * offsetStep;

    // CHEESE
    if (img.src.includes('cheese.png')) {
      offset += cheeseOffsetAdjustment;
    }

    img.style.bottom = `${offset}%`;
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
const burgerCreatePopUp = document.querySelector('.burger__wrapper--pop-up');

function drawBurger() {
  burgerCreate.innerHTML = '';
  burgerCreatePopUp.innerHTML = '';

  cart.forEach((item) => {
    const imgProducts = `
       <img class="burger-img" src="./img/burger/${item.imgSrc}.png" alt="foot-bun" />`;
    burgerCreate.insertAdjacentHTML('beforeend', imgProducts);
    burgerCreatePopUp.insertAdjacentHTML('beforeend', imgProducts);
  });

  updateBurgerImages(burgerCreate);
  updateBurgerImages(burgerCreatePopUp);
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
    btnOrder.removeAttribute('disabled');
  } else {
    btnOrder.classList.remove('btn-order--active');
    btnOrder.setAttribute('disabled', 'disabled');
  }
}

// POP-UP
const bodyTwoPage = document.querySelector('.body');
const popUpMail = document.querySelector('#pop-up__mail');
const contentMail = document.querySelector('.content-mail');
const popUpThank = document.querySelector('#pop-up__thenk');
const contentThenk = document.querySelector('.content-thenk');

const closeBtn = document.querySelectorAll('.close-btn');
const nextBtn = document.querySelector('.next-btn');
const endBtn = document.querySelector('.end-btn');

// OPEN FIRST POP-UP
btnOrder.addEventListener('click', () => {
  popUpMail.classList.add('pop-up--active');
  contentMail.classList.add('pop-up__content--active');
  bodyTwoPage.classList.add('no-scroll');
});

// OPEN THANK POP-UP
nextBtn.addEventListener('click', (event) => {
  event.preventDefault();
  closePopUp();
  popUpThank.classList.add('pop-up--active');
  contentThenk.classList.add('pop-up__content--active');
  bodyTwoPage.classList.add('no-scroll');
});

//FINISH POP-UP
endBtn.addEventListener('click', () => {
  closePopUp();
});

// CLOSE ALL POP-UP
closeBtn.forEach((item) => {
  item.addEventListener('click', closePopUp);
});

function closePopUp() {
  popUpMail.classList.remove('pop-up--active');
  contentMail.classList.remove('pop-up__content--active');
  popUpThank.classList.remove('pop-up--active');
  contentThenk.classList.remove('pop-up__content--active');
  bodyTwoPage.classList.remove('no-scroll');
}

//UPDATE DISPLAY
function displaUpdate() {
  drawBurger();
  updateBurgerImages(document.querySelector('.burger-create__wrapper'));
  updateBurgerImages(document.querySelector('.burger__wrapper--pop-up'));
  calculateTotalValues();
  activeOrder();
  freeSouce();
}

displaUpdate();
