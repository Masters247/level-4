// const person = {
//   name: "dan",
//   role: [2, "author"],
// };

const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: "dan",
  age: 41,
  hobbies: ["sports", "music"],
  role: [2, "author"],
};

person.role.push("admin");
// person.role[1] = 10;

let faveGuitars: string[];

interface Product {
  name: string;
  description: string;
  productSlug: string;
  featureBanner: {};
}

export default Product;
