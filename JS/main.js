// 畫面載入後初始化
window.addEventListener("DOMContentLoaded", () => {
  console.log("DYFENCO 網站已載入");

  // 淡入動畫
  const fadeElements = document.querySelectorAll('.animate-fade');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => observer.observe(el));

  // 漢堡選單
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });
  }
});

const gallery = document.getElementById("carousel");
const dotsContainer = document.getElementById("carousel-dots");
const images = gallery?.querySelectorAll("img") || [];
let carouselIndex = 0;

setInterval(() => {
  images[carouselIndex].classList.remove('active');
  carouselIndex = (carouselIndex + 1) % images.length;
  images[carouselIndex].classList.add('active');
}, 5000); // 例如 5 秒一輪

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

if (gallery && dotsContainer) {
  createDots();
  setInterval(() => scrollGallery(1), 5000); // 自動輪播每 5 秒
}

const newsItems = document.querySelectorAll('#news-rotator .news-item');
let newsIndex = 0;

setInterval(() => {
  newsItems[newsIndex].classList.remove('active');
  newsIndex = (newsIndex + 1) % newsItems.length;
  newsItems[newsIndex].classList.add('active');
}, 3000);

const langBtn = document.querySelector('.language-btn');
const langMenu = document.querySelector('.language-menu');

langBtn.addEventListener('click', () => {
  langMenu.classList.toggle('active');
});

const currentPath = window.location.pathname.split("/").pop();
const container = document.getElementById("about-tabs");

// 判斷是否為英文頁面（可依據路徑含 en、-en、或資料夾）
const isEnglish = currentPath.includes("-en");

// 中英文 tab 對照
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
