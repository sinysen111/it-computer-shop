function bootnavbar(options) {
  const defaultOption = {
    selector: "main_navbar",
    animation: true,
    animateIn: "animate__fadeIn",
  };

  const bnOptions = { ...defaultOption, ...options };

  init = function () {
    var dropdowns = document
      .getElementById(bnOptions.selector)
      .getElementsByClassName("dropdown");

    Array.prototype.forEach.call(dropdowns, (item) => {
      //add animation
      if (bnOptions.animation) {
        const element = item.querySelector(".dropdown-menu");
        element?.classList.add("animate__animated");
      }

      //hover effects
      item.addEventListener("mouseover", function () {
        this.classList.add("show");
        const element = this.querySelector(".dropdown-menu");
        element?.classList.add("show");
      });

      item.addEventListener("mouseout", function () {
        this.classList.remove("show");
        const element = this.querySelector(".dropdown-menu");
        element?.classList.remove("show");
      });
    });
  };

  init();
}

function showContent(pageId) {
  var menuItems = document.querySelectorAll('.menu-bar li');
  menuItems.forEach(function (item) {
    item.classList.remove('active');
  });

  // Hide all content sections
  var contentSections = document.querySelectorAll('.content');
  contentSections.forEach(function (section) {
    section.style.display = 'none';
  });

  // Show the selected content section
  var selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.style.display = 'block';
  }

  // Add "active" class to the clicked menu item
  var clickedMenuItem = document.querySelector('.menu-bar li[onclick="loadContent(\'' + pageId + '\', \'' + pageId + '\')"]');
  if (clickedMenuItem) {
    clickedMenuItem.classList.add('active');
  }
}

function loadContent(url, targetId) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      var targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.innerHTML = data;
        showContent(targetId);
      }
    })
    .catch(error => console.error('Error loading content:', error));
}

window.onload = function () {
  loadContent('page/home-page.html', 'home');
};