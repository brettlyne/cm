document.addEventListener("DOMContentLoaded", function () {
  buildNavBar1();
});

function buildNavBar1() {
  const navBar = document.querySelector(".v1");
  let navBarHTML = "<div class='nav-items'>";

  fetch("navigation.json")
    .then((response) => response.json())
    .then((data) => {
      data.cities.forEach((city) => {
        navBarHTML += `<a>${city.label}</a>`;
      });

      navBarHTML += "</div>";
      navBar.innerHTML = navBarHTML;
    });
}
