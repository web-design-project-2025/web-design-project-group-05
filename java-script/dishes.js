let recipes = [];

async function loadData() {
  const recipeResponse = await fetch("json/recipe.json");
  const recipeJSON = await recipeResponse.json();
  recipes = recipeJSON.recipes;
  console.log(recipeJSON);
  displayRecipes(recipes);
}

function displayRecipes(recipes) {
  const recipeListContainer = document.getElementById("recipe-list");

  recipes.forEach((recipe) => {
    const recipeInfo = document.createElement("div");
    recipeInfo.classList.add("recipe-info");

    // Image
    const imageContainer = document.createElement("img");
    imageContainer.classList.add("recipe-image");
    imageContainer.src = recipe.image;
    recipeInfo.appendChild(imageContainer);

    // Name
    const nameContainer = document.createElement("h2");
    nameContainer.textContent = recipe.name;
    recipeInfo.appendChild(nameContainer);

    // Preparation time
    const prepContainer = document.createElement("p");
    prepContainer.textContent = recipe.time;
    recipeInfo.appendChild(prepContainer);

    // Add the recipe information to the list
    recipeListContainer.appendChild(recipeInfo);
  });
}

loadData();
