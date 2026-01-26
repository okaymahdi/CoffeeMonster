let coffeesCollection;
let usersCollection;
let ordersCollection;

const setCollections = ({ coffees, users, orders }) => {
  coffeesCollection = coffees;
  usersCollection = users;
  ordersCollection = orders;
};

module.exports = {
  setCollections,
  coffeesCollection,
  usersCollection,
  ordersCollection,
};
