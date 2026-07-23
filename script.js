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
// ===========================
// AUDIO LIBRARY ENHANCEMENT
// ===========================

// Tsayar da sauran audios idan an kunna sabon audio
const audioPlayers = document.querySelectorAll("#audio audio");

audioPlayers.forEach(player => {
  player.addEventListener("play", () => {
    audioPlayers.forEach(other => {
      if (other !== player) {
        other.pause();
      }
    });
  });
});

// Smooth scroll zuwa Audio Library idan an buƙata
const audioLink = document.querySelector('a[href="#audio"]');

if (audioLink) {
  audioLink.addEventListener("click", function(e) {
    e.preventDefault();

    document.querySelector("#audio").scrollIntoView({
      behavior: "smooth"
    });
  });
}
// ===========================
// VIDEO LIBRARY
// ===========================

const videos = document.querySelectorAll("#video video");

videos.forEach(video => {
  video.addEventListener("play", () => {
    videos.forEach(other => {
      if (other !== video) {
        other.pause();
      }
    });
  });
});
// ===========================
// AUDIO SEARCH
// ===========================

const audioSearch = document.getElementById("audioSearch");

if(audioSearch){

audioSearch.addEventListener("keyup", function(){

const value = this.value.toLowerCase();

const audioItems = document.querySelectorAll(".audio-item");

audioItems.forEach(item=>{

const title = item.querySelector("h4").textContent.toLowerCase();

if(title.includes(value)){

item.style.display="block";

}else{

item.style.display="none";

}

});

});

}
// ===========================
// VIDEO LIBRARY
// ===========================

// Search Videos
const videoSearch = document.getElementById("videoSearch");

if (videoSearch) {

  videoSearch.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const videoItems = document.querySelectorAll(".video-item");

    videoItems.forEach(item => {

      const title = item.querySelector("h4").textContent.toLowerCase();

      if (title.includes(value)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }

    });

  });

}

// Play one video at a time
const videoPlayers = document.querySelectorAll("#video video");

videoPlayers.forEach(player => {

  player.addEventListener("play", () => {

    videoPlayers.forEach(other => {

      if (other !== player) {
        other.pause();
      }

    });

  });

});