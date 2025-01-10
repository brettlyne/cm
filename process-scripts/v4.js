{
  let navItems, underline, active;

  const buildNavBar = () => {
    const navBar = document.querySelector(".v4");
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

        active = navBar.firstElementChild.firstElementChild;
        active.classList.add("active");
        positionUnderline();
        underline.classList.remove("loading");
      });
  };

  const handleNavClick = (section, item) => {
    // TODO: show correct tab content...

    active.classList.remove("active");
    item.classList.add("active");
    active = item;
    positionUnderline();
  };

  const positionUnderline = () => {
    underline.style.width = `${active.offsetWidth}px`;
    underline.style.left = `${active.offsetLeft}px`;
  };

  document.addEventListener("DOMContentLoaded", function () {
    buildNavBar();
  });

  let resizeTimeout;
  window.addEventListener("resize", () => {
    underline.classList.add("loading");
    active.classList.add("resizing");

    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      positionUnderline();
      underline.classList.remove("loading");
      active.classList.remove("resizing");
    }, 200);
  });
}
