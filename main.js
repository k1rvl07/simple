function searchOpen() {
  const searchInputButtons = document.querySelectorAll(".search__input-button");
  const headerSearch = document.querySelector(".header__search");
  const headerFirstSectionNav = document.querySelector(
    ".header-first-section .nav"
  );

  searchInputButtons.forEach((button) => {
    button.style.display = "flex";
  });

  headerSearch.style.marginTop = "auto";

  headerFirstSectionNav.style.marginLeft = "50px";
}

function searchClose() {
  const searchInputButton = document.querySelectorAll(".search__input-button");
  const headerSearch = document.querySelector(".header__search");
  searchInputButton.forEach((button) => {
    button.style.display = "none";
  });
  headerSearch.style.marginTop = "0";
}

function menuOpen() {
  const menu = document.querySelector(".menu");
  const html = document.querySelector("html");
  menu.style.display = "block";
  html.style.overflow = "hidden";
}

function menuClose() {
  const menu = document.querySelector(".menu");
  const html = document.querySelector("html");
  menu.style.display = "none";
  html.style.overflow = "auto";
}

const slider = document.querySelector(".slider");
let currentSlide = 0;
let startX, endX, swipeDistance;

// Функция для проверки, находится ли точка внутри элемента
function isPointInsideElement(pointX, element) {
  const rect = element.getBoundingClientRect();
  return pointX >= rect.left && pointX <= rect.right;
}

// Add event listeners for touchstart and touchmove
slider.addEventListener("touchstart", (event) => {
  startX = event.touches[0].clientX;
  if (!isPointInsideElement(startX, slider)) {
    startX = null; // Если начальная точка не внутри слайдера, сбрасываем startX
  }
});

slider.addEventListener("touchmove", (event) => {
  if (startX !== null) {
    endX = event.touches[0].clientX;
    if (isPointInsideElement(endX, slider)) {
      swipeDistance = Math.abs(endX - startX);
    } else {
      endX = null; // Если конечная точка не внутри слайдера, сбрасываем endX
    }
  }
});

// Add event listener for touchend
slider.addEventListener("touchend", () => {
  if (swipeDistance > 1 && startX !== null && endX !== null) {
    if (endX < startX) {
      // Swipe left
      swiper.slideNext();
    } else {
      // Swipe right
      swiper.slidePrev();
    }
  }
  // Сбрасываем значения для следующего свайпа
  startX = endX = swipeDistance = null;
});

document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');

  function getOffset() {
      const width = window.innerWidth;
      if (width < 510) {
          return 105; // Пример смещения для маленьких экранов
      } else if (width < 690) {
          return 104; // Пример смещения для mini-tablet
      } else if (width < 1110) {
          return 106; // Пример смещения для big-tablet
      } else {
          return 80; // Пример смещения для desktop
      }
  }

  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          const offset = getOffset();

          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - offset,
                  behavior: 'smooth'
              });
          }
      });
  });
});