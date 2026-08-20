// ===========================
// DARUL-FURQAN WEBSITE SCRIPT
// ===========================

// Mobile menu
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
  slides.forEach(slide => slide.classList.remove("active"));
  if (slides[index]) slides[index].classList.add("active");
}

if (slides.length > 0) {
  showSlide(currentSlide);
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}

// ===========================
// SCROLL ANIMATION
// ===========================
const fadeElements = document.querySelectorAll(".fade-up");
function reveal() {
  fadeElements.forEach(item => {
    if (item.getBoundingClientRect().top < window.innerHeight - 120) {
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
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===========================
// WHATSAPP FLOATING BUTTON
// ===========================
const whatsapp = document.createElement("a");
whatsapp.className = "whatsapp";
whatsapp.href = "https://wa.me/2348064969593";
whatsapp.target = "_blank";
whatsapp.rel = "noopener";
whatsapp.innerHTML = "💬";
document.body.appendChild(whatsapp);

// ===========================
// HEADER BACKGROUND ON SCROLL
// ===========================
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (header) {
    header.style.background = window.scrollY > 50 ? "rgba(6,40,29,.95)" : "rgba(0,0,0,.45)";
  }
});

// ===========================
// COPYRIGHT YEAR
// ===========================
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// ===========================
// AUTOMATIC GITHUB MEDIA LIBRARY
// ===========================
// IMPORTANT: The website reads the public audio/ and video/ folders from
// the GitHub repository. Add a new MP3/MP4 there and refresh the website.
const GITHUB_OWNER = "mi8648213-ai";
const GITHUB_REPO = "Darul-Furqan-";
const GITHUB_BRANCH = "main";

function githubApiUrl(folder) {
  return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${folder}?ref=${GITHUB_BRANCH}`;
}

function cleanTitle(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function naturalSort(a, b) {
  return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" });
}

function showMediaError(container, message) {
  container.innerHTML = `<p class="media-loading">⚠️ ${message}</p>`;
}

async function getGitHubMedia(folder, extension) {
  const response = await fetch(githubApiUrl(folder), {
    headers: { "Accept": "application/vnd.github+json" }
  });

  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) return [];

  return data
    .filter(file => file.type === "file" && file.name.toLowerCase().endsWith(extension))
    .sort(naturalSort);
}

function createAudioCard(file) {
  const item = document.createElement("div");
  item.className = "audio-item";

  const title = document.createElement("h4");
  title.textContent = cleanTitle(file.name);

  const player = document.createElement("audio");
  player.controls = true;
  player.preload = "metadata";
  player.src = file.download_url;

  const download = document.createElement("a");
  download.className = "download-btn";
  download.href = file.download_url;
  download.download = file.name;
  download.textContent = "⬇ Download";

  item.append(title, player, download);
  return item;
}

function createVideoCard(file) {
  const item = document.createElement("div");
  item.className = "video-item";

  const title = document.createElement("h4");
  title.textContent = cleanTitle(file.name);

  const player = document.createElement("video");
  player.controls = true;
  player.preload = "metadata";
  player.playsInline = true;
  player.src = file.download_url;

  const download = document.createElement("a");
  download.className = "download-btn";
  download.href = file.download_url;
  download.download = file.name;
  download.textContent = "⬇ Download Video";

  item.append(title, player, download);
  return item;
}

async function loadAudioLibrary() {
  const container = document.getElementById("audioList");
  if (!container) return;

  try {
    const files = await getGitHubMedia("audio", ".mp3");
    container.innerHTML = "";

    if (!files.length) {
      container.innerHTML = "<p class=\"media-loading\">No audio files found.</p>";
      return;
    }

    files.forEach(file => container.appendChild(createAudioCard(file)));
    enableSinglePlayback("#audio audio");
    enableSearch("#audioSearch", ".audio-item", "h4");
  } catch (error) {
    console.error("Audio library error:", error);
    showMediaError(container, "Could not load audio files from GitHub. Please refresh the page.");
  }
}

async function loadVideoLibrary() {
  const container = document.getElementById("videoList");
  if (!container) return;

  try {
    const files = await getGitHubMedia("video", ".mp4");
    container.innerHTML = "";

    if (!files.length) {
      container.innerHTML = "<p class=\"media-loading\">No video files found.</p>";
      return;
    }

    files.forEach(file => container.appendChild(createVideoCard(file)));
    enableSinglePlayback("#video video");
    enableSearch("#videoSearch", ".video-item", "h4");
  } catch (error) {
    console.error("Video library error:", error);
    showMediaError(container, "Could not load video files from GitHub. Please refresh the page.");
  }
}

function enableSinglePlayback(selector) {
  const players = document.querySelectorAll(selector);
  players.forEach(player => {
    player.addEventListener("play", () => {
      players.forEach(other => {
        if (other !== player) other.pause();
      });
    });
  });
}

function enableSearch(inputSelector, itemSelector, titleSelector) {
  const input = document.querySelector(inputSelector);
  if (!input) return;

  input.addEventListener("input", () => {
    const value = input.value.toLowerCase().trim();
    document.querySelectorAll(itemSelector).forEach(item => {
      const title = item.querySelector(titleSelector)?.textContent.toLowerCase() || "";
      item.style.display = title.includes(value) ? "block" : "none";
    });
  });
}

// Load both libraries when the page is ready.
loadAudioLibrary();
loadVideoLibrary();
