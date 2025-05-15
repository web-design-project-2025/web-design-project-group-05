document.addEventListener("DOMContentLoaded", () => {
  /* Load saved recipes from localStorage */
  const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  console.log("Loaded savedRecipes:", savedRecipes);

  /* Select the main element*/
  const main = document.querySelector("main");
  console.log("Main element:", main);

  main.innerHTML = ""; 

  /* no saved recipes */
  if (savedRecipes.length === 0) {
    const message = document.createElement("p");
    message.id = "no-saved-message";
    message.textContent = "No saved recipes yet!";
    main.appendChild(message);
    return;
  }

  /* Loop through and render each saved recipe */
  savedRecipes.forEach((recipe) => {
   /* create recipe card */
    console.log("Rendering recipe:", recipe);
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    const link = document.createElement("a");
    link.href = `recipes-page.html?id=${recipe.id}`;
    link.classList.add("recipe-card-link");

    const img = document.createElement("img");
    img.src = recipe.image;
    img.alt = recipe.name;
    img.classList.add("recipe-image");

    const info = document.createElement("div");
    info.classList.add("recipe-info");

    const name = document.createElement("h2");
    name.textContent = recipe.name;

    const prep = document.createElement("p");
    prep.textContent = `${recipe.time.value} ${recipe.time.unit}`;

    // Remove Button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", () => {
      const updated = savedRecipes.filter((r) => r.id !== recipe.id);
      localStorage.setItem("savedRecipes", JSON.stringify(updated));

      savedRecipes.length = 0;
      savedRecipes.push;
      card.remove();

      // Check if any recipe cards remain and shows empty message
      const remainingCards = document.querySelectorAll(".recipe-card");
      if (remainingCards.length === 0) {
        const message = document.createElement("p");
        message.id = "no-saved-message";
        message.textContent = "No saved recipes yet!";
        main.appendChild(message);
      }
    });

    info.appendChild(name);
    info.appendChild(prep);
    link.appendChild(img);
    link.appendChild(info);
    card.appendChild(link);
    card.appendChild(removeButton);
    main.appendChild(card);
  });
});
