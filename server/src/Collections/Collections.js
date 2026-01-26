let coffeesCollection;
let usersCollection;
let ordersCollection;

const setCollections = ({ coffees, users, orders }) => {
  coffeesCollection = coffees;
  usersCollection = users;
  ordersCollection = orders;
};

const getCoffeesCollection = () => coffeesCollection;
const getUsersCollection = () => usersCollection;
const getOrdersCollection = () => ordersCollection;

module.exports = {
  setCollections,
  getCoffeesCollection,
  getUsersCollection,
  getOrdersCollection,
};
