document.addEventListener("DOMContentLoaded", function () {
  buildNavBar();
});

function buildNavBar() {
  const navBar = document.querySelector(".navbar");

  fetch("navigation.json")
    .then((response) => response.json())
    .then((data) => {
      data.cities.forEach((city) => {
        navBar.insertAdjacentHTML("beforeend", `<a>${city.label}</a>`);
      });
    });
}
