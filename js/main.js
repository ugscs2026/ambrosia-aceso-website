// NEXUS Task-005 — 主交互脚本

// 移动端导航
document.getElementById('navToggle').addEventListener('click', function() {
  document.getElementById('navLinks').classList.toggle('open');
});

// 关闭移动端菜单（点击链接后）
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// FAQ 折叠
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  // 关闭所有
  document.querySelectorAll('.faq-q.open').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });
  // 打开当前（如果之前是关闭的）
  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

// 滚动显示动画
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.ingredient-card, .benefit-card, .faq-item, .usage-box, .target-box').forEach(el => {
  el.classList.add('scroll-reveal');
  observer.observe(el);
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  }
});

// 导航激活高亮
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--ambrosia)';
      link.style.fontWeight = '600';
    } else {
      link.style.fontWeight = '';
    }
  });
});
