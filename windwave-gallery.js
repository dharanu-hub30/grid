// WindWave – lightbox for the gallery + animated counters
(function () {
  var gallery = document.getElementById("wwGallery");
  var box = document.getElementById("wwLightbox");
  var boxImg = document.getElementById("wwLightboxImg");
  var closeBtn = document.getElementById("wwClose");

  function openBox(src, alt) {
    boxImg.src = src;
    boxImg.alt = alt || "";
    box.classList.add("open");
    box.setAttribute("aria-hidden", "false");
  }
  function closeBox() {
    box.classList.remove("open");
    box.setAttribute("aria-hidden", "true");
  }

  gallery.addEventListener("click", function (e) {
    var img = e.target.closest("figure") && e.target.closest("figure").querySelector("img");
    if (img) openBox(img.src, img.alt);
  });
  closeBtn.addEventListener("click", closeBox);
  box.addEventListener("click", function (e) { if (e.target === box) closeBox(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeBox(); });

  // Animated counters
  var nums = document.querySelectorAll(".ww-num");
  function animate(el) {
    var target = +el.dataset.target, cur = 0, step = Math.max(1, Math.round(target / 50));
    var t = setInterval(function () {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = cur;
    }, 25);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animate(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    nums.forEach(function (n) { io.observe(n); });
  } else {
    nums.forEach(animate);
  }
})();
