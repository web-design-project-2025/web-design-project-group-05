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

  // Remove old listeners by cloning the node
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

  // If no recipes have been shown yet for this category, shuffle them
  if (!shownRecipes[category]) {
    // The idea to use the function "shuffle" was taken from here: https://p5js.org/reference/p5/shuffle/
    shownRecipes[category] = shuffle(filteredRecipes);
  }

  // Get the next recipe from the shuffled list
  const nextRecipe = shownRecipes[category].shift();

  categoryCard.innerHTML = ""; // Clear the card content

  // Create a clickable link to the recipe page
  const link = document.createElement("a");
  link.href = `recipes-page.html?id=${nextRecipe.id}`;
  link.style.textDecoration = "none";

  // Add the recipe image
  const image = document.createElement("img");
  image.src = nextRecipe.image;
  image.alt = nextRecipe.name;
  image.classList.add("recipe-image");

  // Add the recipe name as caption
  const caption = document.createElement("figcaption");
  caption.textContent = nextRecipe.name;

  link.appendChild(image);
  link.appendChild(caption);
  categoryCard.appendChild(link);

  // Create the "Start Again" button
  const resetButton = document.createElement("button");
  resetButton.textContent = "Start Again";
  resetButton.classList.add("reset-button");

  // Reset everything when button is clicked
  resetButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent link from being followed
    resetCategoryCard(categoryCard); // Restore original oracle view
    setupCardClick(categoryCard); // Re-enable click to start again
  });

  categoryCard.appendChild(resetButton);

  categoryCard.classList.add("showing-recipes");

  // If all recipes are shown, reshuffle for next round
  if (shownRecipes[category].length === 0) {
    shownRecipes[category] = shuffle(filteredRecipes);
  }
}

// Reset the card to the oracle cover image
function resetCategoryCard(categoryCard) {
  const category = categoryCard.dataset.category;

  categoryCard.innerHTML = `
    <img src="img-categories/food-oracle.jpg" alt="Image for food oracle" />
    <figcaption>${capitalizeFirstLetter(category)}</figcaption>
  `;

  categoryCard.classList.remove("showing-recipes");
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Shuffle an array randomly
// The method to shuffle the array was modified from here: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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
