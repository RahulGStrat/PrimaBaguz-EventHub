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

$(function () {

    const links = $(".pre-header__nav-link");
    const sections = $("section[id]");

    function setActive() {
        let scrollPos = $(window).scrollTop();
        let winHeight = $(window).height();
        let docHeight = $(document).height();

        // If at the bottom, always activate the last menu
        if (scrollPos + winHeight >= docHeight - 2) {
            links.removeClass("active");
            links.last().addClass("active");
            return;
        }

        let current = "";

        sections.each(function () {
            let top = $(this).offset().top - 150;

            if (scrollPos >= top) {
                current = this.id;
            }
        });

        if (current) {
            links.removeClass("active");
            links.filter('[href="#' + current + '"]').addClass("active");
        }
    }

    $(window).on("scroll resize load", setActive);

    links.on("click", function () {
        links.removeClass("active");
        $(this).addClass("active");
    });

});