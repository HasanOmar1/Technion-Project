// "use strict";
// import { contacts } from "./contacts.js";
import { sortArr } from "./utils.js";

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

let allData = [];
allData = [...contacts];
sortArr(allData);

const contactsContainer = document.querySelector(".contacts-container");
const deleteAllContactsBtn = document.querySelector("#delete-all-contacts");
const dataLength = document.querySelector("#data-length");

// search bar
const searchBar = document.querySelector("#search-bar");

// form
const addContactOpenMenu = document.querySelector("#add-contact-icon");
const formMenu = document.querySelector(".add-contact-menu");
const backDrop = document.querySelector("#backdrop");
const closeMenu = document.querySelector("#close-menu");

// inputs
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const phoneInput = document.querySelector("#phone-input");
const addressInput = document.querySelector("#address-input");
const ageInput = document.querySelector("#age-input");
const imageInput = document.querySelector("#image-input");

dataLength.innerText = `${contacts.length} Contacts`;

// removes contacts container elements in HTML
const emptyContacts = () => {
  while (contactsContainer.firstChild) contactsContainer.firstChild.remove();
  contactsContainer.style.backgroundColor =
    allData.length > 0 ? "#222831" : "transparent";
  contactsContainer.style.borderTop = "none";
  contactsContainer.style.borderBottom = "none";
};

// adds contact to the phone book
const addContact = (data) => {
  contacts.push(data);
  createElements(data);
  contactsContainer.style.backgroundColor =
    contacts.length > 0 ? "#222831" : "transparent";

  dataLength.innerText = `${contacts.length} Contacts`;
};

searchBar.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();
  const filteredByName = allData.filter((data) =>
    data.name.toLowerCase().includes(searchText)
  );

  if (e.target.value.length != 0) {
    allData = filteredByName;
    emptyContacts();
  } else {
    allData = [...contacts];
    emptyContacts();
  }

  sortArr(allData);
  renderContacts(allData);

  if (!allData.length) {
    emptyContacts();
  } else {
    contactsContainer.style.borderTop = "1px solid #00adb5";
    contactsContainer.style.borderBottom = "1px solid #00adb5";
  }

  dataLength.innerText = `${allData.length} Contacts`;
});

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
    email: emailInput.value,
    img:
      imageInput.value.length != 0
        ? imageInput.value
        : "./images/contacts/no-user-image.gif",
    age: ageInput.value,
    phone: phoneInput.value,
    address: addressInput.value,
  };
  addContact(data);

  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  addressInput.value = "";
  ageInput.value = "";
  imageInput.value = "";

  formMenu.style.display = "none";
  backDrop.className = "";
});

const deleteAllContacts = () => {
  contacts = [];
  allData = [];
  emptyContacts();

  dataLength.innerText = `${allData.length} Contacts`;
};

// const deleteContactById = (id) => {
//   contacts.forEach((data) => {
//     if (id === data.id) {
//       console.log(data);
//     }
//   });
// };

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

  rightSide.append(contactInfoSvg);
  rightSide.append(editContact);
  rightSide.append(deleteContact);

  contactsContainer.append(contactInfo);
};

const renderContacts = (array) => {
  array.map((data) => {
    createElements(data);
  });

  contactsContainer.style.backgroundColor =
    contacts.length > 0 ? "#222831" : "transparent";
};

renderContacts(allData);
