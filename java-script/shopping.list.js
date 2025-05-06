const inputElement = document.getElementById("value-input");
const addButton = document.getElementById("add-ingredient");
const listContainer = document.getElementById("shopping-list");
const garbageElement = document.getElementById("garbage-icon");

function loadList() {
  listContainer.innerHTML = "";
  const items = JSON.parse(localStorage.getItem("customIngredients") || "[]");

  //if there are no items - text shows
  if (items.length === 0) {
    listContainer.innerHTML = "<p>No items yet.</p>";
    return;
  }

  //create a card for every item that gets added
  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("ingredient-card");
    card.innerText = item;

    card.addEventListener("click", () => {
      removeItem(item);
    });

    listContainer.appendChild(card);
  });
}

//add an item to the local Storage
function addItem(item) {
  const items = JSON.parse(localStorage.getItem("customIngredients") || "[]");
  items.push(item);
  localStorage.setItem("customIngredients", JSON.stringify(items));
  loadList();
}

//remove item (all the items that did not get removed, will get added to list again)
function removeItem(item) {
  let items = JSON.parse(localStorage.getItem("customIngredients") || "[]");
  let newItems = [];

  for (let i = 0; i < items.length; i++) {
    if (items[i] !== item) {
      newItems.push(items[i]);
    }
  }

  localStorage.setItem("customIngredients", JSON.stringify(newItems));
  loadList();
}

//if you click button "Add", the value gets saved
function setItem() {
  const value = inputElement.value.trim();
  if (value === "") return;
  addItem(value);
  inputElement.value = "";
}

addButton.addEventListener("click", setItem);

//add item with enter
inputElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    setItem();
  }
});

//delete all items at once and clear array
garbageElement.addEventListener("click", () => {
  localStorage.setItem("customIngredients", JSON.stringify([]));
  loadList();
});

loadList();
