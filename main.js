(function() {
  try {
    var saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch(e) {}
})();

// Everything else runs after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  
  // Theme toggle
  var themeToggle = document.getElementById('theme-toggle');
  
  function currentTheme() {
    var attr = document.documentElement.getAttribute('data-theme');
    if (attr) return attr;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  
  function updateIcon() {
    if (!themeToggle) return;
    var icon = themeToggle.querySelector('i');
    if (!icon) return;
    icon.className = currentTheme() === 'light' ? 'ph ph-moon' : 'ph ph-sun';
  }
  
  if (themeToggle) {
    updateIcon();
    themeToggle.addEventListener('click', function() {
      var next = currentTheme() === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateIcon();
    });
  }
  
  // Nav scroll
  var nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
  
  // Scroll reveal
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });
});
