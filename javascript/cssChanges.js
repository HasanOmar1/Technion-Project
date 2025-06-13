"use strict";

import {
  backDrop,
  effectBtn,
  main,
  footer,
  effectsContainer,
} from "./domVariables.js";
import { emptyForm } from "./utils.js";

// opens menu [update/add/info]
export const showMenu = (menu) => {
  menu.style.display = "flex";
  backDrop.className = "backdrop";
  document.body.style.overflow = "hidden";

  // closes the menu by clicking on the black background
  backDrop.addEventListener("click", () => hideMenu(menu));
};

// hides menu [update/add/info] and empties the form
export const hideMenu = (menu) => {
  menu.style.display = "none";
  backDrop.className = "";
  document.body.style.overflow = "auto";

  //empties the form
  emptyForm(menu);
};

// "Click me" button for effects
effectBtn.addEventListener("click", () => {
  footer.classList.toggle("hide");
  main.classList.toggle("hide");
  effectBtn.classList.toggle("move");
  effectsContainer.classList.toggle("show");
});
