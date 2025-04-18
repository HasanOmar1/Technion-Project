"use strict";

import {
  contactsContainerBackground,
  contactsContainerBorder,
  hideMenu,
} from "./cssChanges.js";
import { addContact, renderContacts } from "./index.js";

// sorts the contacts alphabetically
export const sortArr = (arr) => {
  arr.sort((a, b) => a.name.localeCompare(b.name));
};

// checks if the given phone number is valid
// ^ => start of input , \d => takes only digits [0-9] , {9,11} => the length , $ => end of input
export const isValidPhoneNumber = (phoneNumber) => {
  const regex = /^\d{9,11}$/;
  return regex.test(phoneNumber);
};

// checks if the given image url is valid
export const isValidImageSrc = (url) => {
  const regex =
    /^(https?:)?\/\/[^"\s]+\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?[^\s"]*)?$/i;
  return regex.test(url);
};

export const createForm = (
  form,
  titleText,
  btnText,
  data,
  isUpdating,
  currentContact
) => {
  const title = document.createElement("h3");
  title.innerText = titleText;
  form.append(title);

  // error msg
  const errorMsg = document.createElement("p");
  // errorMsg.innerText = "";
  errorMsg.className = "error-msg";
  form.append(errorMsg);

  // x to close menu
  const xToCloseMenu = document.createElement("div");
  xToCloseMenu.innerText = "X";
  xToCloseMenu.id = "close-menu";
  xToCloseMenu.className = "x";
  form.append(xToCloseMenu);

  xToCloseMenu.addEventListener("click", () => {
    hideMenu(form);
    emptyForm(form);
    if (isUpdating) {
      currentContact = {};
    }
  });

  // name input container
  createInputContainer(form, "Name *:", "name-input", "text", "name", {
    maxLength: 20,
    required: true,
    data: data?.name,
  });

  // email input container
  createInputContainer(form, "Email :", "email-input", "email", "email", {
    maxLength: 30,
    data: data?.email,
  });

  // phone input container
  createInputContainer(form, "Phone *:", "phone-input", "number", "phone", {
    required: true,
    data: data?.phone,
  });

  // address input container
  createInputContainer(form, "Address :", "address-input", "text", "address", {
    maxLength: 30,
    data: data?.address,
  });

  // age input container
  createInputContainer(form, "Age :", "age-input", "number", "age", {
    min: 1,
    max: 120,
    data: data?.age,
  });

  // image input container
  createInputContainer(form, "Image URL :", "image-input", "text", "image", {
    data: data?.img,
  });

  const submitBtn = document.createElement("button");
  submitBtn.innerText = btnText;
  submitBtn.id = isUpdating ? "update-contact-btn" : "add-contact-btn";

  form.append(submitBtn);
};

// creates container of label and input
const createInputContainer = (
  form,
  labelText,
  labelFor,
  inputType,
  inputName,
  optional = {}
) => {
  // container

  const { maxLength, required, min, max, data } = optional;

  const container = document.createElement("div");
  form.append(container);

  // label
  const label = document.createElement("label");
  label.innerText = labelText;
  label.htmlFor = labelFor;
  container.append(label);

  // input
  const input = document.createElement("input");
  input.type = inputType;
  input.name = inputName;
  input.id = labelFor;
  input.value = data ?? "";

  if (maxLength !== undefined) input.maxLength = maxLength;
  if (required !== undefined) input.required = required;
  if (min !== undefined) input.min = min;
  if (max !== undefined) input.max = max;
  container.append(input);
};

export const emptyContacts = (contactsContainer, allData) => {
  while (contactsContainer.firstChild) contactsContainer.firstChild.remove();
  contactsContainerBackground(contactsContainer, allData);
  contactsContainerBorder(contactsContainer, allData);
};

export const emptyForm = (form) => {
  while (form.firstChild) form.firstChild.remove();
};

export const addOrUpdateForm = (
  contacts,
  nameInput,
  errorMsg,
  phoneInput,
  imageInput,
  isUpdating,
  form,
  searchBar,
  contactData,
  allData,
  contactsContainer,
  data,
  ageInput,
  addressInput,
  emailInput
) => {
  const nameExists = contacts.filter(
    (data) => nameInput.value.toLowerCase().trim() === data.name.toLowerCase()
  );

  if (
    nameExists.length > 0 &&
    (!isUpdating || data.name !== nameInput.value.trim())
  ) {
    errorMsg.innerText = "Name is already taken, enter new one";
    errorMsg.style.display = "block";
  } else if (
    nameInput.value.trim().length === 0 ||
    phoneInput.value.trim().length === 0
  ) {
    errorMsg.innerText = "Enter name and phone number!";
    errorMsg.style.display = "block";
  } else if (!isValidPhoneNumber(phoneInput.value.trim())) {
    errorMsg.innerText = "Enter a valid phone number! (9-11 numbers)";
    errorMsg.style.display = "block";
  } else if (
    imageInput.value.trim().length !== 0 &&
    !isValidImageSrc(imageInput.value.trim())
  ) {
    errorMsg.innerText = "Enter a valid image URL or keep it empty";
    errorMsg.style.display = "block";
  } else {
    errorMsg.innerText = "";
    errorMsg.style.display = "none";

    if (isUpdating) {
      data.name =
        nameInput.value[0]?.toUpperCase() + nameInput.value.slice(1).trim();
      data.email = emailInput.value.trim();
      data.img =
        imageInput.value.trim().length !== 0
          ? imageInput.value
          : "https://i.postimg.cc/HkbBPXj2/no-user-image.gif";
      data.age = ageInput.value.trim();
      data.phone = phoneInput.value.trim();
      data.address = addressInput.value.trim();
    }

    emptyContacts(contactsContainer, allData);
    if (!isUpdating) addContact(contactData);
    renderContacts(contacts);
    emptyForm(form);
    hideMenu(form);

    searchBar.value = "";
  }
};

export const noDataText = (contactsContainer) => {
  const noDataContainer = document.createElement("div");
  noDataContainer.classList = "no-contacts-container";

  const text = document.createElement("h2");
  text.innerText = "No Contacts Found";

  noDataContainer.append(text);
  contactsContainer.append(noDataContainer);
};
