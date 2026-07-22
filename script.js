// ===========================
// MOBILE MENU
// ===========================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuBtn.innerHTML = navMenu.classList.contains("active") ? "✕" : "☰";
  });

  document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuBtn.innerHTML = "☰";
    });
  });
}

// ===========================
// HERO IMAGE SLIDER
// ===========================

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index) {

  slides.forEach(slide => {
    slide.classList.remove("active");
  });

  slides[index].classList.add("active");

}

if (slides.length > 0) {

  showSlide(currentSlide);

  setInterval(() => {

    currentSlide++;

    if (currentSlide >= slides.length) {

      currentSlide = 0;

    }

    showSlide(currentSlide);

  }, 5000);

}

// ===========================
// SCROLL ANIMATION
// ===========================

const fadeElements = document.querySelectorAll(".fade-up");

function reveal() {

  fadeElements.forEach(item => {

    const windowHeight = window.innerHeight;

    const top = item.getBoundingClientRect().top;

    if (top < windowHeight - 120) {

      item.classList.add("show");

    }

  });

}

window.addEventListener("scroll", reveal);

reveal();

// ===========================
// SCROLL TO TOP BUTTON
// ===========================

const topBtn = document.createElement("button");

topBtn.id = "topBtn";

topBtn.innerHTML = "↑";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

  if (window.scrollY > 300) {

    topBtn.style.display = "block";

  } else {

    topBtn.style.display = "none";

  }

});

topBtn.addEventListener("click", () => {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

});

// ===========================
// WHATSAPP FLOATING BUTTON
// ===========================

const whatsapp = document.createElement("a");

whatsapp.className = "whatsapp";

whatsapp.href = "https://wa.me/2348064969593";

whatsapp.target = "_blank";

whatsapp.innerHTML = "💬";

document.body.appendChild(whatsapp);

// ===========================
// HEADER BACKGROUND ON SCROLL
// ===========================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {

    header.style.background = "rgba(6,40,29,.95)";

  } else {

    header.style.background = "rgba(0,0,0,.45)";

  }

});

// ===========================
// COPYRIGHT YEAR
// ===========================

const year = document.getElementById("year");

if (year) {

  year.textContent = new Date().getFullYear();

}