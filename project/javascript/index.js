// "use strict";
import { contacts } from "./contacts.js";

const contactsContainer = document.querySelector(".contacts-container");

contacts.map((info) => {
  const contactInfo = document.createElement("div");
  contactInfo.className = "contact-info";

  const leftSide = document.createElement("div");
  leftSide.className = "left";

  const rightSide = document.createElement("div");
  rightSide.className = "right";

  contactInfo.append(leftSide);
  contactInfo.append(rightSide);

  const leftSideImg = document.createElement("img");
  leftSideImg.src = info.img;
  leftSideImg.alt = info.name;

  const contactName = document.createElement("p");
  contactName.innerText = info.name;

  leftSide.append(leftSideImg);
  leftSide.append(contactName);

  const rightSideInfoSvg = document.createElement("img");
  rightSideInfoSvg.src = "./images/svgs/info-svg.png";
  rightSideInfoSvg.alt = "contact-info-svg";

  const rightSideEditSvg = document.createElement("img");
  rightSideEditSvg.src = "./images/svgs/edit-svg.png";
  rightSideEditSvg.alt = "edit-contact-svg";

  const rightSideDeleteSvg = document.createElement("img");
  rightSideDeleteSvg.src = "./images/svgs/delete-contact-svg.png";
  rightSideDeleteSvg.alt = "delete-contact-svg";

  rightSide.append(rightSideInfoSvg);
  rightSide.append(rightSideEditSvg);
  rightSide.append(rightSideDeleteSvg);

  contactsContainer.append(contactInfo);
});

// const deleteAllContacts = () => {
//   contacts = [];
// };

// deleteAllContacts();
