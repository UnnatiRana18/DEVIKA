document.addEventListener("DOMContentLoaded", () => {
  /* ---------- SIDE GALLERY (manual + auto) ---------- */
  const images = [
    "images/gallery1.jpg",
    "images/gallery2.jpg",
    "images/gallery3.jpg",
    "images/gallery4.jpg"
  ];
  let currentIndex = 0;
  const galleryImage = document.getElementById("galleryImage");
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  function showGalleryImage(index) {
    galleryImage.src = images[index];
  }

  leftBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showGalleryImage(currentIndex);
  });

  rightBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showGalleryImage(currentIndex);
  });

  // Auto slide every 5s (pauses while user hovers)
  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showGalleryImage(currentIndex);
  }, 5000);

  document.querySelector(".side-gallery")?.addEventListener("mouseenter", () => clearInterval(autoSlide));
  document.querySelector(".side-gallery")?.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      showGalleryImage(currentIndex);
    }, 5000);
  });

  showGalleryImage(currentIndex);

  /* ---------- COUNTDOWN ---------- */
  // set the launch date here
  const countdownDate = new Date("December 31, 2025 23:59:59").getTime();

  function pad(n) { return n.toString().padStart(2, "0"); }

  function updateCountdown() {
    const now = Date.now();
    const dist = countdownDate - now;

    if (dist <= 0) {
      document.querySelector(".countdown").innerHTML = "<div style='padding:12px; color:#fff; font-weight:700;'>We Have Launched!</div>";
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
  updateCountdown(); // initial call



  /* ---------- SMOOTH SCROLL FOR NAV LINKS ---------- */
  document.querySelectorAll('header nav a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
