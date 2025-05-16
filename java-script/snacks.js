let recipes = [];
let filteredByCategory = [];

document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
});

async function loadData() {
  const recipeResponse = await fetch("json/recipe.json");
  const recipeJSON = await recipeResponse.json();
  recipes = recipeJSON.recipe;

  //filter from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter, accessed: 25.04.25
  // Filter recipes by category
  filteredByCategory = recipes.filter((recipe) => recipe.category === "snacks");

  displayRecipes(filteredByCategory);

  // Search functionality
  // The way how to make working search bar was learnt and modified from this video: https://www.youtube.com/watch?v=ifi6dXOl3g4&list=LL&index=5&t=299s&ab_channel=Treehouse
  const nameSearch = document.getElementById("nameSearch");
  if (nameSearch) {
    nameSearch.addEventListener("keyup", (e) => {
      let currentValue = e.target.value.toLowerCase();

      const filteredRecipes = filteredByCategory.filter((recipe) => {
        const nameMatch = recipe.name?.toLowerCase().includes(currentValue);
        const servingsMatch = recipe.servings?.value
          ?.toString()
          .includes(currentValue);
        const prepTimeMatch = recipe.time?.value
          ?.toString()
          .includes(currentValue);

        // Debug check
        if (!Array.isArray(recipe.ingredients)) {
          console.warn(
            `Recipe "${recipe.name}" has no valid ingredients array`
          );
        }

        const ingredientsMatch = Array.isArray(recipe.ingredients)
          ? recipe.ingredients.some((item) =>
              item.ingredient?.toLowerCase().includes(currentValue)
            )
          : false;

        return nameMatch || servingsMatch || prepTimeMatch || ingredientsMatch;
      });

      const recipeListContainer = document.getElementById("recipe-list");
      recipeListContainer.innerHTML = "";
      displayRecipes(filteredRecipes);
    });
  } else {
    console.warn("#nameSearch input not found on page");
  }
}

function displayRecipes(recipes) {
  const recipeListContainer = document.getElementById("recipe-list");

  recipes.forEach((recipe) => {
    // Recipe card container
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    //help from ChatGPT to create a link that links to each recipe: https://chatgpt.com/share/6806528c-4c58-8010-9bf9-5cd9f6f9f436, accessed: 21.04.25
    //create link to go to correct recipe
    const link = document.createElement("a");
    link.href = `recipes-page.html?id=${recipe.id}`;
    link.classList.add("recipe-card-link");

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
    prepContainer.innerText = `${recipe.time.value} ${recipe.time.unit}`;
    recipeInfo.appendChild(prepContainer);

    // Save icon
    const saveIcon = document.createElement("i");
    saveIcon.classList.add("fa-bookmark", "save-icon");

    // Check if the recipe is already saved
    let saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    const isSaved = saved.find((r) => r.id === recipe.id);
    if (isSaved) {
      saveIcon.classList.add("fa-solid", "saved"); // black fill
    } else {
      saveIcon.classList.add("fa-regular", "not-saved"); // white fill
    }

    // Click event - save/unsave
    saveIcon.addEventListener("click", () => {
      let updatedSaved = JSON.parse(localStorage.getItem("savedRecipes")) || [];

      /* find and filter method inspired by this website: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find */
      const alreadySaved = updatedSaved.find((r) => r.id === recipe.id);
      if (alreadySaved) {
        // Remove from saved
        updatedSaved = updatedSaved.filter((r) => r.id !== recipe.id);
        localStorage.setItem("savedRecipes", JSON.stringify(updatedSaved));

        saveIcon.classList.remove("fa-solid", "saved");
        saveIcon.classList.add("fa-regular", "not-saved");
      } else {
        // Add to saved
        updatedSaved.push(recipe);
        localStorage.setItem("savedRecipes", JSON.stringify(updatedSaved));

        saveIcon.classList.remove("fa-regular", "not-saved");
        saveIcon.classList.add("fa-solid", "saved");
      }
    });

    // Append info and icon to card
    link.appendChild(image);
    link.appendChild(recipeInfo);
    recipeCard.appendChild(link);
    recipeCard.appendChild(saveIcon);

    // Add the full recipe card to the list
    recipeListContainer.appendChild(recipeCard);
  });
}
