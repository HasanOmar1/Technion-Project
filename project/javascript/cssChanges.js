"use strict";

const addContactOpenMenu = document.querySelector("#add-contact-icon");
const closeMenu = document.querySelector("#close-menu");
export const formMenu = document.querySelector(".add-contact-menu");
export const backDrop = document.querySelector("#backdrop");

export const contactsContainerBackground = (contactsContainer, allData) => {
  contactsContainer.style.backgroundColor =
    allData.length > 0 ? "#222831" : "transparent";
};

export const contactsContainerBorder = (contactsContainer, styles) => {
  contactsContainer.style.borderTop = styles;
  contactsContainer.style.borderBottom = styles;
};

addContactOpenMenu.addEventListener("click", (e) => {
  formMenu.style.display = "flex";
  backDrop.className = "backdrop";
});

closeMenu.addEventListener("click", (e) => {
  formMenu.style.display = "none";
  backDrop.className = "";
});
