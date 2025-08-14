document.addEventListener("DOMContentLoaded", () => {
  /* ---------- DESIGN SLIDER (prev/next + auto + pause on hover) ---------- */
  document.querySelectorAll(".design-slider").forEach((slider) => {
    const track = slider.querySelector(".slides");
    const slides = Array.from(track.querySelectorAll("img"));
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");

    // Ensure horizontal layout works even if CSS is missing
    track.style.display = "flex";
    track.style.transition = "transform 0.6s ease-in-out";
    slides.forEach((img) => {
      img.style.width = "100%";
      img.style.flexShrink = "0";
      img.style.userSelect = "none";
      img.draggable = false;
    });

    let index = 0;
    const go = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
    };

    prevBtn?.addEventListener("click", () => go(index - 1));
    nextBtn?.addEventListener("click", () => go(index + 1));

    // Auto-slide
    let auto = setInterval(() => go(index + 1), 4000);
    const stop = () => clearInterval(auto);
    const start = () => (auto = setInterval(() => go(index + 1), 4000));

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);

    // Touch swipe (mobile)
    let startX = 0;
    slider.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
    slider.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) dx > 0 ? go(index - 1) : go(index + 1);
    });

    go(0);
  });

  /* ---------- COUNTDOWN ---------- */
  // Safer cross-browser date (months are 0-based: 11 = December)
  const countdownDate = new Date(2025, 11, 31, 23, 59, 59).getTime();

  const pad = (n) => n.toString().padStart(2, "0");

  function updateCountdown() {
    const now = Date.now();
    const dist = countdownDate - now;

    if (dist <= 0) {
      document.querySelector(".countdown").innerHTML =
        "<div style='padding:12px; color:#fff; font-weight:700;'>We Have Launched!</div>";
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(dist / (1000 * 60 * 60 * 24));
    const hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((dist % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = pad(days);
    document.getElementById("hours").textContent = pad(hours);
    document.getElementById("minutes").textContent = pad(minutes);
    document.getElementById("seconds").textContent = pad(seconds);
  }

  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  /* ---------- SMOOTH SCROLL FOR NAV LINKS ---------- */
  document.querySelectorAll('header nav a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});


