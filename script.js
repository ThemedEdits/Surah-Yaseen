const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Mobile menu toggle
menuToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent immediate outside click close
  navLinks.classList.toggle('active');
});

// Hide/show navbar on scroll
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    // scrolling down
    navbar.classList.add('hide');
  } else {
    // scrolling up
    navbar.classList.remove('hide');
  }
  lastScrollY = window.scrollY;
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('active') &&
      !navbar.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Button actions
document.getElementById('download-btn').addEventListener('click', () => {
  window.open('images/Surah-Yaseen-Online.pdf', '_blank');
});

document.getElementById('listen-btn').addEventListener('click', () => {
  document.getElementById('listen-section').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('read-btn').addEventListener('click', () => {
  document.getElementById('images-stack').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('info-btn').addEventListener('click', () => {
  document.getElementById('surah-info').scrollIntoView({ behavior: 'smooth' });
});

// Audio player
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');

// Ensure slider works with decimals (smooth progress)
progress.min = 0;
progress.step = 0.01;

// Play / Pause toggle
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
});

// Update progress bar while playing
audio.addEventListener('timeupdate', () => {
  if (!isNaN(audio.duration)) {
    progress.value = audio.currentTime;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

// Set duration once metadata is loaded
audio.addEventListener('loadedmetadata', () => {
  progress.max = audio.duration;
  durationEl.textContent = formatTime(audio.duration);
});

// Seek when progress is changed
progress.addEventListener('input', () => {
  audio.currentTime = progress.value;
});

// Volume control
volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

// Helper function to format time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}




// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle('active');
  });
});







