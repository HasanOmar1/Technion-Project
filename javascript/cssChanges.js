"use strict";

import {
  backDrop,
  effectBtn,
  main,
  footer,
  effectsContainer,
} from "./domVariables.js";

export const showMenu = (menu) => {
  menu.style.display = "flex";
  backDrop.className = "backdrop";
  document.body.style.overflow = "hidden";
};

export const hideMenu = (menu) => {
  menu.style.display = "none";
  backDrop.className = "";
  document.body.style.overflow = "auto";
};

effectBtn.addEventListener("click", () => {
  footer.classList.toggle("hide");
  main.classList.toggle("hide");
  effectBtn.classList.toggle("move");
  effectsContainer.classList.toggle("show");
});
