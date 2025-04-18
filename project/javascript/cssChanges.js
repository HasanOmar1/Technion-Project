"use strict";

import { backDrop } from "./domVariables.js";

export const contactsContainerBackground = (contactsContainer, allData) => {
  contactsContainer.style.backgroundColor =
    allData.length > 0 ? "#222831" : "transparent";
};

export const contactsContainerBorder = (contactsContainer, allData) => {
  contactsContainer.style.borderTop =
    allData.length > 0 ? "1px solid #00adb5" : "none";
  contactsContainer.style.borderBottom =
    allData.length > 0 ? "1px solid #00adb5" : "none";
};

export const showMenu = (menu) => {
  menu.style.display = "flex";
  backDrop.className = "backdrop";
};

export const hideMenu = (menu) => {
  menu.style.display = "none";
  backDrop.className = "";
};
