"use strict";

import { getContacts } from "./contacts.js";
import * as utils from "./utils.js";
import * as element from "./domVariables.js";
import { hideMenu, showMenu } from "./cssChanges.js";

// adds "Contacts" text
utils.contactsText(element.contactsContainer);

// gets contacts array
let contacts = getContacts();
utils.sortArr(contacts);

let allData = [];
allData = [...contacts];

element.dataLength.innerText = `${contacts.length} Contacts`;

// adds contact to the phone book
export const addContact = (data) => {
  contacts.push(data);
  allData.push(data);

  element.dataLength.innerText = `${contacts.length} Contacts`;
};

element.searchBar.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();
  const filteredByName = contacts.filter((data) =>
    data.name.toLowerCase().includes(searchText)
  );

  if (e.target.value.length !== 0) {
    allData = filteredByName;
    utils.emptyContacts(element.contactsContainer, allData);
    utils.contactsText(element.contactsContainer);
  } else {
    allData = [...contacts];
    utils.emptyContacts(element.contactsContainer, allData);
    utils.contactsText(element.contactsContainer);
  }

  renderContacts(allData);

  if (!allData.length) {
    utils.emptyContacts(element.contactsContainer, allData);
    utils.noDataText(element.contactsContainer);
  }

  element.dataLength.innerText = `${allData.length} Contacts`;
});

// for the contacts ids [to keep them unique]
let counter = allData.length;

// add contact form
element.addFormMenu.addEventListener("submit", (e) => {
  e.preventDefault();

  const errorMsg = document.querySelector(".error-msg");

  const nameInput = document.querySelector("#name-input");
  const emailInput = document.querySelector("#email-input");
  const phoneInput = document.querySelector("#phone-input");
  const addressInput = document.querySelector("#address-input");
  const ageInput = document.querySelector("#age-input");
  const imageInput = document.querySelector("#image-input");

  const contactData = {
    id: ++counter,
    name: nameInput.value[0].toUpperCase() + nameInput.value.slice(1).trim(),
    email: emailInput.value.trim(),
    img:
      imageInput.value.trim().length !== 0
        ? imageInput.value
        : "https://i.postimg.cc/HkbBPXj2/no-user-image.gif",
    age: ageInput.value.trim(),
    phone: phoneInput.value.trim(),
    address: addressInput.value.trim(),
  };

  utils.addOrUpdateForm(
    contacts,
    nameInput,
    errorMsg,
    phoneInput,
    imageInput,
    false,
    element.addFormMenu,
    element.searchBar,
    contactData,
    allData,
    element.contactsContainer
  );
});

// update contact form
element.updateFormMenu.addEventListener("submit", (e) => {
  e.preventDefault();

  const errorMsg = document.querySelector(".error-msg");

  const nameInput = document.querySelector("#name-input");
  const emailInput = document.querySelector("#email-input");
  const phoneInput = document.querySelector("#phone-input");
  const addressInput = document.querySelector("#address-input");
  const ageInput = document.querySelector("#age-input");
  const imageInput = document.querySelector("#image-input");

  const currentData = allData.filter((data) => data.id === currentContact.id);
  const data = currentData[0];

  utils.addOrUpdateForm(
    contacts,
    nameInput,
    errorMsg,
    phoneInput,
    imageInput,
    true,
    element.updateFormMenu,
    element.searchBar,
    null,
    allData,
    element.contactsContainer,
    data,
    ageInput,
    addressInput,
    emailInput
  );
});

// deletes all contacts from the phone book
const deleteAllContacts = () => {
  contacts = [];
  allData = [];
  utils.emptyContacts(element.contactsContainer, allData);
  utils.noDataText(element.contactsContainer);
  element.dataLength.innerText = `${allData.length} Contacts`;
};

// deletes one contact from the phone book
const deleteContactById = (id) => {
  allData = allData.filter((data) => id !== data.id);
  contacts = contacts.filter((data) => id !== data.id);

  utils.emptyContacts(element.contactsContainer, allData);

  renderContacts(allData);

  if (element.searchBar.value.length === 0) {
    allData = [...contacts];
    utils.emptyContacts(element.contactsContainer, allData);
    utils.contactsText(element.contactsContainer);
    renderContacts(allData);
    element.dataLength.innerText = `${contacts.length} Contacts`;
  } else {
    element.dataLength.innerText = `${allData.length} Contacts`;
  }
  if (!allData.length) {
    utils.emptyContacts(element.contactsContainer, allData);
    utils.noDataText(element.contactsContainer);
  }
};

// to store the current contact info when clicking on one
let currentContact = {};

// creates the contact container and children elements in the HTML
const createElements = (data) => {
  const contactInfo = document.createElement("div");
  contactInfo.className = "contact-info";

  contactInfo.addEventListener("mouseover", () => {
    contactInfo.classList.toggle("scaleWithBg");
  });

  contactInfo.addEventListener("mouseout", () => {
    contactInfo.classList.toggle("scaleWithBg");
  });

  contactInfo.addEventListener("click", () => {
    createContactInfoElements(data);
    showMenu(element.contactInfoMenu);
  });

  const leftSide = document.createElement("div");
  leftSide.className = "left";

  const rightSide = document.createElement("div");
  rightSide.className = "right";

  contactInfo.append(leftSide);
  contactInfo.append(rightSide);

  const leftSideImg = document.createElement("img");
  leftSideImg.src =
    data.img ?? "https://i.postimg.cc/HkbBPXj2/no-user-image.gif";
  leftSideImg.alt = data.name;

  const nameAndPhoneContainer = document.createElement("div");
  nameAndPhoneContainer.className = "name-phone-container";

  const contactNameSpan = document.createElement("span");
  contactNameSpan.innerText = `Name: `;
  const contactName = document.createElement("p");
  contactName.append(contactNameSpan);
  contactName.append(data.name);

  const contactPhone = document.createElement("p");
  const contactPhoneSpan = document.createElement("span");
  contactPhoneSpan.innerText = `Phone: `;
  contactPhone.append(contactPhoneSpan);
  contactPhone.append(data.phone);

  nameAndPhoneContainer.append(contactName);
  nameAndPhoneContainer.append(contactPhone);

  leftSide.append(leftSideImg);
  leftSide.append(nameAndPhoneContainer);

  // info about contact svg
  const contactInfoSvg = document.createElement("img");
  contactInfoSvg.src = "./images/svgs/info-svg.png";
  contactInfoSvg.alt = "contact-info-svg";
  contactInfoSvg.id = `contact-info-${data.id}`;

  // edit contact svg
  const editContact = document.createElement("img");
  editContact.src = "./images/svgs/edit-svg.png";
  editContact.alt = "edit-contact-svg";
  editContact.id = `edit-contact-${data.id}`;
  editContact.addEventListener("click", (e) => {
    e.stopPropagation();
    currentContact = data;
    showMenu(element.updateFormMenu);
    utils.createForm(
      element.updateFormMenu,
      "Update Contact Menu",
      "Save",
      data,
      true,
      currentContact
    );
  });

  // delete contact svg
  const deleteContact = document.createElement("img");
  deleteContact.src = "./images/svgs/delete-contact-svg.png";
  deleteContact.alt = "delete-contact-svg";
  deleteContact.id = `delete-contact-${data.id}`;
  deleteContact.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteContactById(data.id);
  });

  rightSide.append(contactInfoSvg);
  rightSide.append(editContact);
  rightSide.append(deleteContact);

  element.contactsContainer.append(contactInfo);
};

const createContactInfoElements = (data) => {
  //title
  const contactInfoTitle = document.createElement("h3");
  contactInfoTitle.innerText = "Contact Name";
  element.contactInfoMenu.append(contactInfoTitle);

  // X to close menu
  const contactInfoCloseMenu = document.createElement("div");
  contactInfoCloseMenu.innerText = "X";
  contactInfoCloseMenu.className = "x";
  contactInfoCloseMenu.id = "close-contact-info-menu";
  element.contactInfoMenu.append(contactInfoCloseMenu);

  // event to close the menu and remove its children
  contactInfoCloseMenu.addEventListener("click", () => {
    hideMenu(element.contactInfoMenu);
    while (element.contactInfoMenu.firstChild)
      element.contactInfoMenu.firstChild.remove();
  });

  //name
  const contactNameSpan = document.createElement("span");
  contactNameSpan.innerText = `Name: `;
  const contactName = document.createElement("p");
  contactName.append(contactNameSpan);
  contactName.append(data.name);

  // email
  const contactEmailSpan = document.createElement("span");
  contactEmailSpan.innerText = `Email: `;
  const contactEmail = document.createElement("p");
  contactEmail.append(contactEmailSpan);
  contactEmail.append(data.email);

  // phone
  const contactPhoneSpan = document.createElement("span");
  contactPhoneSpan.innerText = `Phone: `;
  const contactPhone = document.createElement("p");
  contactPhone.append(contactPhoneSpan);
  contactPhone.append(data.phone);

  // address
  const contactAddressSpan = document.createElement("span");
  contactAddressSpan.innerText = `Address: `;
  const contactAddress = document.createElement("p");
  contactAddress.append(contactAddressSpan);
  contactAddress.append(data.address);

  // age
  const contactAgeSpan = document.createElement("span");
  contactAgeSpan.innerText = `Age: `;
  const contactAge = document.createElement("p");
  contactAge.append(contactAgeSpan);
  contactAge.append(data.age);

  // img
  const contactImg = document.createElement("img");
  contactImg.src =
    data.img ?? "https://i.postimg.cc/HkbBPXj2/no-user-image.gif";
  contactImg.alt = data.name;

  element.contactInfoMenu.append(contactName);
  if (data.email) element.contactInfoMenu.append(contactEmail);
  element.contactInfoMenu.append(contactPhone);
  if (data.address) element.contactInfoMenu.append(contactAddress);
  if (data.age) element.contactInfoMenu.append(contactAge);
  element.contactInfoMenu.append(contactImg);
};

// sorts the contacts then renders them (displays them on screen)
export const renderContacts = (array) => {
  utils.sortArr(array);
  array.map((data) => {
    createElements(data);
  });
};

renderContacts(allData);

element.addContactOpenMenu.addEventListener("click", () => {
  showMenu(element.addFormMenu);
  utils.createForm(element.addFormMenu, "Add Contact Menu", "Add", false);
});

element.deleteAllContactsBtn.addEventListener("click", deleteAllContacts);
