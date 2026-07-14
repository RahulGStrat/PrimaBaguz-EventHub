// NAVBAR ================================
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');
const menuItems = document.querySelectorAll('.pr-navbar__nav > li');

function closeAllDropdowns() {
  menuItems.forEach(i => {
    const submenu = i.querySelector('.pr-navbar__nav-submenu');
    if (submenu) submenu.style.maxHeight = null;
    i.classList.remove('open');
  });
}

function openMenu() {
  menu.classList.add('show');
  overlay.classList.add('show');
  hamburger.classList.add('active');
}

function closeMenu() {
  menu.classList.remove('show');
  overlay.classList.remove('show');
  hamburger.classList.remove('active');
  closeAllDropdowns();
}

hamburger.addEventListener('click', () => {
  if (menu.classList.contains('show')) {
    closeMenu();
  } else {
    openMenu();
  }
});

overlay.addEventListener('click', closeMenu);

// Dropdown toggle (mobile + desktop click)
menuItems.forEach(item => {
  const link = item.querySelector('a');
  const submenu = item.querySelector('.pr-navbar__nav-submenu');

  if (submenu && link) {
    link.addEventListener('click', (e) => {
      const isMobile = window.innerWidth <= 767;
      const isOpen = item.classList.contains('open');

      // Always prevent navigation if submenu exists
      e.preventDefault();

      // Close all other dropdowns
      menuItems.forEach(i => {
        const sub = i.querySelector('.pr-navbar__nav-submenu');
        if (sub) sub.style.maxHeight = null;
        i.classList.remove('open');
      });

      // Toggle current dropdown
      if (!isOpen) {
        item.classList.add('open');
        if (isMobile) submenu.style.maxHeight = submenu.scrollHeight + "px";
      } else {
        item.classList.remove('open');
        if (isMobile) submenu.style.maxHeight = null;
      }
    });

    // Close submenu when a submenu link is clicked
    const subLinks = submenu.querySelectorAll('a');
    subLinks.forEach(subLink => {
      subLink.addEventListener('click', () => {
        if (window.innerWidth <= 767) {
          submenu.style.maxHeight = null;
        }
        item.classList.remove('open');
      });
    });
  }
});

// Close dropdowns on outside click (for desktop)
document.addEventListener('click', (e) => {
  const isClickInsideMenu = e.target.closest('nav');
  if (!isClickInsideMenu) {
    closeAllDropdowns();
  }
});
// ================================ NAVBAR END