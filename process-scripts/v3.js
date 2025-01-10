{
  let navItems, underline;

  const buildNavBar = () => {
    const navBar = document.querySelector(".v3");
    navItems = document.createElement("div");
    navItems.classList.add("nav-items");
    navBar.appendChild(navItems);

    fetch("navigation.json")
      .then((response) => response.json())
      .then((data) => {
        data.cities.forEach((city) => {
          const navItem = document.createElement("a");
          navItem.textContent = city.label;
          navItem.addEventListener("click", () =>
            handleNavClick(city.section, navItem)
          );
          navItems.appendChild(navItem);
        });

        const navRule = document.createElement("div");
        navRule.classList.add("nav-rule");

        underline = document.createElement("div");
        underline.classList.add("nav-underline");
        underline.classList.add("loading");
        navRule.appendChild(underline);
        navBar.appendChild(navRule);

        navBar.firstElementChild.firstElementChild.classList.add("active");
        underline.style.width = `${navBar.firstElementChild.firstElementChild.offsetWidth}px`;
        underline.style.left = `${navBar.firstElementChild.firstElementChild.offsetLeft}px`;
        underline.classList.remove("loading");
      });
  };

  const handleNavClick = (section, item) => {
    // TODO: show correct tab content...

    Array.from(navItems.children).forEach((child) => {
      child.classList.remove("active");
    });
    item.classList.add("active");

    underline.style.width = `${item.offsetWidth}px`;
    underline.style.left = `${item.offsetLeft}px`;
  };

  document.addEventListener("DOMContentLoaded", function () {
    buildNavBar();
  });
}
