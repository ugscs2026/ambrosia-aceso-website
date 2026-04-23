document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('.back-to-top');
  if (!btn) return;

  function updateVisibility() {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
