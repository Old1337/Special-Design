"use strict";

const landingEl = document.querySelector(".landing");
export const duration = 10_000;

const prograssBar = document.querySelectorAll(".skills_prograss");

const galleryImages = document.querySelectorAll(".gallery_image");

const scrollTopBtn = document.querySelector(".scroll-top-btn");

const sidebarBullets = document.querySelectorAll(".sidebar-nav_link");

const openMobileBtn = document.querySelector(".nav_mobile");
const closeMobileBtn = document.querySelector(".mobile-nav_close");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavLinks = document.querySelectorAll(".mobile-nav_link");

// observer options
const options = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 0.5,
};

export const randomBackgroundImage = () => {
  const skipIndexZero = 1;
  const imageLength = 5;
  const randomImage = Math.floor(Math.random() * imageLength + skipIndexZero);

  landingEl.style.backgroundImage = `url('images/0${randomImage}.AVIF')`;
};

export const backgroundInterval = setInterval(randomBackgroundImage, duration);

const animatePrograssBar = (entries) => {
  entries.forEach((entry) => {
    const width = entry.target.dataset.width;

    // if the prograss element shown on the screen
    entry.target.style.width = entry.isIntersecting ? width : 0;
  });
};

const observer = new IntersectionObserver(animatePrograssBar, options);

prograssBar.forEach((el) => observer.observe(el));

const createPopUp = (e) => {
  const overLay = document.createElement("div");
  const popupBox = document.createElement("div");
  const popupImage = document.createElement("img");
  const closeBtn = document.createElement("button");
  const closeIcon = document.createElement("i");

  overLay.className = "popup-overlay";
  popupBox.className = "popup-box";
  closeBtn.className = "close-btn ";
  closeIcon.className = "fa-solid fa-xmark fa-shake";
  // added label for accessibility
  closeIcon.ariaLabel = "close button";

  // pop up animation
  setTimeout(() => {
    popupBox.classList.add("popup-animate");
  }, 50);

  popupImage.src = e.target.src;
  popupImage.alt = e.target.alt;

  document.body.appendChild(overLay);
  popupBox.appendChild(popupImage);
  popupBox.appendChild(closeBtn);
  closeBtn.appendChild(closeIcon);
  document.body.appendChild(popupBox);

  closeBtn.addEventListener("click", () => {
    popupBox.remove();
    overLay.remove();
  });
};

galleryImages.forEach((image) => {
  image.addEventListener("click", createPopUp);
});

scrollTopBtn.addEventListener("click", () => {
  scrollTo(0, 0);
});

window.addEventListener("scroll", () => {
  if (scrollY >= 500) {
    scrollTopBtn.classList.add("active");
  } else {
    scrollTopBtn.classList.remove("active");
  }
});

const moveToClickedSection = (e) => {
  const selectedSection = document.querySelector(
    `.${e.target.dataset.section}`
  );

  // scroll to the clicked section
  selectedSection.scrollIntoView();
};

sidebarBullets.forEach((bullet) =>
  bullet.addEventListener("click", moveToClickedSection)
);

openMobileBtn.addEventListener("click", () => {
  mobileNav.classList.add("active");
});

closeMobileBtn.onclick = () => {
  mobileNav.classList.remove("active");
};

mobileNavLinks.forEach((link) => {
  link.onclick = () => {
    mobileNav.classList.remove("active");
  };
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    mobileNav.classList.toggle("active");
  }
});
