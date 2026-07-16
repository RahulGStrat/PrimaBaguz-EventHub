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

// ================================ NOTIFY MODAL ================================
document.addEventListener('DOMContentLoaded', () => {
  const notifyBtn = document.getElementById('notify-btn');
  const notifyModal = document.getElementById('notifyModal');
  
  if (!notifyBtn || !notifyModal) return;

  const notifyModalClose = document.getElementById('notifyModalClose');
  const notifyModalBackdrop = document.getElementById('notifyModalBackdrop');
  const notifyModalForm = document.getElementById('notifyModalForm');
  const notifyModalEmail = document.getElementById('notifyModalEmail');
  const notifyModalError = document.getElementById('notifyModalError');

  // Focusable elements inside the modal for focus trapping
  const focusableElements = notifyModal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];
  let previousActiveElement = null;

  const openModal = (e) => {
    e.preventDefault();
    previousActiveElement = document.activeElement;
    notifyModal.classList.add('show');
    document.body.classList.add('modal-open');
    notifyModalEmail.focus();
    notifyModalEmail.value = '';
    notifyModalEmail.classList.remove('invalid');
    notifyModalError.textContent = '';
  };

  const closeModal = () => {
    notifyModal.classList.remove('show');
    document.body.classList.remove('modal-open');
    if (previousActiveElement) {
      previousActiveElement.focus();
    }
  };

  notifyBtn.addEventListener('click', openModal);
  notifyModalClose.addEventListener('click', closeModal);
  notifyModalBackdrop.addEventListener('click', closeModal);

  // Esc key & focus trap
  notifyModal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
    
    if (e.key === 'Tab') {
      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  });

  // Validation
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Submit Handler
  notifyModalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = notifyModalEmail.value.trim();
    
    if (!email) {
      notifyModalEmail.classList.add('invalid');
      notifyModalError.textContent = 'Email is required';
      return;
    }

    if (!isValidEmail(email)) {
      notifyModalEmail.classList.add('invalid');
      notifyModalError.textContent = 'Please enter a valid email address';
      return;
    }

    notifyModalEmail.classList.remove('invalid');
    notifyModalError.textContent = '';

    // Handle valid submission
    handleSubmit(email);
  });

  // Clear validation on input
  notifyModalEmail.addEventListener('input', () => {
    if (notifyModalEmail.classList.contains('invalid')) {
      notifyModalEmail.classList.remove('invalid');
      notifyModalError.textContent = '';
    }
  });

  const handleSubmit = (email) => {
    console.log(email);
    // Optionally close the modal after submission
    // closeModal();
  };
});
// ================================ NOTIFY MODAL END ================================