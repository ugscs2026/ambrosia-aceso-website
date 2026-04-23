// Ninazu v2.0 — 主交互脚本

// 移动端导航
document.getElementById('navToggle').addEventListener('click', function() {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// FAQ 折叠
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  document.querySelectorAll('.faq-q.open').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) { btn.classList.add('open'); answer.classList.add('open'); }
}

// 滚动 fade-up 动画
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// 导航栏滚动效果
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(255,255,255,0.98)';
    navbar.style.borderBottomColor = 'rgba(201,168,76,0.3)';
  } else {
    navbar.style.background = 'rgba(255,255,255,0.96)';
    navbar.style.borderBottomColor = 'rgba(201,168,76,0.2)';
  }
});

// 导航激活高亮
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 80) current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    const isActive = link.getAttribute('href') === '#' + current;
    link.style.color = isActive ? 'var(--gold)' : '';
  });
});

// 回到顶部
(function () {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-label', '回到顶部');
  btn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>';
  Object.assign(btn.style, {
    position: 'fixed',
    right: '1.25rem',
    bottom: '1.25rem',
    zIndex: '9999',
    width: '3rem',
    height: '3rem',
    border: '2px solid rgba(201, 168, 76, 0.85)',
    borderRadius: '50%',
    background: 'linear-gradient(160deg, #e8c96b 0%, #c9a84c 45%, #a0822d 100%)',
    color: '#1a1508',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0',
    visibility: 'hidden',
    pointerEvents: 'none',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    padding: '0',
  });
  document.body.appendChild(btn);

  function updateBackToTop() {
    const show = window.scrollY > 300;
    btn.style.opacity = show ? '1' : '0';
    btn.style.visibility = show ? 'visible' : 'hidden';
    btn.style.pointerEvents = show ? 'auto' : 'none';
  }

  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  });
})();
