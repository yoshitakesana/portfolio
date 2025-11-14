// 各コンポーネントを読み込んで挿入する関数
const loadComponent = async (id, path) => {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
};

// ページトップへ戻るボタン生成・表示・動作
function createScrollTopButton() {
  const btn = document.createElement('button');
  btn.id = 'scrollTopBtn';
  btn.textContent = '↑';
  btn.style.position = 'fixed';
  btn.style.right = '24px';
  btn.style.bottom = '32px';
  btn.style.width = '48px';
  btn.style.height = '48px';
  btn.style.borderRadius = '50%';
  btn.style.background = 'linear-gradient(90deg, #4f8cff 0%, #6ed6ff 100%)';
  btn.style.color = '#fff';
  btn.style.fontSize = '2rem';
  btn.style.border = 'none';
  btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
  btn.style.cursor = 'pointer';
  btn.style.zIndex = '1000';
  btn.style.display = 'none';
  btn.style.transition = 'opacity 0.3s';
  document.body.appendChild(btn);
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      btn.style.display = 'block';
      btn.style.opacity = '1';
    } else {
      btn.style.opacity = '0';
      setTimeout(() => { btn.style.display = 'none'; }, 300);
    }
  });
}

// スキル・ポートフォリオ項目のフェードイン・スライドイン
function animateOnScroll() {
  const targets = document.querySelectorAll('.skill-item, .portfolio-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.2 });
  targets.forEach(el => {
    el.classList.add('pre-fade');
    observer.observe(el);
  });
}

// サイト訪問時のウェルカムメッセージ表示
function showWelcomeModal() {
  if (sessionStorage.getItem('welcomeShown')) return;
  const modal = document.createElement('div');
  modal.id = 'welcomeModal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(79,140,255,0.15)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = '2000';
  modal.innerHTML = `
    <div style="background: #fff; border-radius: 16px; box-shadow: 0 4px 32px rgba(79,140,255,0.12); padding: 40px 32px; text-align: center; max-width: 320px;">
      <h2 style="color: #4f8cff; margin-bottom: 18px;">ようこそ！</h2>
      <p style="font-size: 1.1rem; color: #222; margin-bottom: 24px;">ポートフォリオサイトにご訪問いただきありがとうございます。</p>
      <button id="closeWelcome" style="background: linear-gradient(90deg, #4f8cff 0%, #6ed6ff 100%); color: #fff; border: none; border-radius: 8px; padding: 10px 24px; font-size: 1rem; cursor: pointer;">閉じる</button>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById('closeWelcome').onclick = () => {
    modal.remove();
    sessionStorage.setItem('welcomeShown', '1');
  };
}

window.addEventListener('DOMContentLoaded', () => {
  loadComponent('header', './components/header.html');
  loadComponent('hero', './components/hero.html');
  loadComponent('skills', './components/skills.html');
  loadComponent('profile', './components/profile.html');
  loadComponent('portfolio', './components/portfolio.html');
  loadComponent('contact', './components/contact.html');
  loadComponent('footer', './components/footer.html');
  createScrollTopButton();
  animateOnScroll();
  showWelcomeModal();
});
