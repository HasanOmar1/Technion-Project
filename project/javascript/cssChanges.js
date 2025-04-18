"use strict";

import { backDrop } from "./domVariables.js";

export const showMenu = (menu) => {
  menu.style.display = "flex";
  backDrop.className = "backdrop";
};

export const hideMenu = (menu) => {
  menu.style.display = "none";
  backDrop.className = "";
};
