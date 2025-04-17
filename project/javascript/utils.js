"use strict";

import {
  nameInput,
  ageInput,
  emailInput,
  phoneInput,
  addressInput,
  imageInput,
} from "./domVariables.js";

export const sortArr = (arr) => {
  arr.sort((a, b) => a.name.localeCompare(b.name));
};

export const emptyInputsValues = () => {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  addressInput.value = "";
  ageInput.value = "";
  imageInput.value = "";
};
