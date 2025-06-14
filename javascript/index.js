"use strict";

import { getContacts } from "./contacts.js"; // imports the contacts array
import * as utils from "./utils.js";
import * as element from "./domVariables.js"; // imports all variables
import { hideMenu, showMenu } from "./cssChanges.js";

// adds "Contacts" text at the start of the menu
utils.contactsText(element.contactsContainer);

// gets contacts array data
let contacts = getContacts();

// sorts the data by names
utils.sortArr(contacts);

// a temp array that keeps changes to show different contacts [like for searchbar]
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
  const searchText = e.target.value.toLowerCase().trim();
  const filteredByNameArr = contacts.filter((data) =>
    data.name.toLowerCase().includes(searchText)
  );

  if (e.target.value.length !== 0) {
    // updates contacts array to the ones that has been searched for
    allData = filteredByNameArr;
    utils.emptyContacts(element.contactsContainer);
    utils.contactsText(element.contactsContainer);
  } else {
    // updates contacts array to the original one if nothing is searched for.
    allData = [...contacts];
    utils.emptyContacts(element.contactsContainer);
    utils.contactsText(element.contactsContainer);
  }

  // displays contacts on screen
  renderContacts(allData);

  // if no contact found
  if (!allData.length) {
    utils.emptyContacts(element.contactsContainer);
    utils.noDataText(element.contactsContainer);
  }

  element.dataLength.innerText = `${allData.length} Contacts`;
});

// for the contacts ids [to keep them unique]
let counter = allData.length;

// add contact button (form)
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
    editedAt: "",
  };

  // adds contact to the array
  utils.addOrUpdateForm(
    contacts,
    nameInput,
    errorMsg,
    phoneInput,
    imageInput,
    false, // not updating
    element.addFormMenu,
    element.searchBar,
    contactData,
    element.contactsContainer
  );
});

// update contact button (form)
element.updateFormMenu.addEventListener("submit", (e) => {
  e.preventDefault();

  const errorMsg = document.querySelector(".error-msg");

  const nameInput = document.querySelector("#name-input");
  const emailInput = document.querySelector("#email-input");
  const phoneInput = document.querySelector("#phone-input");
  const addressInput = document.querySelector("#address-input");
  const ageInput = document.querySelector("#age-input");
  const imageInput = document.querySelector("#image-input");

  // finds the current contact info (i get it when i click on the update button)
  const currentData = allData.filter((data) => data.id === currentContact.id);
  const data = currentData[0];

  utils.addOrUpdateForm(
    contacts,
    nameInput,
    errorMsg,
    phoneInput,
    imageInput,
    true, // updating
    element.updateFormMenu,
    element.searchBar,
    null, // no object to be added
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
  utils.emptyContacts(element.contactsContainer);
  utils.noDataText(element.contactsContainer);
  element.dataLength.innerText = `${allData.length} Contacts`;
};

// deletes one contact from the phone book
const deleteContactById = (id) => {
  // deletes the contact if it was searched for
  allData = allData.filter((data) => id !== data.id);

  // deletes the contact from all contacts
  contacts = contacts.filter((data) => id !== data.id);

  utils.emptyContacts(element.contactsContainer);

  renderContacts(allData);

  // checks if the contact was searched for and updates contact counter
  if (element.searchBar.value.length === 0) {
    allData = [...contacts];
    utils.emptyContacts(element.contactsContainer);
    utils.contactsText(element.contactsContainer);
    renderContacts(allData);
    element.dataLength.innerText = `${contacts.length} Contacts`;
  } else {
    element.dataLength.innerText = `${allData.length} Contacts`;
  }

  // if no contacts found then display msg
  if (!allData.length) {
    utils.emptyContacts(element.contactsContainer);
    utils.noDataText(element.contactsContainer);
  }
};

// temp array to store the current contact info when clicking on one
let currentContact = {};

// creates the contact container and children elements in the HTML
const createElements = (data) => {
  const contactInfo = document.createElement("div");
  contactInfo.className = "contact-info";

  // hover effect on each contact
  contactInfo.addEventListener("mouseover", () => {
    contactInfo.classList.toggle("scaleWithBg");
  });
  // removes hover effect on each contact
  contactInfo.addEventListener("mouseout", () => {
    contactInfo.classList.toggle("scaleWithBg");
  });

  // opens contact info menu
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

  // Left Side Data (img,name,phone)
  const leftSideImg = document.createElement("img");
  leftSideImg.src =
    data.img ?? "https://i.postimg.cc/HkbBPXj2/no-user-image.gif";
  leftSideImg.alt = data.name;

  const nameAndPhoneContainer = document.createElement("div");
  nameAndPhoneContainer.className = "name-phone-container";

  // contact name
  const contactNameSpan = document.createElement("span");
  contactNameSpan.innerText = `Name: `;
  const contactName = document.createElement("p");
  contactName.append(contactNameSpan);
  contactName.append(data.name);

  //contact phone number
  const contactPhone = document.createElement("p");
  const contactPhoneSpan = document.createElement("span");
  contactPhoneSpan.innerText = `Phone: `;
  contactPhone.append(contactPhoneSpan);
  contactPhone.append(data.phone);

  // contact edited date and time
  const contactEditedAt = document.createElement("p");
  if (data.editedAt) contactEditedAt.innerText = "edited on " + data.editedAt;

  contactEditedAt.className = "edited";

  nameAndPhoneContainer.append(contactName);
  nameAndPhoneContainer.append(contactPhone);
  nameAndPhoneContainer.append(contactEditedAt);

  leftSide.append(leftSideImg);
  leftSide.append(nameAndPhoneContainer);
  // End of Left Side Data (img,name,phone)

  // Right Side Data [svgs]  (info,edit,delete)
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
    e.stopPropagation(); // its like giving it more z-index (clicks on element only and not the parent element)
    currentContact = data; // updates currentContact to be the selected one
    showMenu(element.updateFormMenu);

    // creates update form
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
    e.stopPropagation(); // its like giving it more z-index (clicks on element only and not the parent element)
    deleteContactById(data.id);
  });

  rightSide.append(contactInfoSvg);
  rightSide.append(editContact);
  rightSide.append(deleteContact);
  // End of Right Side Data [svgs]  (info,edit,delete)

  element.contactsContainer.append(contactInfo);
};

// creates the contact info menu in HTML (when clicked on contact)
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
  if (data.email) element.contactInfoMenu.append(contactEmail); // if contact has an email
  element.contactInfoMenu.append(contactPhone);
  if (data.address) element.contactInfoMenu.append(contactAddress); // if contact has an address
  if (data.age) element.contactInfoMenu.append(contactAge); // if contact has an age
  element.contactInfoMenu.append(contactImg);
};

// sorts the contacts then renders them (displays them on screen)
export const renderContacts = (array) => {
  utils.sortArr(array);
  array.map((data) => {
    createElements(data);
  });
};

// renderes contacts when loading up the website
renderContacts(allData);

// add contact button
element.addContactOpenMenu.addEventListener("click", () => {
  showMenu(element.addFormMenu);
  // creates the add contact form
  utils.createForm(element.addFormMenu, "Add Contact Menu", "Add", false);
});

// deletes all contacts
element.deleteAllContactsBtn.addEventListener("click", deleteAllContacts);
