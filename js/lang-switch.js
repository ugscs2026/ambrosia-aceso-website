// NEXUS Task-005 — 语言切换逻辑
const LANG_FLAGS = { zh:'🇨🇳', en:'🇬🇧', vi:'🇻🇳', th:'🇹🇭', id:'🇮🇩', ms:'🇲🇾' };
const LANG_NAMES = { zh:'中文', en:'English', vi:'Tiếng Việt', th:'ภาษาไทย', id:'Indonesia', ms:'Melayu' };

let currentLang = localStorage.getItem('nexus_lang') || 'zh';

function switchLang(code) {
  if (!translations[code]) return;
  currentLang = code;
  localStorage.setItem('nexus_lang', code);
  document.documentElement.lang = code;

  // 更新所有 data-i18n 元素
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = translations[code][key];
    if (text !== undefined) el.textContent = text;
  });

  // 更新语言按钮显示
  document.getElementById('langFlag').textContent = LANG_FLAGS[code];
  document.getElementById('langLabel').textContent = LANG_NAMES[code];

  // 更新活跃状态
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === code);
  });

  // 关闭下拉
  document.getElementById('langDropdown').classList.remove('open');
}

// 下拉开关
document.getElementById('langCurrent').addEventListener('click', function(e) {
  e.stopPropagation();
  document.getElementById('langDropdown').classList.toggle('open');
});

// 点击外部关闭
document.addEventListener('click', function() {
  document.getElementById('langDropdown').classList.remove('open');
});

// 页面加载时还原语言
document.addEventListener('DOMContentLoaded', function() {
  switchLang(currentLang);
});
