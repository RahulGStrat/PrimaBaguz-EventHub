// ================================ NAVBAR ================================
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');

function openMenu() {
  menu.classList.add('show');
  overlay.classList.add('show');
  hamburger.classList.add('active');
}

function closeMenu() {
  menu.classList.remove('show');
  overlay.classList.remove('show');
  hamburger.classList.remove('active');
}

hamburger.addEventListener('click', () => {
  if (menu.classList.contains('show')) {
    closeMenu();
  } else {
    openMenu();
  }
});

overlay.addEventListener('click', closeMenu);

// ================================ NAVBAR END ================================


  $(".pre-header__nav-link").click(function() {
  $(".pre-header__nav-link").removeClass('active');
  $(this).addClass('active');

})