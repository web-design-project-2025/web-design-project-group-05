let recipes = [];
let categories = [];

async function loadData() {
  // Fetch the recipe data
  const recipeResponse = await fetch("json/recipe.json");
  const recipeJSON = await recipeResponse.json();
  recipes = recipeJSON.recipe;

  // Fetch the category data
  const categoryResponse = await fetch("json/category.json");
  const categoryJSON = await categoryResponse.json();
  categories = categoryJSON.category;

  //The following 3 lines are from: https://chatgpt.com/share/6806528c-4c58-8010-9bf9-5cd9f6f9f436 accessed: 21.04
  //Get recipe ID from URL
  const params = new URLSearchParams(window.location.search);
  const recipeId = parseInt(params.get("id"));

  //Finding the matching recipe
  const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);
  if (selectedRecipe) {
    // If the recipe is found, display it
    displayRecipe(selectedRecipe);
  } else {
    // If not found, log an error
    console.error("Recipe could not be found");
  }
}

//help from: https://chatgpt.com/c/680f38e7-7d10-8010-92f8-8a2025786ccf, accessed: 28.04.25
//Save ingredients in local storage
const buttonElement = document.getElementById("button-list");

buttonElement.addEventListener("click", () => {
  const params = new URLSearchParams(window.location.search);
  const recipeId = parseInt(params.get("id"));
  const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);

  if (selectedRecipe) {
    //Use one key per recipe
    const storageKey = `recipeIngredients_${recipeId}`;
    const simplifiedIngredients = selectedRecipe.ingredients.map(
      (ingredient) => ({
        amount: ingredient.amount,
        unit: ingredient.unit,
        ingredient: ingredient.ingredient,
      })
    );
    localStorage.setItem(storageKey, JSON.stringify(simplifiedIngredients));

    window.location.href = "shopping-list.html";
  } else {
    console.error("Recipe not found");
  }
});

function displayRecipe(recipe) {
  // Image
  const imageContainer = document.getElementById("image");
  const imageElement = document.createElement("img");
  imageElement.classList.add("picture");
  imageElement.src = recipe.image;
  imageElement.alt = recipe.name;
  imageContainer.appendChild(imageElement);

  // Name
  const nameContainer = document.getElementById("name");
  nameContainer.innerText = recipe.name;

  // Save button
  const saveContainer = document.getElementById("saved-button");
  saveContainer.innerHTML = "";

  const saveIcon = document.createElement("i");
  saveIcon.classList.add("fa-regular", "fa-bookmark", "save-icon");
  saveIcon.addEventListener("click", () => {
    saveIcon.classList.toggle("fa-regular");
    saveIcon.classList.toggle("fa-solid");
  });
  saveContainer.appendChild(saveIcon);

  // Prep time
  const prepContainer = document.getElementById("time");
  prepContainer.innerText = `${recipe.time.value} ${recipe.time.unit}`;

  // Servings
  const servingsContainer = document.getElementById("servings");
  servingsContainer.innerText = `${recipe.servings.value} ${recipe.servings.unit}`;

  // Nutrition Facts
  const nutritionButtonElement = document.getElementById("button-nutrition");
  const nutritionContainer = document.getElementById("nutrition-facts");

  nutritionButtonElement.addEventListener("click", () => {
    if (nutritionContainer.innerHTML !== "") {
      nutritionContainer.innerHTML = "";
      nutritionButtonElement.innerHTML = "+";
    } else {
      const nutrition = recipe.nutrition_facts;
      nutritionContainer.innerHTML = "";
      nutritionButtonElement.innerHTML = "-";

      for (let key in nutrition) {
        const facts = document.createElement("p");
        facts.textContent = `${key}: ${nutrition[key]}`;
        facts.classList.add("facts-style");
        nutritionContainer.appendChild(facts);
      }
    }
  });

  // Ingredients
  const ingredientsContainer = document.getElementById("ingredients");
  ingredientsContainer.innerHTML = "";

  recipe.ingredients.forEach((ingredient) => {
    const ingredientElement = document.createElement("div");
    ingredientElement.classList.add("ingredients-steps");

    //show comment with bracets
    const comment = ingredient.comment ? ` (${ingredient.comment})` : "";

    const allIngredients = `${ingredient.amount ?? ""} ${
      ingredient.unit ?? ""
    } ${ingredient.ingredient}${comment}`.trim();
    ingredientElement.textContent = allIngredients;

    ingredientElement.addEventListener("click", () => {
      ingredientElement.classList.toggle("selected");
    });

    ingredientsContainer.appendChild(ingredientElement);
  });

  // Instructions
  const instructionsContainer = document.getElementById("instructions");

  recipe.instructions.forEach((instruction) => {
    const stepElement = document.createElement("div");
    stepElement.classList.add("instruction-steps");
    stepElement.textContent = instruction;

    stepElement.addEventListener("click", () => {
      stepElement.classList.toggle("selected");
    });
    instructionsContainer.appendChild(stepElement);
  });
}

loadData();

//Saves Text (value) from Note section in local storage
// this EventListener got improved by ChatGPT: https://chatgpt.com/share/68060237-8e2c-8010-a991-fc0379d8b15b, accessed: 21.04.25
document.addEventListener("DOMContentLoaded", () => {
  const inputElement = document.getElementById("textarea");

  //Get recipe ID from URL
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get("id");

  //Use one key per recipe
  const storageKey = `recipeNotes_${recipeId}`;

  // Load saved notes if they exist
  const savedNotes = localStorage.getItem(storageKey);
  if (savedNotes) {
    inputElement.value = savedNotes;
  }

  // Save notes as the user types
  inputElement.addEventListener("input", () => {
    localStorage.setItem(storageKey, inputElement.value);
  });
});
