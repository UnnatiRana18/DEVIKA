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
    if (galleryImage) {
      galleryImage.src = images[index];
    }
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

  document.querySelector(".side-gallery")?.addEventListener("mouseenter", () =>
    clearInterval(autoSlide)
  );

  document.querySelector(".side-gallery")?.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      showGalleryImage(currentIndex);
    }, 5000);
  });

  // Show first image on load
  showGalleryImage(currentIndex);

  /* ---------- COUNTDOWN ---------- */
  // Set the target date (Year, Month[0-based], Day, Hour, Minute, Second)
const countdownDate = new Date(2026, 0, 1, 0, 0, 0).getTime();



  function updateCountdown() {
    console.log("Countdown running", new Date());

    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance <= 0) {
      const countdownEl = document.querySelector(".countdown");
      if (countdownEl) {
        countdownEl.innerHTML = "<h3>We Have Launched!</h3>";
      }
      clearInterval(timer);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
  }

  const timer = setInterval(updateCountdown, 1000);
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




  /* ---------- SMOOTH SCROLL FOR NAV LINKS ---------- */
  document.querySelectorAll('header nav a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

