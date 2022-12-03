//Burger Menu

let burgerMenu = document.querySelector(".nav-bar__burger-menu");
let navBar = document.querySelector(".nav-bar__container");

burgerMenu.addEventListener("click", () => {
  navBar.classList.toggle("active");
  burgerMenu.classList.toggle("animation");
});

// Header is hidden/shown when scrolled
let initialScroll = window.scrollY;

window.addEventListener("scroll", function () {
  let newScroll = window.scrollY;
  let width = window.innerWidth;

  if (width > 1000 && initialScroll >= newScroll) {
    document.getElementById("header").style.top = "40px";
  } else if (width > 1000 && initialScroll <= newScroll) {
    document.getElementById("header").style.top = "-120px";
  }

  if (width < 1000 && initialScroll >= newScroll) {
    document.getElementById("header").style.top = "0px";
  } else if (width < 1000 && initialScroll <= newScroll) {
    document.getElementById("header").style.top = "-120px";
  }
  
  initialScroll = newScroll;
});

// Pagination (Dots)
var swiper = new Swiper(".home__swiper__pagination", {
  pagination: {
    el: ".swiper-pagination",
  },
});

var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
});

// Navigation (Arrows)
var swiper = new Swiper(".rooms__swiper__navigation", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".home__swiper__navigation", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Coverflow - Rooms
var swiper = new Swiper(".home__swiper__navigation-coverflow", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
