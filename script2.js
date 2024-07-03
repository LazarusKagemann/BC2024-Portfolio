document.addEventListener("DOMContentLoaded", function () {
  const banner = document.querySelector(".banner");
  const toggleBannerBtn = document.getElementById("toggleBannerBtn");

  toggleBannerBtn.addEventListener("click", function () {
    banner.classList.toggle("hidden");
    if (banner.classList.contains("hidden")) {
      toggleBannerBtn.textContent = "+";
    } else {
      toggleBannerBtn.textContent = "-";
    }
  });
});
