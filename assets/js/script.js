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

$(document).ready(function () {

    // Active on click
    $(".pre-header__nav-link").on("click", function () {
        $(".pre-header__nav-link").removeClass("active");
        $(this).addClass("active");
    });

    // Active on scroll
    $(window).on("scroll", function () {

        var scrollPos = $(document).scrollTop() + 120;

        $("section").each(function () {

            var top = $(this).offset().top;
            var bottom = top + $(this).outerHeight();
            var id = $(this).attr("id");

            if (scrollPos >= top && scrollPos < bottom) {
                $(".pre-header__nav-link").removeClass("active");
                $('.pre-header__nav-link[href="#' + id + '"]').addClass("active");
            }
        });

    });

});