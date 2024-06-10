// NAV MOBILE MENU
const body = document.querySelector('.body');
const navMob = document.querySelector('.nav-mobile');
const closeMobMenu = document.querySelector('.close-mobile-menu');
const openMobMenu = document.querySelector('.open-mobile-menu');


openMobMenu.addEventListener('click', () => {
  navMob.classList.add('open');
  body.classList.add('no-scroll');
});


closeMobMenu.addEventListener('click', () => {
  navMob.classList.remove('open');
  body.classList.remove('no-scroll');
});
