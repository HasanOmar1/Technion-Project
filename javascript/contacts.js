"use strict";

export let contacts = [
  {
    id: 1,
    name: "John Cena",
    img: "https://i.postimg.cc/k5cw7CQR/john-cena.jpg",
    age: 31,
    phone: "050456789",
    address: "USA",
    email: "John@gmail.com",
  },
  {
    id: 2,
    name: "The Rock",
    img: "https://i.postimg.cc/bv83Xrtj/the-rock.jpg",
    age: 34,
    phone: "05245678910",
    address: "Alaska",
    email: "ZaRock@gmail.com",
  },
  {
    // contact with default img and no age
    id: 3,
    name: "Asd The Tiger",
    // img: "https://i.postimg.cc/HkbBPXj2/no-user-image.gif",
    // age: 31,
    phone: "0546543210",
    address: "Ze Jungle",
    email: "Lion@hotmail.com",
  },
  {
    id: 4,
    name: "Car",
    img: "https://i.postimg.cc/3JstBnrN/car.webp",
    age: 26,
    phone: "05865343210",
    address: "Romania",
    email: "car@gmail.com",
  },
];

// lets contacts array act like its "let" and not "const" (exporting something is readonly)
// which allows me to change the values of the array
export const getContacts = () => {
  return contacts;
};
