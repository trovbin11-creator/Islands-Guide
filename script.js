// ==========================================================================
// Theme (light / dark mode)
// ==========================================================================
const THEME_COOKIE = 'islands-guide-theme';

function readThemeCookie() {
  const match = document.cookie.match(/(?:^|;\s*)islands-guide-theme=(dark|light)/);
  return match ? match[1] : null;
}

function writeThemeCookie(theme) {
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

function getPreferredTheme() {
  const saved = readThemeCookie();
  if (saved) return saved;
  return 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelectorAll('.theme-toggle').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(theme === 'light'));
  });
}

let currentTheme = getPreferredTheme();
applyTheme(currentTheme);

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
  writeThemeCookie(currentTheme);
}

document.querySelectorAll('.theme-toggle').forEach((btn) => {
  btn.addEventListener('click', toggleTheme);
});

// ==========================================================================
// Mobile sidebar toggle
// ==========================================================================
const navToggle = document.getElementById('navToggle');
const sidebar = document.getElementById('sidebar');

if (navToggle && sidebar) {
  navToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // close the sidebar after tapping a link on mobile
  sidebar.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ==========================================================================
// Active link highlighting on scroll
// ==========================================================================
const sections = document.querySelectorAll('.region');
const navLinks = document.querySelectorAll('.sidebar__nav a');

const highlightActiveLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
  });
};

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          highlightActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}