const blogsData = [
  {
    id: 1,
    title: "The Spiritual Significance of Surah Yaseen in Daily Life",
    excerpt: "Learn how incorporating Surah Yaseen into your daily routine can bring peace, blessings, and spiritual elevation to your life.",
    category: "Spiritual Benefits",
    date: "2024-03-12",
    readTime: "6 min",
    views: "1.8K",
    image: "/images/related-blogs-image-01.jpg"
  },
  {
    id: 2,
    title: "Understanding the Tafsir: Deep Meanings Behind Surah Yaseen Verses",
    excerpt: "A comprehensive look at the interpretation and deeper meanings of key verses in Surah Yaseen with scholarly insights.",
    category: "Tafsir & Meaning",
    date: "2024-03-10",
    readTime: "12 min",
    views: "3.2K",
    image: "/images/related-blogs-image-01.jpg"
  },
  {
    id: 3,
    title: "Historical Context: When and Why Was Surah Yaseen Revealed?",
    excerpt: "Explore the circumstances and historical background of the revelation of Surah Yaseen in Makkah.",
    category: "Historical Context",
    date: "2024-03-08",
    readTime: "7 min",
    views: "2.1K",
    image: "/images/related-blogs-image-01.jpg"
  },
  {
    id: 4,
    title: "10 Virtues of Surah Yaseen Mentioned in Hadith",
    excerpt: "Discover the authentic virtues and rewards of reciting Surah Yaseen as mentioned in various Hadith collections.",
    category: "Virtues & Rewards",
    date: "2024-03-05",
    readTime: "5 min",
    views: "4.5K",
    image: "/images/related-blogs-image-01.jpg"
  },
  {
    id: 5,
    title: "How to Properly Recite Surah Yaseen with Tajweed",
    excerpt: "A beginner's guide to learning the proper pronunciation and rules of Tajweed for Surah Yaseen recitation.",
    category: "Recitation Guide",
    date: "2024-03-03",
    readTime: "9 min",
    views: "2.8K",
    image: "/images/related-blogs-image-01.jpg"
  },
  {
    id: 6,
    title: "Surah Yaseen for Forgiveness: Stories of Transformation",
    excerpt: "Inspiring real-life stories of people who experienced spiritual transformation through regular recitation of Surah Yaseen.",
    category: "Spiritual Benefits",
    date: "2024-03-01",
    readTime: "8 min",
    views: "3.7K",
    image: "/images/related-blogs-image-01.jpg"
  },
  {
    id: 7,
    title: "The Scientific Miracles in Surah Yaseen",
    excerpt: "Exploring the scientific facts mentioned in Surah Yaseen that were only discovered centuries later by modern science.",
    category: "Scientific Miracles",
    date: "2024-02-28",
    readTime: "11 min",
    views: "2.9K",
    image: "/images/related-blogs-image-01.jpg"
  },
  {
    id: 8,
    title: "Creating a Surah Yaseen Study Group: A Complete Guide",
    excerpt: "Step-by-step guide to starting and maintaining a successful study group for learning and understanding Surah Yaseen.",
    category: "Learning Guide",
    date: "2024-02-25",
    readTime: "6 min",
    views: "1.5K",
    image: "/images/related-blogs-image-01.jpg"
  }
];

// DOM Elements
const blogsGrid = document.getElementById('blogsGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadSpinner = document.getElementById('loadSpinner');
const searchInput = document.querySelector('.search-input');

// Configuration
let currentPage = 1;
const blogsPerPage = 4;
let filteredBlogs = [...blogsData];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  loadBlogs();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  loadMoreBtn.addEventListener('click', loadMoreBlogs);
  searchInput.addEventListener('input', handleSearch);
}


// Load initial blogs
function loadBlogs() {
  const startIndex = 0;
  const endIndex = currentPage * blogsPerPage;
  const blogsToShow = filteredBlogs.slice(startIndex, endIndex);

  displayBlogs(blogsToShow);
  updateLoadMoreButton();
}

// Load more blogs
function loadMoreBlogs() {
  loadMoreBtn.disabled = true;
  loadSpinner.classList.remove('d-none');
  
  // Simulate loading delay
  setTimeout(() => {
    currentPage++;
    const startIndex = 0;
    const endIndex = currentPage * blogsPerPage;
    const blogsToShow = filteredBlogs.slice(startIndex, endIndex);
    
    displayBlogs(blogsToShow);
    updateLoadMoreButton();
    
    loadMoreBtn.disabled = false;
    loadSpinner.classList.add('d-none');
  }, 800);
}

// Display blogs in grid
function displayBlogs(blogs) {
  // Clear existing blogs if it's a new search
  if (currentPage === 1) {
    blogsGrid.innerHTML = '';
  }

  if (blogs.length === 0) {
    blogsGrid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search fa-3x"></i>
        <h3>No blogs found</h3>
        <p>Try adjusting your search terms or browse different categories.</p>
      </div>
    `;
    return;
  }

  blogs.forEach(blog => {
    const blogCard = createBlogCard(blog);
    blogsGrid.appendChild(blogCard);
  });
}

// Create blog card HTML
function createBlogCard(blog) {
  const article = document.createElement('article');
  article.className = 'blog-card';
  article.innerHTML = `
    <div class="blog-card-image">
      <img src="${blog.image}" alt="${blog.title}" onerror="this.src='/images/blog-placeholder.jpg'">
    </div>
    <div class="blog-card-content">
      <div class="blog-card-meta">
        <span class="blog-card-category">${blog.category}</span>
        <span class="blog-card-date"><i class="far fa-calendar"></i> ${formatDate(blog.date)}</span>
      </div>
      <h3 class="blog-card-title">${blog.title}</h3>
      <p class="blog-card-excerpt">${blog.excerpt}</p>
      <div class="blog-card-footer">
        <div class="blog-card-stats">
          <span><i class="far fa-clock"></i> ${blog.readTime}</span>
          <span><i class="far fa-eye"></i> ${blog.views}</span>
        </div>
        <a href="#" class="blog-card-link">
          Read More <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;
  
  return article;
}

// Handle search functionality
function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase().trim();
  
  if (searchTerm === '') {
    filteredBlogs = [...blogsData];
  } else {
    filteredBlogs = blogsData.filter(blog => 
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.excerpt.toLowerCase().includes(searchTerm) ||
      blog.category.toLowerCase().includes(searchTerm)
    );
  }
  
  currentPage = 1;
  loadBlogs();
}

// Update load more button state
function updateLoadMoreButton() {
  const totalDisplayed = currentPage * blogsPerPage;
  if (totalDisplayed >= filteredBlogs.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'inline-flex';
  }
}

// Format date to readable format
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Newsletter form handling
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('.newsletter-input');
      const email = emailInput.value.trim();
      
      if (validateEmail(email)) {
        // Simulate form submission
        const submitBtn = this.querySelector('.newsletter-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          alert('Thank you for subscribing to our newsletter!');
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          emailInput.value = '';
        }, 1500);
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }
});

// Email validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add loading animation to blog cards
function addLoadingAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  document.querySelectorAll('.blog-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Initialize animations when blogs are loaded
setTimeout(addLoadingAnimation, 100);