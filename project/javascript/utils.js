"use strict";

import { hideMenu } from "./cssChanges.js";

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

export const createForm = (form, titleText, btnText, data) => {
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
  });

  console.log(data);
  // name input
  createInputContainer(form, "Name *:", "name-input", "text", "name", {
    maxLength: 20,
    required: true,
    data: data?.name,
  });

  // email input
  createInputContainer(form, "Email :", "email-input", "email", "email", {
    maxLength: 30,
    data: data?.email,
  });

  // phone container
  createInputContainer(form, "Phone *:", "phone-input", "number", "phone", {
    required: true,
    data: data?.phone,
  });

  // address container
  createInputContainer(form, "Address :", "address-input", "text", "address", {
    maxLength: 30,
    data: data?.address,
  });

  // age container
  createInputContainer(form, "Age :", "age-input", "number", "age", {
    min: 1,
    max: 120,
    data: data?.age,
  });

  // image container
  createInputContainer(form, "Image URL :", "image-input", "text", "image", {
    data: data?.img,
  });

  const submitBtn = document.createElement("button");
  submitBtn.innerText = btnText;
  submitBtn.id = "add-contact-btn";

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

export const emptyForm = (form) => {
  while (form.firstChild) form.firstChild.remove();
};
