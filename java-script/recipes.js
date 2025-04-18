let recipes = [];

async function loadData() {
  const recipeResponse = await fetch("json/recipe.json");
  const recipeJSON = await recipeResponse.json();
  recipes = recipeJSON.recipes;
  console.log(recipeJSON);
  displayRecipe(recipes[0]);
}

function displayRecipe(recipe) {
  //Image
  const imageContainer = document.getElementById("image");

  const imageElement = document.createElement("img");
  imageElement.classList.add("picture");
  imageElement.src = recipe.image;
  imageContainer.appendChild(imageElement);

  //Name
  const nameContainer = document.getElementById("name");
  nameContainer.innerText = recipe.name;

  //Prep time
  const prepContainer = document.getElementById("time");
  prepContainer.innerText = recipe.time;

  //Servings
  const servingsContainer = document.getElementById("servings");
  servingsContainer.innerText = recipe.servings;

  //Nutrition Facts
  const nutritionContainer = document.getElementById("nutrition-facts");
  const nutrition = recipe.nutrition_facts;

  nutritionContainer.innerHTML = "";

  for (let key in nutrition) {
    const p = document.createElement("p");
    p.textContent = `${key}: ${nutrition[key]}`;
    nutritionContainer.appendChild(p);
  }

  //Ingredients
  const ingredientsContainer = document.getElementById("ingredients");

  recipe.ingredients.forEach((ingredient) => {
    const ingredientElement = document.createElement("div");
    ingredientElement.classList.add("stop");
    ingredientElement.textContent = ingredient;
    //ingredientsContainer.appendChild(ingredientElement);

    //function to click it
    ingredientElement.addEventListener("click", () => {
      ingredientElement.classList.toggle("selected");
    });
    ingredientsContainer.appendChild(ingredientElement);
  });

  //Instructions
  const instructionsContainer = document.getElementById("instructions");

  recipe.instructions.forEach((instruction) => {
    const stepElement = document.createElement("div");
    stepElement.classList.add("steps");
    stepElement.textContent = instruction;
    //instructionsContainer.appendChild(stepElement);

    stepElement.addEventListener("click", () => {
      stepElement.classList.toggle("selected");
    });
    instructionsContainer.appendChild(stepElement);
  });
}

loadData();
