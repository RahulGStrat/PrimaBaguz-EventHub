// ================================ NAVBAR ================================
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');

function openMenu() {
  if (menu && overlay && hamburger) {
    menu.classList.add('show');
    overlay.classList.add('show');
    hamburger.classList.add('active');
  }
}

function closeMenu() {
  if (menu && overlay && hamburger) {
    menu.classList.remove('show');
    overlay.classList.remove('show');
    hamburger.classList.remove('active');
  }
}

// Ensure elements exist before adding event listeners to prevent script termination
if (hamburger && menu) {
  hamburger.addEventListener('click', () => {
    if (menu.classList.contains('show')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

if (overlay) {
  overlay.addEventListener('click', closeMenu);
}
// ================================ NAVBAR END ================================


// ================================ JQUERY SCROLLY-NAV ================================
$(function () {
  const links = $(".pre-header__nav-link");
  const sections = $("section[id]");

  // Return early if no active navigation links or sections are found on the page
  if (!links.length || !sections.length) return;

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
// ================================ JQUERY SCROLLY-NAV END ================================


// ================================ NOTIFY MODAL ================================
document.addEventListener('DOMContentLoaded', () => {
  const notifyBtn = document.getElementById('notify-btn');
  const notifyModal = document.getElementById('notifyModal');

  // Guard clause: Exit if modal markup isn't found on the page
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

  let firstFocusableElement = focusableElements.length ? focusableElements[0] : null;
  let lastFocusableElement = focusableElements.length ? focusableElements[focusableElements.length - 1] : null;
  let previousActiveElement = null;

  const openModal = (e) => {
    e.preventDefault();
    previousActiveElement = document.activeElement;
    notifyModal.classList.add('show');
    document.body.classList.add('modal-open');

    if (notifyModalEmail) {
      notifyModalEmail.focus();
      notifyModalEmail.value = '';
      notifyModalEmail.classList.remove('invalid');
    }
    if (notifyModalError) {
      notifyModalError.textContent = '';
    }
  };

  const closeModal = () => {
    notifyModal.classList.remove('show');
    document.body.classList.remove('modal-open');
    if (previousActiveElement) {
      previousActiveElement.focus();
    }
  };

  notifyBtn.addEventListener('click', openModal);
  if (notifyModalClose) notifyModalClose.addEventListener('click', closeModal);
  if (notifyModalBackdrop) notifyModalBackdrop.addEventListener('click', closeModal);

  // Esc key & focus trap
  notifyModal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }

    if (e.key === 'Tab' && firstFocusableElement && lastFocusableElement) {
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

  // Validation regex utility
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Submit Handler
  if (notifyModalForm && notifyModalEmail) {
    notifyModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = notifyModalEmail.value.trim();

      if (!email) {
        notifyModalEmail.classList.add('invalid');
        if (notifyModalError) notifyModalError.textContent = 'Email is required';
        return;
      }

      if (!isValidEmail(email)) {
        notifyModalEmail.classList.add('invalid');
        if (notifyModalError) notifyModalError.textContent = 'Please enter a valid email address';
        return;
      }

      notifyModalEmail.classList.remove('invalid');
      if (notifyModalError) notifyModalError.textContent = '';

      // Handle valid submission
      handleSubmit(email);
    });

    // Clear validation on input
    notifyModalEmail.addEventListener('input', () => {
      if (notifyModalEmail.classList.contains('invalid')) {
        notifyModalEmail.classList.remove('invalid');
        if (notifyModalError) notifyModalError.textContent = '';
      }
    });
  }

  const handleSubmit = (email) => {
    console.log(email);
    // Optionally close the modal after submission
    // closeModal();
  };
});
// ================================ NOTIFY MODAL END ================================

// ====================== PRICE BOX SWITCH ================================
function switchTab(cardId, selectedTab, clickedElement) {
  const cardElement = document.getElementById(cardId);
  if (!cardElement) return; // Guard clause: Exit safely if card block does not exist

  const priceBox = cardElement.querySelector('.pre-sys__tile-price-tag');
  const detailsBox = cardElement.querySelector('.pre-sys__tile-details-list');
  const earlyBirdText = cardElement.querySelector('.pre-sys__tile-subtitle');
  const allOptions = cardElement.querySelectorAll('.pre-sys__tile-toggle-option');
  const slider = cardElement.querySelector('.pre-sys__tile-switch-slider');

  // 1. Update option active/inactive classes safely
  if (allOptions.length > 0 && clickedElement) {
    allOptions.forEach(opt => {
      opt.className = 'pre-sys__tile-toggle-option pre-sys__tile-toggle-option--inactive';
    });
    clickedElement.className = 'pre-sys__tile-toggle-option pre-sys__tile-toggle-option--active';
  }

  // 2. Animate the slider track smoothly
  if (slider) {
    if (selectedTab === 'm41') {
      slider.style.transform = 'translateX(0)';
    } else {
      slider.style.transform = 'translateX(100%)';
    }
  }

  // 3. Toggle Early Bird subtitle visibility gracefully
  // if (earlyBirdText) {
  //   if (selectedTab === 'm41') {
  //     earlyBirdText.style.visibility = 'visible';
  //     earlyBirdText.style.opacity = '1';
  //   } else {
  //     earlyBirdText.style.visibility = 'hidden';
  //     earlyBirdText.style.opacity = '0';
  //   }
  // }

  // 4. Update the Price and Details Lists dynamically using the HTML element attributes
  if (clickedElement) {
    const activePrice = clickedElement.getAttribute('data-price');
    const activeDetailsString = clickedElement.getAttribute('data-details');

    // Update Price text
    if (priceBox && activePrice) {
      priceBox.textContent = activePrice;
    }

    // Split features by pipe "|" and safely rebuild the DOM list
    if (detailsBox && activeDetailsString) {
      detailsBox.innerHTML = '';
      const detailsArray = activeDetailsString.split('|');

      detailsArray.forEach(itemText => {
        const liElement = document.createElement('li');
        liElement.textContent = itemText;
        detailsBox.appendChild(liElement);
      });
    }
  }
}
// ====================== PRICE BOX SWITCH END ============================