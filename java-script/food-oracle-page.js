let recipes = [];
let shownRecipes = {};

// Load recipe data and set up event listeners
async function loadData() {
  // Get the recipe data from the JSON file
  const recipeResponse = await fetch("json/recipe.json");
  const recipeJSON = await recipeResponse.json();
  recipes = recipeJSON.recipe;

  // Add event listeners to each category card
  const categoryCards = document.querySelectorAll(".food-orakel-grid");

  // Set up click behavior for each card
  categoryCards.forEach((categoryCard) => {
    setupCardClick(categoryCard);
  });
}

// Set up what happens when you click a card (show a recipe)
function setupCardClick(categoryCard) {
  const category = categoryCard.dataset.category;

  // Clone the card to remove any old click listeners
  const newCard = categoryCard.cloneNode(true);
  categoryCard.parentNode.replaceChild(newCard, categoryCard);

  newCard.addEventListener("click", () => {
    // Filter the recipe list to only recipes for that category
    const filteredRecipes = recipes.filter(
      (recipe) => recipe.category === category
    );
    showRandomRecipe(filteredRecipes, newCard);
  });
}

// Show a random recipe on the card
function showRandomRecipe(filteredRecipes, categoryCard) {
  const category = categoryCard.dataset.category;

  // Shuffle recipes once per category, if it's the first time
  if (!shownRecipes[category]) {
    // The idea to use the function "shuffle" was taken from here: https://p5js.org/reference/p5/shuffle/
    shownRecipes[category] = shuffle(filteredRecipes);
  }

  // Take the first recipe from the shuffled list
  const nextRecipe = shownRecipes[category].shift();

  // Clear the old content in the card
  categoryCard.innerHTML = "";

  // Create a link that leads to the full recipe page
  const link = document.createElement("a");
  link.href = `recipes-page.html?id=${nextRecipe.id}`;
  link.style.textDecoration = "none"; // Remove underline from link

  // Create the recipe image
  const image = document.createElement("img");
  image.src = nextRecipe.image;
  image.alt = nextRecipe.name;
  image.classList.add("recipe-image");

  // Create the recipe title
  const caption = document.createElement("figcaption");
  caption.textContent = nextRecipe.name;

  // Add the image and caption to the link
  link.appendChild(image);
  link.appendChild(caption);

  // Add the link to the card
  categoryCard.appendChild(link);

  // Create a "Start Again" button to reset the card
  const resetButton = document.createElement("button");
  resetButton.textContent = "Start Again";
  resetButton.classList.add("reset-button");

  // When clicked, the card goes back to its original state
  resetButton.addEventListener("click", (e) => {
    e.preventDefault(); // Stop the link from opening
    resetCategoryCard(categoryCard);
    setupCardClick(categoryCard); // Add click listener again
  });

  // Add the reset button to the card
  categoryCard.appendChild(resetButton);

  // Add a class to show that the card is now showing a recipe
  categoryCard.classList.add("showing-recipes");

  // If we’ve shown all recipes in this category, reshuffle them
  if (shownRecipes[category].length === 0) {
    shownRecipes[category] = shuffle(filteredRecipes);
  }
}

// Reset a card back to its original image and title
function resetCategoryCard(categoryCard) {
  const category = categoryCard.dataset.category;

  categoryCard.innerHTML = `
    <img src="img-categories/food-oracle.jpg" alt="Image for food oracle" />
    <figcaption>${capitalizeFirstLetter(category)}</figcaption>
  `;

  // Remove recipe view styling
  categoryCard.classList.remove("showing-recipes");
}

// Capitalize the first letter of a word 
function capitalizeFirstLetter(string) {
    // The idea to use "charAt" was taken from here: https://www.w3schools.com/jsref/jsref_charat.asp
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Shuffle an array randomly
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

// The function  to handle the checkboxes to show/hide categories
function setupFilters() {
  // Get all checkbox inputs inside the filter bar
  const checkboxes = document.querySelectorAll(
    ".filters-group input[type='checkbox']"
  );

  // Get all category cards
  const categoryCards = document.querySelectorAll(".food-orakel-grid");

  // For each checkbox, watch when it's checked or unchecked
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const selectedValue = checkbox.value;

      // Show or hide the category card based on whether the box is checked
      categoryCards.forEach((card) => {
        const cardCategory = card.dataset.category;

        if (cardCategory === selectedValue) {
          card.style.display = checkbox.checked ? "flex" : "none";
        }
      });
    });
  });

  // Run once when the page loads to hide all unchecked categories
  checkboxes.forEach((checkbox) => {
    const selectedValue = checkbox.value;

    categoryCards.forEach((card) => {
      const cardCategory = card.dataset.category;

      if (cardCategory === selectedValue && !checkbox.checked) {
        card.style.display = "none";
      }
    });
  });
}

loadData().then(() => {
  setupFilters();
});
