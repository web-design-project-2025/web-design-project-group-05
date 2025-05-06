let recipes = [];
let shownRecipes = {};

// Load recipe data and set up event listeners
async function loadData() {
  const recipeResponse = await fetch("json/recipe.json");
  const recipeJSON = await recipeResponse.json();
  recipes = recipeJSON.recipe;

  // Add event listeners to each category card
  const categoryCards = document.querySelectorAll(".food-orakel-grid");

  categoryCards.forEach((categoryCard) => {
    setupCardClick(categoryCard); // Set up the click behavior for each card
  });
}

// Attach click listener to a card
function setupCardClick(categoryCard) {
  const category = categoryCard.dataset.category;

  // Clone and replace to remove old listeners
  const newCard = categoryCard.cloneNode(true);
  categoryCard.parentNode.replaceChild(newCard, categoryCard);

  // Add click to show recipe
  newCard.addEventListener("click", () => {
    const filteredRecipes = recipes.filter(
      (recipe) => recipe.category === category
    );
    showRandomRecipe(filteredRecipes, newCard);
  });
}

// Show a random recipe from the filtered list
function showRandomRecipe(filteredRecipes, categoryCard) {
  const category = categoryCard.dataset.category;

  // Shuffle recipes if first time
  if (!shownRecipes[category]) {
    shownRecipes[category] = shuffle(filteredRecipes);
  }

  // Get next recipe
  const nextRecipe = shownRecipes[category].shift();

  categoryCard.innerHTML = ""; // Clear content

  // Create a link to the recipe page
  const link = document.createElement("a");
  link.href = `recipes-page.html?id=${nextRecipe.id}`;
  link.style.textDecoration = "none";

  // Recipe image
  const image = document.createElement("img");
  image.src = nextRecipe.image;
  image.alt = nextRecipe.name;
  image.classList.add("recipe-image");

  // Recipe caption
  const caption = document.createElement("figcaption");
  caption.textContent = nextRecipe.name;

  // Add image + caption to link
  link.appendChild(image);
  link.appendChild(caption);
  categoryCard.appendChild(link);

  // Create reset button
  const resetButton = document.createElement("button");
  resetButton.textContent = "Start Again";
  resetButton.classList.add("reset-button");

  resetButton.addEventListener("click", (e) => {
    e.preventDefault(); // Don't follow link
    resetCategoryCard(categoryCard); // Reset card
    setupCardClick(categoryCard); // Reattach click
  });

  categoryCard.appendChild(resetButton);
  categoryCard.classList.add("showing-recipes");

  // Reshuffle if no more recipes
  if (shownRecipes[category].length === 0) {
    shownRecipes[category] = shuffle(filteredRecipes);
  }
}

// Reset the card to oracle image
function resetCategoryCard(categoryCard) {
  const category = categoryCard.dataset.category;

  categoryCard.innerHTML = `
    <img src="img-categories/food-oracle.jpg" alt="Image for food oracle" />
    <figcaption>${capitalizeFirstLetter(category)}</figcaption>
  `;

  categoryCard.classList.remove("showing-recipes");
}

// Capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Shuffle an array
function shuffle(array) {
  let index = array.length;

  while (index > 0) {
    let randomIndex = Math.floor(Math.random() * index);
    index--;
    let item = array[index];
    array[index] = array[randomIndex];
    array[randomIndex] = item;
  }

  return array;
}

loadData();
