document.addEventListener("DOMContentLoaded", () => {
  const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  const main = document.querySelector("main");
  main.innerHTML = ""; // Clear "hello"

  if (savedRecipes.length === 0) {
    main.textContent = "No saved recipes yet!";
    return;
  }

  savedRecipes.forEach((recipe) => {
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

    info.appendChild(name);
    info.appendChild(prep);
    link.appendChild(img);
    link.appendChild(info);
    card.appendChild(link);
    main.appendChild(card);
  });
});
