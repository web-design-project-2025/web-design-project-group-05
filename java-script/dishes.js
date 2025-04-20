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
    // Recipe card container
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    // Image
    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;
    image.classList.add("recipe-image");

    // Recipe info container (for name + prep time)
    const recipeInfo = document.createElement("div");
    recipeInfo.classList.add("recipe-info");

    // Name
    const nameContainer = document.createElement("h2");
    nameContainer.textContent = recipe.name;
    recipeInfo.appendChild(nameContainer);

    // Preparation time
    const prepContainer = document.createElement("p");
    prepContainer.textContent = recipe.time;
    recipeInfo.appendChild(prepContainer);

    // Save button
    const saveIcon = document.createElement("i");
    saveIcon.classList.add("fa-regular", "fa-bookmark", "save-icon");
    saveIcon.addEventListener("click", () => {
      saveIcon.classList.toggle("fa-regular");
      saveIcon.classList.toggle("fa-solid");
    });

    // Append info and icon to card
    recipeCard.appendChild(image);
    recipeCard.appendChild(recipeInfo);
    recipeCard.appendChild(saveIcon);

    // Add the full recipe card to the list
    recipeListContainer.appendChild(recipeCard);
  });
}

loadData();
