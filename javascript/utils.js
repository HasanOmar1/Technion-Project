"use strict";

import { hideMenu } from "./cssChanges.js";
import { addContact, renderContacts } from "./index.js";

// sorts the contacts alphabetically by name
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

// dynamically creates a form
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
  const { maxLength, required, min, max, data } = optional;

  // container
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

  // optional attributes (depends on the input)
  if (maxLength !== undefined) input.maxLength = maxLength;
  if (required !== undefined) input.required = required;
  if (min !== undefined) input.min = min;
  if (max !== undefined) input.max = max;
  container.append(input);
};

// empties the contacts on screen
export const emptyContacts = (contactsContainer) => {
  while (contactsContainer.firstChild) contactsContainer.firstChild.remove();
};

// empties the form elements
export const emptyForm = (form) => {
  while (form.firstChild) form.firstChild.remove();
};

// dynamically knows if the form is to update contact or to add contact
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
  contactsContainer,
  // last 4 parameters are for the update form only
  data,
  ageInput,
  addressInput,
  emailInput
) => {
  // checks if contact name is already there
  const nameExists = contacts.filter(
    (data) => nameInput.value.toLowerCase().trim() === data.name.toLowerCase()
  );

  // if the name is found already in contacts
  // and the form is to add contact then display error msg
  // if the form is to update contact then it checks
  // if the name input equals to a name already found
  // then display error msg
  if (
    nameExists.length > 0 &&
    (!isUpdating || data.name !== nameInput.value.trim())
  ) {
    errorMsg.innerText = "Name is already taken, enter new one";
    errorMsg.style.display = "block";
  } else if (
    // checks if name or phone are empty then displays error msg
    nameInput.value.trim().length === 0 ||
    phoneInput.value.trim().length === 0
  ) {
    errorMsg.innerText = "Enter name and phone number!";
    errorMsg.style.display = "block";
  } else if (!isValidPhoneNumber(phoneInput.value.trim())) {
    // if the phone number is not valid then it displays error msg
    errorMsg.innerText = "Enter a valid phone number! (9-11 numbers)";
    errorMsg.style.display = "block";
  } else if (
    // if the image link is not valid link then it displays error msg
    imageInput.value.trim().length !== 0 &&
    !isValidImageSrc(imageInput.value.trim())
  ) {
    errorMsg.innerText = "Enter a valid image URL or keep it empty";
    errorMsg.style.display = "block";
  } else {
    // if no errors then dont display the error msg
    errorMsg.innerText = "";
    errorMsg.style.display = "none";

    // if the form is the update form then it updates the contact
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
      data.editedAt = editedAt();
    }

    // empties contacts on screen
    emptyContacts(contactsContainer);
    contactsText(contactsContainer);

    // if the form is not update then it adds the contact
    if (!isUpdating) addContact(contactData);

    // renders contacts on screen
    renderContacts(contacts);
    hideMenu(form);

    searchBar.value = "";
  }
};

// adds "No Contacts Found" text if no contacts found
export const noDataText = (contactsContainer) => {
  const noDataContainer = document.createElement("div");
  noDataContainer.className = "no-contacts-container";

  const text = document.createElement("h2");
  text.innerText = "No Contacts Found";

  noDataContainer.append(text);
  contactsContainer.append(noDataContainer);
};

// adds "Contacts" text at the start of the menu
export const contactsText = (contactsContainer) => {
  const text = document.createElement("h2");
  text.innerText = "Contacts";
  contactsContainer.append(text);
};

export const editedAt = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const time = date.getHours() + ":" + date.getMinutes();

  const fullDate =
    date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

  const dateAndTime = fullDate + ", " + time;

  return dateAndTime;
};
