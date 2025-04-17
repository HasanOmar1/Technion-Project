"use strict";
// import { contacts } from "./contacts.js";
import { sortArr } from "./utils.js";

import {
  contactsContainerBackground,
  contactsContainerBorder,
  backDrop,
  formMenu,
  hideMenu,
} from "./cssChanges.js";

let contacts = [
  {
    id: 1,
    name: "John Cena",
    img: "./images/contacts/john-cena.jpg",
    age: 31,
    phone: 1234567,
    address: "USA",
  },
  {
    id: 2,
    name: "The Rock",
    img: "./images/contacts/the-rock.jpg",
    age: 34,
    phone: 7654321,
    address: "Alaska",
  },
  {
    id: 3,
    name: "Asd The Tiger",
    img: "./images/contacts/no-user-image.gif",
    age: 31,
    phone: 321234,
    address: "There",
  },
];

sortArr(contacts);

let allData = [];
allData = [...contacts];

const contactsContainer = document.querySelector(".contacts-container");
const deleteAllContactsBtn = document.querySelector("#delete-all-contacts");
const dataLength = document.querySelector("#data-length");

// search bar
const searchBar = document.querySelector("#search-bar");

// form
// const addContactOpenMenu = document.querySelector("#add-contact-icon");
// const formMenu = document.querySelector(".add-contact-menu");
// const backDrop = document.querySelector("#backdrop");
// const closeMenu = document.querySelector("#close-menu");

// inputs
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const phoneInput = document.querySelector("#phone-input");
const addressInput = document.querySelector("#address-input");
const ageInput = document.querySelector("#age-input");
const imageInput = document.querySelector("#image-input");

dataLength.innerText = `${contacts.length} Contacts`;

// removes contacts container elements in HTML and BG + border styles
const emptyContacts = () => {
  while (contactsContainer.firstChild) contactsContainer.firstChild.remove();
  contactsContainerBackground(contactsContainer, allData);
  contactsContainerBorder(contactsContainer, allData);
};

// adds contact to the phone book
const addContact = (data) => {
  contacts.push(data);
  allData.push(data);

  contactsContainerBackground(contactsContainer, allData);
  contactsContainerBorder(contactsContainer, allData);

  dataLength.innerText = `${contacts.length} Contacts`;
};

searchBar.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();
  const filteredByName = contacts.filter((data) =>
    data.name.toLowerCase().includes(searchText)
  );

  if (e.target.value.length !== 0) {
    allData = filteredByName;
    emptyContacts();
  } else {
    allData = [...contacts];
    emptyContacts();
  }

  renderContacts(allData);

  if (!allData.length) emptyContacts();
  else contactsContainerBorder(contactsContainer, allData);

  console.log(`ss`, allData);
  dataLength.innerText = `${allData.length} Contacts`;
});

// for the contacts ids [to keep them unique]
let counter = allData.length;

formMenu.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    id: ++counter,
    name: nameInput.value,
    email: emailInput.value,
    img:
      imageInput.value.length !== 0
        ? imageInput.value
        : "./images/contacts/no-user-image.gif",
    age: ageInput.value,
    phone: phoneInput.value,
    address: addressInput.value,
  };

  emptyContacts();
  addContact(data);
  renderContacts(contacts);

  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  addressInput.value = "";
  ageInput.value = "";
  imageInput.value = "";

  searchBar.value = "";

  console.log(allData);

  hideMenu();
});

const deleteAllContacts = () => {
  contacts = [];
  allData = [];
  emptyContacts();

  dataLength.innerText = `${allData.length} Contacts`;
};

const deleteContactById = (id) => {
  const deletedContact = allData.filter((data) => id !== data.id);
  contacts = contacts.filter((data) => id !== data.id);

  console.log(deletedContact);
  allData = [...deletedContact];
  emptyContacts();
  renderContacts(allData);

  if (searchBar.value.length === 0) {
    allData = [...contacts];
    emptyContacts();
    renderContacts(allData);
    dataLength.innerText = `${contacts.length} Contacts`;
  } else {
    dataLength.innerText = `${allData.length} Contacts`;
  }

  console.log(allData);
};

deleteAllContactsBtn.addEventListener("click", deleteAllContacts);

const createElements = (data) => {
  const contactInfo = document.createElement("div");
  contactInfo.className = "contact-info";

  const leftSide = document.createElement("div");
  leftSide.className = "left";

  const rightSide = document.createElement("div");
  rightSide.className = "right";

  contactInfo.append(leftSide);
  contactInfo.append(rightSide);

  const leftSideImg = document.createElement("img");
  leftSideImg.src = data.img;
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

  const contactInfoSvg = document.createElement("img");
  contactInfoSvg.src = "./images/svgs/info-svg.png";
  contactInfoSvg.alt = "contact-info-svg";
  contactInfoSvg.id = `contact-info-${data.id}`;

  const editContact = document.createElement("img");
  editContact.src = "./images/svgs/edit-svg.png";
  editContact.alt = "edit-contact-svg";
  editContact.id = `edit-contact-${data.id}`;

  const deleteContact = document.createElement("img");
  deleteContact.src = "./images/svgs/delete-contact-svg.png";
  deleteContact.alt = "delete-contact-svg";
  deleteContact.id = `delete-contact-${data.id}`;

  deleteContact.addEventListener("click", (e) => {
    deleteContactById(data.id);
  });

  rightSide.append(contactInfoSvg);
  rightSide.append(editContact);
  rightSide.append(deleteContact);

  contactsContainer.append(contactInfo);
};

const renderContacts = (array) => {
  sortArr(array);
  array.map((data) => {
    createElements(data);
  });
  contactsContainerBackground(contactsContainer, allData);
};

renderContacts(allData);
