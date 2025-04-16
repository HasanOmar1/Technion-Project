"use strict";

export const sortArr = (arr) => {
  arr.sort((a, b) => a.name.localeCompare(b.name));
};
