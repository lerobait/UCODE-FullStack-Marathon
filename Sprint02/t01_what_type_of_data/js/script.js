const number = 1;
const bigInt = 9007n;
const string = "hello";
const boolean = true;
const isNull = null;
const isUndefined = undefined;
const object = {};
const symbol = Symbol("hi");
const isFunction = () => {};

alert(
  `number is ${typeof number}\n` +
    `bigInt is ${typeof bigInt}\n` +
    `string is ${typeof string}\n` +
    `boolean is ${typeof boolean}\n` +
    `isNull is ${typeof isNull}\n` +
    `isUndefined is ${typeof isUndefined}\n` +
    `object is ${typeof object}\n` +
    `symbol is ${typeof symbol}\n` +
    `isFunction is ${typeof isFunction}\n`
);
