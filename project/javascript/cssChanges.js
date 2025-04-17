"use strict";

const addContactOpenMenu = document.querySelector("#add-contact-icon");
const closeMenu = document.querySelector("#close-menu");
export const formMenu = document.querySelector(".add-contact-menu");
export const backDrop = document.querySelector("#backdrop");

export const contactsContainerBackground = (contactsContainer, allData) => {
  contactsContainer.style.backgroundColor =
    allData.length > 0 ? "#222831" : "transparent";
};

export const contactsContainerBorder = (contactsContainer, allData) => {
  // contactsContainer.style.borderTop = styles;
  // contactsContainer.style.borderBottom = styles;
  contactsContainer.style.borderTop =
    allData.length > 0 ? "1px solid #00adb5" : "none";
  contactsContainer.style.borderBottom =
    allData.length > 0 ? "1px solid #00adb5" : "none";
};

const showMenu = () => {
  formMenu.style.display = "flex";
  backDrop.className = "backdrop";
};

export const hideMenu = () => {
  formMenu.style.display = "none";
  backDrop.className = "";
};
addContactOpenMenu.addEventListener("click", showMenu);
closeMenu.addEventListener("click", hideMenu);
