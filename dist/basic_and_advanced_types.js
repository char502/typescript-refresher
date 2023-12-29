"use strict";
var _a;
let sales = 123456789;
let course = 'TypeScript';
let is_published = true;
let level;
function render(document) {
    console.log(document);
}
let numbers = [1, 2, 3];
numbers[0] = 1;
numbers.forEach((n) => n.toString());
let user = [1, 'Mosh'];
user[0].toFixed(1);
user[1].slice();
user.push(1);
let mySize = 2;
console.log(mySize);
let stringSize = "m";
console.log(stringSize);
function calculateTax(income, taxYear = 2022) {
    if (taxYear < 2022)
        return income * 1.2;
    return income * 1.3;
}
calculateTax(10000, 2023);
let employee = {
    id: 1,
    name: 'Mosh',
    retire: (date) => {
        console.log(date);
    },
};
let employeeAliasExample = {
    id: 1,
    name: 'Mosh',
    retire: (date) => {
        console.log(date);
    },
};
function kgToLbs(weight) {
    if (typeof weight === 'number') {
        return weight * 2.2;
    }
    else {
        return parseInt(weight) * 2.2;
    }
}
kgToLbs(10);
kgToLbs('10kg');
let weight;
let textBox = {
    drag: () => { },
    resize: () => { },
};
let quantity = 50;
function greet(name) {
    if (name) {
        console.log(name.toUpperCase());
    }
    else {
        console.log('Hola!');
    }
}
greet(undefined);
function getCustomer(id) {
    return id === 0 ? null : { birthday: new Date() };
}
let customer = getCustomer(1);
console.log((_a = customer === null || customer === void 0 ? void 0 : customer.birthday) === null || _a === void 0 ? void 0 : _a.getFullYear());
let otherLog = null;
otherLog === null || otherLog === void 0 ? void 0 : otherLog('a');
let speed = null;
let ride = {
    speed: speed || 30,
};
let alternativeRide = {
    speed: speed !== null ? speed : 30,
};
let nullishCRide = {
    speed: speed !== null && speed !== void 0 ? speed : 30,
};
let phone = document.getElementById('phone');
console.log(phone.value);
let phoneAlt = document.getElementById('phone');
let code = 123;
let employeeCode = code;
console.log(typeof employeeCode);
let employeeObjOne = {};
let employeeObj = {};
employeeObj.name = 'John';
employeeObj.code = 123;
function renderUnkType(document) {
    if (typeof document === 'string') {
        document.toUpperCase();
    }
}
function reject(message) {
    throw new Error(message);
}
function processEvents() {
    while (true) {
    }
}
let usersExample = [
    { name: 'John Smith', age: 30, occupation: 'Software engineer' },
    { name: 'Kate Müller', age: 28 },
];
let value = 'a';
if (typeof value === 'string') {
    console.log(value.toUpperCase());
}
//# sourceMappingURL=basic_and_advanced_types.js.map