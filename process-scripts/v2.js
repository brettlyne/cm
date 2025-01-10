document.addEventListener("DOMContentLoaded", function () {
  buildNavBar2();
});

function handleNavClick2(section, e) {
  // TODO: show correct tab content...

  const siblings = e.target.parentElement.children;
  for (let i = 0; i < siblings.length; i++) {
    siblings[i].classList.remove("active");
  }
  e.target.classList.add("active");

  const navBar = document.querySelector(".v2");
  const underline = navBar.querySelector(".nav-underline");
  underline.style.width = `${e.target.offsetWidth}px`;
  underline.style.left = `${e.target.offsetLeft}px`;
}

function buildNavBar2() {
  const navBar = document.querySelector(".v2");
  let navBarHTML = "<div class='nav-items'>";

  fetch("navigation.json")
    .then((response) => response.json())
    .then((data) => {
      data.cities.forEach((city, index) => {
        navBarHTML += `<a 
        class="${index === 0 ? "active" : ""}" 
        onclick="handleNavClick2('${city.section}', event)">
          ${city.label}
        </a>`;
      });

      navBarHTML += "</div>";
      navBarHTML +=
        "<div class='nav-rule'><div class='nav-underline loading'></div></div>";

      navBar.innerHTML = navBarHTML;

      const underline = navBar.querySelector(".nav-underline");
      underline.style.width = `${navBar.firstElementChild.firstElementChild.offsetWidth}px`;
      underline.style.left = `${navBar.firstElementChild.firstElementChild.offsetLeft}px`;
      underline.classList.remove("loading");
    });
}
