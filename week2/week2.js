const product = {
  id: 1,
  name: "House",
  description: "A very big house that fits 13 people",
  price: 99999.9,
  manfuacturer: "Nokia",
};

console.log(product);
product.category = "Houses";
product.price = 88888.8;
delete product.description;
console.log(product);
