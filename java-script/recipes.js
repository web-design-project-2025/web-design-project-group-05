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
  image.alt = recipe.name;
  imageContainer.appendChild(imageElement);

  //Name
  const nameContainer = document.getElementById("name");
  nameContainer.innerText = recipe.name;

  // Save button
  const saveContainer = document.getElementById("saved-button");

  const saveIcon = document.createElement("i");
  saveIcon.classList.add("fa-regular", "fa-bookmark", "save-icon");
  saveIcon.addEventListener("click", () => {
    saveIcon.classList.toggle("fa-regular");
    saveIcon.classList.toggle("fa-solid");
  });

  saveContainer.appendChild(saveIcon);

  //Prep time
  const prepContainer = document.getElementById("time");
  prepContainer.innerText = recipe.time;

  //Servings
  const servingsContainer = document.getElementById("servings");
  servingsContainer.innerText = recipe.servings;

  //Nutrition Facts
  //When Button gets clicked
  const nutritionButtonElement = document.getElementById("button-nutrition");
  const nutritionContainer = document.getElementById("nutrition-facts");

  // Show facts when button is clicked and then hide again when clicked again
  nutritionButtonElement.addEventListener("click", () => {
    // If the nutrition facts are already visible, hide them. If they're hidden, show them.
    if (nutritionContainer.innerHTML !== "") {
      nutritionContainer.innerHTML = "";
      nutritionButtonElement.innerHTML = "+";
    } else {
      // If the nutrition facts are hidden, display them
      const nutrition = recipe.nutrition_facts;
      nutritionContainer.innerHTML = ""; // Clear the previous content (if any)
      nutritionButtonElement.innerHTML = "-";

      for (let key in nutrition) {
        const p = document.createElement("p");
        p.textContent = `${key}: ${nutrition[key]}`;
        nutritionContainer.appendChild(p);
      }
    }
  });

  //Ingredients
  const ingredientsContainer = document.getElementById("ingredients");

  recipe.ingredients.forEach((ingredient) => {
    const ingredientElement = document.createElement("div");
    ingredientElement.classList.add("ingredients-steps");
    ingredientElement.textContent = ingredient;
    //ingredientsContainer.appendChild(ingredientElement);

    //function to click it
    // toggle function from: https://www.w3schools.com/howto/howto_js_toggle_class.asp
    ingredientElement.addEventListener("click", () => {
      ingredientElement.classList.toggle("selected");
    });
    ingredientsContainer.appendChild(ingredientElement);
  });

  //Instructions
  const instructionsContainer = document.getElementById("instructions");

  recipe.instructions.forEach((instruction) => {
    const stepElement = document.createElement("div");
    stepElement.classList.add("instruction-steps");
    stepElement.textContent = instruction;
    //instructionsContainer.appendChild(stepElement);

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

  // Load saved notes if they exist
  const savedNotes = localStorage.getItem("recipeNotes");
  if (savedNotes) {
    inputElement.value = savedNotes;
  }

  // Save notes as the user types
  inputElement.addEventListener("input", () => {
    localStorage.setItem("recipeNotes", inputElement.value);
  });
});
