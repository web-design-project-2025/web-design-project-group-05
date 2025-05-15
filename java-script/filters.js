//filter button
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleFilters");
  const filterBar = document.getElementById("filterBar");

  toggleBtn.addEventListener("click", () => {
    const isVisible = filterBar.style.display === "block";
    filterBar.style.display = isVisible ? "none" : "block";
  });
});

//function for filter functionality
function setupFilters(recipes) {
  const checkboxes = document.querySelectorAll(
    '#filterBar input[type="checkbox"]'
  );

  /* forEach method inspired by: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach */
  // runs the function when checkboxes are checked or unchecked
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      //this gathers all the selected filters
      const activeFilters = Array.from(checkboxes)
        .filter((box) => box.checked)
        .map((box) => box.name.toLowerCase());

      // this filter the recipes based on the achecked filters
      const filteredRecipes = recipes.filter((recipe) =>
        activeFilters.every((filter) => {
          // translate filter names to category IDs
          const categoryOpt = {
            vegetarian: 2,
            vegan: 1,
            glutenfree: 3,
            lactosefree: 4,
            spicy: 5,
          };

          // check if the recipe has the matching category ID
          return recipe.category_ids.includes(categoryOpt[filter]);
        })
      );

      // update the displayed recipes
      const container = document.getElementById("recipe-list");
      container.innerHTML = ""; // clear the previous recipes
      displayRecipes(filteredRecipes); // display the filtered recipes
    });
  });
}

/* Async function was inspired by the following article: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function */
 // load the data and filter by category
async function loadData(categoryFilter) {
  const response = await fetch("json/recipe.json");
  const data = await response.json();
  const recipes = data.recipe;

  // filter recipes based on the selected category
  const categoryRecipes = recipes.filter(
    (recipe) => recipe.category === categoryFilter
  );

  setupFilters(categoryRecipes); // sets up the filters 
}