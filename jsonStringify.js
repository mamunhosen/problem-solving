const obj = {
  name: "John",
  dateOfBirth: new Date(),
  age: 30,
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  },
  getName: function () {
    return this.name;
  },
  phone: undefined,
  email: null,
  Symbol: Symbol("mySymbol"),
};

const jsonString = JSON.stringify(obj);

const reviver = function (key, value) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value);
  }
  return value;
};

const obj2 = JSON.parse(jsonString, reviver);

console.log(obj2);
