const menuIcon = document.getElementById("menu-icon");
const navigation = document.querySelector(".navigation");

//if you click on menu icon - class list is active
menuIcon.addEventListener("click", () => {
  navigation.classList.toggle("active");
});
