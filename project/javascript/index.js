"use strict";
// import { contacts } from "./contacts.js";
import { sortArr } from "./utils.js";

import {
  contactsContainerBackground,
  contactsContainerBorder,
  hideMenu,
  showMenu,
} from "./cssChanges.js";

import {
  ageInput,
  addressInput,
  contactsContainer,
  dataLength,
  deleteAllContactsBtn,
  emailInput,
  formMenu,
  imageInput,
  nameInput,
  phoneInput,
  searchBar,
  contactInfoMenu,
  errorMsg,
} from "./domVariables.js";

let contacts = [
  {
    id: 1,
    name: "John Cena",
    img: "./images/contacts/john-cena.jpg",
    age: 31,
    phone: 1234567,
    address: "USA",
    email: "John@gmail.com",
  },
  {
    id: 2,
    name: "The Rock",
    img: "./images/contacts/the-rock.jpg",
    age: 34,
    phone: 7654321,
    address: "Alaska",
    email: "ZaRock@gmail.com",
  },
  {
    id: 3,
    name: "Asd The Tiger",
    img: "./images/contacts/no-user-image.gif",
    // age: 31,
    phone: 321234,
    address: "There",
    email: "Lion@hotmail.com",
  },
  {
    id: 4,
    name: "Car",
    img: "./images/contacts/car.webp",
    age: 26,
    phone: 13123451,
    address: "Romania",
    email: "car@gmail.com",
  },
];

sortArr(contacts);

let allData = [];
allData = [...contacts];

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

  dataLength.innerText = `${allData.length} Contacts`;
});

// for the contacts ids [to keep them unique]
let counter = allData.length;

formMenu.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    id: ++counter,
    name: nameInput.value[0].toUpperCase() + nameInput.value.slice(1).trim(),
    email: emailInput.value.trim(),
    img:
      imageInput.value.length !== 0
        ? imageInput.value
        : "./images/contacts/no-user-image.gif",
    age: ageInput.value.trim(),
    phone: phoneInput.value.trim(),
    address: addressInput.value.trim(),
  };

  const nameExists = allData.filter(
    (data) => nameInput.value.toLowerCase().trim() === data.name
  );

  if (nameExists.length > 0) {
    errorMsg.innerText = "Name is already taken, enter new one";
    errorMsg.style.display = "block";
  } else if (
    nameInput.value.trim().length === 0 ||
    phoneInput.value.trim().length === 0
  ) {
    errorMsg.innerText = "Enter name and phone number!";
    errorMsg.style.display = "block";
  } else {
    errorMsg.innerText = "";
    errorMsg.style.display = "none";
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

    hideMenu(formMenu);
  }

  // emptyContacts();
  // addContact(data);
  // renderContacts(contacts);

  // nameInput.value = "";
  // emailInput.value = "";
  // phoneInput.value = "";
  // addressInput.value = "";
  // ageInput.value = "";
  // imageInput.value = "";

  // searchBar.value = "";

  // hideMenu(formMenu);
});

// deletes all contacts from the phone book
const deleteAllContacts = () => {
  contacts = [];
  allData = [];
  emptyContacts();
  dataLength.innerText = `${allData.length} Contacts`;
};

// deletes one contact from the phone book
const deleteContactById = (id) => {
  allData = allData.filter((data) => id !== data.id);
  contacts = contacts.filter((data) => id !== data.id);

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
};

deleteAllContactsBtn.addEventListener("click", deleteAllContacts);

// creates the contact container and children elements in the HTML
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

  // info about contact svg
  const contactInfoSvg = document.createElement("img");
  contactInfoSvg.src = "./images/svgs/info-svg.png";
  contactInfoSvg.alt = "contact-info-svg";
  contactInfoSvg.id = `contact-info-${data.id}`;

  contactInfoSvg.addEventListener("click", () => {
    createContactInfoElements(data);
    showMenu(contactInfoMenu);
  });

  // edit contact svg
  const editContact = document.createElement("img");
  editContact.src = "./images/svgs/edit-svg.png";
  editContact.alt = "edit-contact-svg";
  editContact.id = `edit-contact-${data.id}`;

  // delete contact svg
  const deleteContact = document.createElement("img");
  deleteContact.src = "./images/svgs/delete-contact-svg.png";
  deleteContact.alt = "delete-contact-svg";
  deleteContact.id = `delete-contact-${data.id}`;
  deleteContact.addEventListener("click", (e) => deleteContactById(data.id));

  rightSide.append(contactInfoSvg);
  rightSide.append(editContact);
  rightSide.append(deleteContact);

  contactsContainer.append(contactInfo);
};

// sorts the contacts then renders them (displays them on screen)
const renderContacts = (array) => {
  sortArr(array);
  array.map((data) => {
    createElements(data);
  });
  contactsContainerBackground(contactsContainer, allData);
};

renderContacts(allData);

const createContactInfoElements = (data) => {
  //title
  const contactInfoTitle = document.createElement("h3");
  contactInfoTitle.innerText = "Contact Name";
  contactInfoMenu.append(contactInfoTitle);

  // X to close menu
  const contactInfoCloseMenu = document.createElement("div");
  contactInfoCloseMenu.innerText = "X";
  contactInfoCloseMenu.classList = "x";
  contactInfoCloseMenu.id = "close-contact-info-menu";
  contactInfoMenu.append(contactInfoCloseMenu);

  // event to close the menu and remove its children
  contactInfoCloseMenu.addEventListener("click", () => {
    hideMenu(contactInfoMenu);
    while (contactInfoMenu.firstChild) contactInfoMenu.firstChild.remove();
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
  contactImg.src = data.img;
  contactImg.alt = data.name;

  contactInfoMenu.append(contactName);
  if (data.email) contactInfoMenu.append(contactEmail);
  contactInfoMenu.append(contactPhone);
  if (data.address) contactInfoMenu.append(contactAddress);
  if (data.age) contactInfoMenu.append(contactAge);
  contactInfoMenu.append(contactImg);
};
