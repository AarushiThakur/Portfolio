const themeToggle = document.getElementById('theme-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

window.addEventListener('scroll', () => {
  let fromTop = window.scrollY + 80;
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Highlight active nav link based on scroll position
  navLinks.forEach(link => {
    let section = document.querySelector(link.hash);
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Navbar hide/show on scroll
  if (scrollTop > lastScrollTop) {
    // Scrolling down - hide navbar
    navbar.style.top = '-70px';  // adjust this if navbar height changes
  } else {
    // Scrolling up - show navbar
    navbar.style.top = '0';
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;  // prevent negative values
});

// Smooth scrolling on nav link click
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.hash).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
