// "use strict";
// import { contacts } from "./contacts.js";

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
];

const contactsContainer = document.querySelector(".contacts-container");
const deleteAllContactsBtn = document.querySelector("#delete-all-contacts");
const dataLength = document.querySelector("#data-length");

// form
const addContactOpenMenu = document.querySelector("#add-contact-icon");
const formMenu = document.querySelector(".add-contact-menu");
const backDrop = document.querySelector("#backdrop");
const closeMenu = document.querySelector("#close-menu");
const addContactBtn = document.querySelector("#add-contact-btn");

// inputs
const nameInput = document.querySelector("#name-input");
const phoneInput = document.querySelector("#phone-input");
const addressInput = document.querySelector("#address-input");
const ageInput = document.querySelector("#age-input");
const imageInput = document.querySelector("#image-input");

const shroud = {
  id: contacts.length + 1,
  name: "Shroud",
  img: "./images/contacts/the-rock.jpg",
  age: 32,
  phone: 645134,
  address: "USA",
};

dataLength.innerText = `You have ${contacts.length} contacts`;

const addContact = (data) => {
  contacts.push(data);
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

  const contactName = document.createElement("p");
  contactName.innerText = data.name;

  leftSide.append(leftSideImg);
  leftSide.append(contactName);

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

  rightSide.append(contactInfoSvg);
  rightSide.append(editContact);
  rightSide.append(deleteContact);

  contactsContainer.append(contactInfo);

  contactsContainer.style.backgroundColor =
    contacts.length > 0 ? "#222831" : "transparent";

  dataLength.innerText = `You have ${contacts.length} contacts`;
};

addContactOpenMenu.addEventListener("click", (e) => {
  formMenu.style.display = "flex";
  backDrop.className = "backdrop";
});

closeMenu.addEventListener("click", (e) => {
  formMenu.style.display = "none";
  backDrop.className = "";
});

formMenu.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    id: contacts.length + 1,
    name: nameInput.value,
    img: imageInput.value,
    age: ageInput.value,
    phone: phoneInput.value,
    address: addressInput.value,
  };
  addContact(data);

  nameInput.value = "";
  phoneInput.value = "";
  addressInput.value = "";
  ageInput.value = "";
  imageInput.value = "";

  formMenu.style.display = "none";
  backDrop.className = "";

  console.log(contacts);
});

const deleteAllContacts = () => {
  contacts = [];
  while (contactsContainer.firstChild) contactsContainer.firstChild.remove();
  contactsContainer.style.backgroundColor =
    contacts.length > 0 ? "#222831" : "transparent";

  dataLength.innerText = `You have ${contacts.length} contacts`;
};

// const deleteContactById = (id) => {
//   contacts.forEach((data) => {
//     if (id === data.id) {
//       console.log(data);
//     }
//   });
// };

deleteAllContactsBtn.addEventListener("click", deleteAllContacts);

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

  const contactInfoSvg = document.createElement("img");
  contactInfoSvg.src = "./images/svgs/info-svg.png";
  contactInfoSvg.alt = "contact-info-svg";
  contactInfoSvg.id = `contact-info-${info.id}`;

  const editContact = document.createElement("img");
  editContact.src = "./images/svgs/edit-svg.png";
  editContact.alt = "edit-contact-svg";
  editContact.id = `edit-contact-${info.id}`;

  const deleteContact = document.createElement("img");
  deleteContact.src = "./images/svgs/delete-contact-svg.png";
  deleteContact.alt = "delete-contact-svg";
  deleteContact.id = `delete-contact-${info.id}`;

  rightSide.append(contactInfoSvg);
  rightSide.append(editContact);
  rightSide.append(deleteContact);

  contactsContainer.append(contactInfo);
});

contactsContainer.style.backgroundColor =
  contacts.length > 0 ? "#222831" : "transparent";
