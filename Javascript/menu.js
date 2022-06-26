"use strict";

import {
  backgroundInterval as intervalFromMainJs,
  randomBackgroundImage,
  duration,
} from "./main.js";

const settingsMenu = document.querySelector(".settings_box");
const iconMenu = document.querySelector(".icon_gear");

const colorsOptions = document.querySelectorAll(".settings_colors li");
const fontOptions = document.querySelectorAll(".settings_font button");
const backgroundEl = document.querySelectorAll(".settings_background button");
const navbar = document.querySelector(".sidebar-nav");
const sidebarNavEl = document.querySelectorAll(".settings_navbar button");

const options = {
  randomBackground: "true",
  sidebarNav: "true",
};

const showMenu = () => {
  settingsMenu.classList.toggle("active");
  iconMenu.classList.toggle("fa-spin");
};

iconMenu.addEventListener("click", showMenu);

const setPropertyValue = (propety, value) => {
  document.documentElement.style.setProperty(propety, value);
};

const removeActiveClass = (elements) => {
  elements.forEach((el) => el.classList.remove("active"));
};

const switchColor = (e) => {
  const selectedColor = e.target.dataset.color;

  setPropertyValue("--primary-color", selectedColor);

  window.localStorage.setItem("color_option", selectedColor);

  removeActiveClass(colorsOptions);

  e.target.classList.add("active");
};

colorsOptions.forEach((color) => {
  color.addEventListener("click", switchColor);
});

const switchFont = (e) => {
  const selectedFont = e.target.dataset.font;

  setPropertyValue("--font-primary", selectedFont);

  window.localStorage.setItem("font_option", selectedFont);

  removeActiveClass(fontOptions);

  e.target.classList.add("active");
};

fontOptions.forEach((font) => font.addEventListener("click", switchFont));

let backgroundInterval;

const isRandomBgEnabled = () => {
  if (options.randomBackground === "true") {
    backgroundInterval = setInterval(randomBackgroundImage, duration);
  } else {
    // clear interval from main.js file
    clearInterval(intervalFromMainJs);

    clearInterval(backgroundInterval);
  }
};

const randomBackground = (e) => {
  removeActiveClass(backgroundEl);

  e.target.classList.add("active");
  options.randomBackground = e.target.dataset.background;

  window.localStorage.setItem("randomBG_option", options.randomBackground);

  isRandomBgEnabled();
};

backgroundEl.forEach((el) => el.addEventListener("click", randomBackground));

const isNavbarEnabled = () => {
  if (options.sidebarNav === "true") {
    navbar.classList.add("active");
  } else {
    navbar.classList.remove("active");
  }
};

const enableNavbar = (e) => {
  removeActiveClass(sidebarNavEl);

  e.target.classList.add("active");
  options.sidebarNav = e.target.dataset.nav;

  isNavbarEnabled();

  window.localStorage.setItem("navbar_option", options.sidebarNav);
};

sidebarNavEl.forEach((el) => el.addEventListener("click", enableNavbar));

const isLocalStorageEmpty = () => {
  const primaryColor = window.localStorage.getItem("color_option");
  const primaryFont = window.localStorage.getItem("font_option");
  const randomBgOption = window.localStorage.getItem("randomBG_option");
  const navbarOption = window.localStorage.getItem("navbar_option");

  if (primaryColor !== null) {
    setPropertyValue("--primary-color", primaryColor);

    const selectedEl = document.querySelector(`[data-color="${primaryColor}"]`);

    removeActiveClass(colorsOptions);

    selectedEl.classList.add("active");
  }

  if (primaryFont !== null) {
    setPropertyValue("--font-primary", primaryFont);

    const selectedEl = document.querySelector(`[data-font="${primaryFont}"]`);

    removeActiveClass(fontOptions);

    selectedEl.classList.add("active");
  }

  if (randomBgOption !== null) {
    const randomBackgroundBtn = document.querySelector(
      `[data-background="${randomBgOption}"]`
    );

    removeActiveClass(backgroundEl);
    options.randomBackground = randomBgOption;

    isRandomBgEnabled();

    randomBackgroundBtn.classList.add("active");
  }

  if (navbarOption !== null) {
    const sidebarNavBtn = document.querySelector(
      `[data-nav="${navbarOption}"]`
    );

    removeActiveClass(sidebarNavEl);
    options.sidebarNav = navbarOption;

    sidebarNavBtn.classList.add("active");

    isNavbarEnabled();
  }
};

isLocalStorageEmpty();

document.querySelector(".reset_btn").onclick = () => {
  localStorage.clear();
  location.reload();
};
