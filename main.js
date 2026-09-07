const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled')
  }
}
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  })
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---- Theme toggle (light/dark mode) ----
// Default is whatever the browser/OS prefers, handled purely by the
// prefers-color-scheme media query in style.css. If the visitor has
// clicked the toggle before, that saved choice overrides the browser default.
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Works out which theme is actually showing right now, whether that
// came from a saved choice or from the browser's own setting
function currentTheme() {
  if (document.documentElement.hasAttribute('data-theme')) {
    return document.documentElement.getAttribute('data-theme');
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

// Icon shows the mode you'd switch TO, not the current one
function updateToggleIcon() {
  const icon = themeToggle.querySelector('i');
  icon.className = currentTheme() === 'light' ? 'ph ph-moon' : 'ph ph-sun';
}

if (themeToggle) {
  updateToggleIcon();
  themeToggle.addEventListener('click', () => {
    const next = currentTheme() === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleIcon();
  });
}
