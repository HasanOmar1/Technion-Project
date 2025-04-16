"use strict";

export const contactsContainerBackground = (contactsContainer, allData) => {
  contactsContainer.style.backgroundColor =
    allData.length > 0 ? "#222831" : "transparent";
};

export const contactsContainerBorder = (contactsContainer, styles) => {
  contactsContainer.style.borderTop = styles;
  contactsContainer.style.borderBottom = styles;
};
