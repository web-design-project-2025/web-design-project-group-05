let recipes = [];

async function loadData() {
  const recipeResponse = await fetch("json/recipe.json");
  const recipeJSON = await recipeResponse.json();
  recipes = recipeJSON.recipe;

  // Add event listeners to each category figure
  const categoryCards = document.querySelectorAll(".food-orakel-grid");

  categoryCards.forEach((categoryCard) => {
    categoryCard.addEventListener("click", () => {
      const category = categoryCard.dataset.category;
      const isShowingRecipe =
        categoryCard.classList.contains("showing-recipes");

      if (isShowingRecipe) {
        resetCategoryCard(categoryCard);
      } else {
        const filteredRecipes = recipes.filter(
          (recipe) => recipe.category === category
        );
        showRandomRecipe(filteredRecipes, categoryCard);
      }
    });
  });
}

function showRandomRecipe(filteredRecipes, categoryCard) {
  const randomRecipe =
    filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];

  categoryCard.innerHTML = ""; // Clear the figure content

  const link = document.createElement("a");
  link.href = `recipes-page.html?id=${randomRecipe.id}`;
  link.style.textDecoration = "none";

  const image = document.createElement("img");
  image.src = randomRecipe.image;
  image.alt = randomRecipe.name;
  image.classList.add("recipe-image");

  const caption = document.createElement("figcaption");
  caption.textContent = randomRecipe.name;

  link.appendChild(image);
  link.appendChild(caption);
  categoryCard.appendChild(link);

  categoryCard.classList.add("showing-recipes");
}

function resetCategoryCard(categoryCard) {
  const category = categoryCard.dataset.category;

  categoryCard.innerHTML = `
    <img src="img-categories/food-oracle.jpg" alt="Image for food oracle" />
    <figcaption>${capitalizeFirstLetter(category)}</figcaption>
  `;

  categoryCard.classList.remove("showing-recipes");
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

loadData();
