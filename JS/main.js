// -------------------- 畫面載入與動畫初始化 --------------------
window.addEventListener("DOMContentLoaded", () => {
  console.log("DYFENCO 網站已載入");

  // 1. 淡入動畫
  const fadeElements = document.querySelectorAll('.animate-fade');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => observer.observe(el));

  // 2. 漢堡選單功能（如果有 mobileMenu）
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });
  }

  // 3. 語言選單點擊功能
  const langBtn = document.querySelector('.language-btn');
  const langMenu = document.querySelector('.language-menu');
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', () => {
      langMenu.classList.toggle('active');
    });
  }

  // 4. 最新消息自動切換（如果有 news rotator 區塊）
  const newsItems = document.querySelectorAll('#news-rotator .news-item');
  let newsIndex = 0;
  if (newsItems.length > 0) {
    setInterval(() => {
      newsItems[newsIndex].classList.remove('active');
      newsIndex = (newsIndex + 1) % newsItems.length;
      newsItems[newsIndex].classList.add('active');
    }, 3000);
  }

  // 5. 圖片輪播邏輯
  const gallery = document.getElementById("carousel");
  const dotsContainer = document.getElementById("carousel-dots");
  const images = gallery?.querySelectorAll("img") || [];
  let carouselIndex = 0;

  function scrollToSlide(index) {
    const scrollAmount = gallery.clientWidth * index;
    gallery.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    });
    updateDots(index);
    currentIndex = index;
  }

  function scrollGallery(direction) {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    scrollToSlide(newIndex);
  }

  function updateDots(index) {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function createDots() {
    images.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => scrollToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  if (gallery && dotsContainer && images.length > 0) {
    createDots();
    setInterval(() => scrollGallery(1), 5000);
  }

  // 6. 關於頁面上方的 tab 導覽（公司簡介 / 我們的目標 / 實驗室）
  const currentPath = window.location.pathname.split("/").pop();
  const container = document.getElementById("about-tabs");
  if (container) {
    const isEnglish = currentPath.includes("-en");
    const tabs = isEnglish
      ? [
        { path: "about-en.html", label: "Company Profile" },
        { path: "about-goal-en.html", label: "Our Mission" },
        { path: "about-lab-en.html", label: "MORE LAB" }
      ]
      : [
        { path: "about.html", label: "公司簡介" },
        { path: "about-goal.html", label: "我們的目標" },
        { path: "about-lab.html", label: "實驗室介紹" }
      ];

    container.innerHTML = tabs
      .map((tab, index) => {
        const isActive = tab.path === currentPath;
        const html = `<a href="${tab.path}" class="tab-link${isActive ? ' active' : ''}">${tab.label}</a>`;
        const separator = index < tabs.length - 1 ? '<span class="tab-separator"> / </span>' : '';
        return html + separator;
      })
      .join('');
  }
  fetch('search-data.json')
    .then(response => response.json())
    .then(data => {
      const input = document.getElementById('search-input');
      const resultBox = document.getElementById('search-results');
      if (!input || !resultBox) return;

      input.addEventListener('input', function () {
        const keyword = this.value.trim().toLowerCase();
        resultBox.innerHTML = '';

        if (!keyword) return;

        const filtered = data.filter(item =>
          item.title.toLowerCase().includes(keyword) ||
          item.content.toLowerCase().includes(keyword)
        );

        if (filtered.length === 0) {
          resultBox.innerHTML = '<li class="list-group-item">沒有找到相關內容。</li>';
        } else {
          filtered.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `<a href="${item.url}">${item.title}</a>`;
            resultBox.appendChild(li);
          });
        }
      });
    })
    .catch(err => console.error('搜尋資料載入失敗:', err));
});



