{
  let navItems, underline, active;
  const clocks = [];

  const buildNavBar = () => {
    const navBar = document.querySelector(".v5");
    navItems = document.createElement("div");
    navItems.classList.add("nav-items");
    navBar.appendChild(navItems);

    fetch("navigation.json")
      .then((response) => response.json())
      .then((data) => {
        data.cities.forEach((city) => {
          const navItem = document.createElement("div");
          navItem.classList.add("nav-item");
          const time = document.createElement("div");
          time.textContent = "00:00";
          time.classList.add("navbar-clock");
          clocks.push({
            element: time,
            timezone: city.timezone,
          });

          const link = document.createElement("a");
          link.textContent = city.label;

          navItem.appendChild(time);
          navItem.appendChild(link);
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

        active = navItems.firstElementChild;
        active.classList.add("active");
        positionUnderline();
        underline.classList.remove("loading");

        updateClocks();
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

  const updateClocks = () => {
    clocks.forEach((clock) => {
      clock.element.textContent = new Date().toLocaleTimeString("en-US", {
        timeZone: clock.timezone,
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
    });
  };
  setInterval(updateClocks, 5000);

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

  document.addEventListener("DOMContentLoaded", function () {
    buildNavBar();
  });
}
