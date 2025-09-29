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











// Blog Single Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  initializeBlogSingle();
  loadRelatedArticles();
  setupEventListeners();
  initializeMobileMenu();
});

function initializeBlogSingle() {
  // Initialize table of contents highlighting
  highlightTableOfContents();
  
  // Initialize like functionality
  initializeLikeSystem();
  
  // Initialize share functionality
  initializeShareSystem();
  
  // Initialize scroll to top
  initializeScrollToTop();
  
  // Initialize reading progress (optional)
  initializeReadingProgress();
}


function setupEventListeners() {
  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
  
  // Table of contents smooth scroll
  const tocLinks = document.querySelectorAll('.table-of-contents a[href^="#"]');
  tocLinks.forEach(link => {
    link.addEventListener('click', smoothScrollToSection);
  });
}

function highlightTableOfContents() {
  const sections = document.querySelectorAll('.content-section');
  const tocLinks = document.querySelectorAll('.table-of-contents a');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        tocLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
            link.style.color = '#2c5e8c';
            link.style.fontWeight = '600';
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px'
  });
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

function smoothScrollToSection(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  
  if (targetSection) {
    const offsetTop = targetSection.offsetTop - 100;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
    
    // Update URL without page jump
    history.pushState(null, null, targetId);
  }
}

function initializeLikeSystem() {
  const likeBtn = document.getElementById('likeBtn');
  const likeCount = document.getElementById('likeCount');
  
  if (!likeBtn || !likeCount) return;
  
  // Check if user has already liked
  const hasLiked = localStorage.getItem('articleLiked');
  if (hasLiked) {
    likeBtn.classList.add('liked');
    likeBtn.querySelector('i').className = 'fas fa-heart';
  }
  
  likeBtn.addEventListener('click', function() {
    if (this.classList.contains('liked')) {
      // Unlike
      this.classList.remove('liked');
      this.querySelector('i').className = 'far fa-heart';
      const currentCount = parseInt(likeCount.textContent);
      likeCount.textContent = currentCount - 1;
      localStorage.removeItem('articleLiked');
    } else {
      // Like
      this.classList.add('liked');
      this.querySelector('i').className = 'fas fa-heart';
      const currentCount = parseInt(likeCount.textContent);
      likeCount.textContent = currentCount + 1;
      localStorage.setItem('articleLiked', 'true');
      
      // Show appreciation message
      showToast('Thank you for your appreciation!');
    }
  });
}

function initializeShareSystem() {
  const shareBtnMobile = document.getElementById('shareBtnMobile');
  const shareButtons = document.querySelectorAll('.share-btn');
  
  // Mobile share button
  if (shareBtnMobile && navigator.share) {
    shareBtnMobile.style.display = 'flex';
    shareBtnMobile.addEventListener('click', shareArticle);
  } else if (shareBtnMobile) {
    shareBtnMobile.style.display = 'none';
  }
  
  // Desktop share buttons
  shareButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const platform = this.className.includes('facebook') ? 'facebook' :
                      this.className.includes('twitter') ? 'twitter' :
                      this.className.includes('linkedin') ? 'linkedin' : 'whatsapp';
      shareToPlatform(platform);
    });
  });
}

function shareArticle() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: 'Check out this amazing article about Surah Yaseen benefits',
      url: window.location.href
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing:', error));
  }
}

function shareToPlatform(platform) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const text = encodeURIComponent('Check out this amazing article about Surah Yaseen benefits');
  
  let shareUrl = '';
  
  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${title} ${url}`;
      break;
  }
  
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

function initializeScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTop');
  
  if (!scrollBtn) return;
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initializeReadingProgress() {
  // Optional: Add reading progress bar at top
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(45deg, #2c5e8c, #1e3a5f);
    width: 0%;
    z-index: 1001;
    transition: width 0.3s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', function() {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const progress = (scrollTop / (docHeight - winHeight)) * 100;
    progressBar.style.width = progress + '%';
  });
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const emailInput = form.querySelector('.newsletter-input');
  const submitBtn = form.querySelector('.newsletter-btn');
  const email = emailInput.value.trim();
  
  if (!validateEmail(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }
  
  // Simulate API call
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Subscribing...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    showToast('Thank you for subscribing to our newsletter!');
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    emailInput.value = '';
    
    // Track conversion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'newsletter_signup', {
        'event_category': 'Engagement',
        'event_label': 'Blog Article'
      });
    }
  }, 1500);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showToast(message, type = 'success') {
  // Remove existing toast
  const existingToast = document.querySelector('.toast-message');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = `toast-message toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'error' ? '#ff6b6b' : '#2c5e8c'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  .table-of-contents a.active {
    color: #2c5e8c !important;
    font-weight: 600 !important;
    padding-left: 0.5rem !important;
    border-left: 3px solid #2c5e8c;
  }
`;
document.head.appendChild(style);

// Update meta tags for social sharing
function updateMetaTags() {
  // This would typically be done server-side, but we can update dynamically
  const title = document.title;
  const description = document.querySelector('meta[name="description"]').getAttribute('content');
  const image = document.querySelector('meta[property="og:image"]').getAttribute('content');
  
  // Update Open Graph tags dynamically if needed
  document.querySelector('meta[property="og:title"]').setAttribute('content', title);
  document.querySelector('meta[property="og:description"]').setAttribute('content', description);
  document.querySelector('meta[property="og:url"]').setAttribute('content', window.location.href);
}

// Initialize when page loads
updateMetaTags();