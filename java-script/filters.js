document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleFilters");
  const filterBar = document.getElementById("filterBar");

  toggleBtn.addEventListener("click", () => {
    const isVisible = filterBar.style.display === "block";
    filterBar.style.display = isVisible ? "none" : "block";
  });
});
