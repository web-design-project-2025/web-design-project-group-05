window.onload = function (ingredient) {
  const shoppingListElement = document.getElementById("shopping-list-item");

  shoppingListElement.innerHTML = "";

  // Loop through all keys in localStorage
  // The next 6 lines come from: https://chatgpt.com/c/680f9a3c-c188-8010-8247-4c8b117bc925, accessed: 28.04.
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    // Only take keys that start with "recipeIngredients_"
    if (key.startsWith("recipeIngredients_")) {
      const ingredientsJSON = localStorage.getItem(key);
      const ingredients = JSON.parse(ingredientsJSON);

      ingredients.forEach((ingredient) => {
        // create a div for every ingredient
        const ingredientCard = document.createElement("div");
        ingredientCard.classList.add("ingredient-card");

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox-ingredient");

        // If you click the checkbox, it will get removed
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            localStorage.removeItem("ingredientCard");
          } else {
            ingredientCard.style.textDecoration = "none";
          }
        });

        // show the ingredient
        const nameContainer = document.createElement("div");
        const ingredientText = `${ingredient.amount ?? ""} ${
          ingredient.unit ?? ""
        } ${ingredient.ingredient}`.trim();
        nameContainer.innerText = ingredientText;
        ingredientCard.appendChild(checkbox);
        ingredientCard.appendChild(nameContainer);

        shoppingListElement.appendChild(ingredientCard);
      });
    }
  }

  // if nothing can be found in the local storage
  if (shoppingListElement.innerHTML === "") {
    shoppingListElement.innerHTML = "<p>No items in the shopping list</p>";
  }
};
