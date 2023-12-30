"use strict";
class Account {
    constructor(id, owner, balance, nickname) {
        this.id = id;
        this.owner = owner;
        this.balance = balance;
        this.nickname = nickname;
    }
    deposit(amount) {
        if (amount <= 0) {
            throw new Error('Invalid amount');
        }
        this.balance += amount;
    }
}
let account = new Account(1, 'Mosh', 0);
let accountNick = new Account(1, 'Mosh', 0, 'teacher');
account.deposit(100);
console.log(account.balance);
console.log(account);
console.log(accountNick);
console.log(typeof account);
console.log(account instanceof Account);
class AccountTwo {
    constructor(id, owner, balance, nickname) {
        this.id = id;
        this.owner = owner;
        this._balance = balance;
        this.nickname = nickname;
    }
    deposit(amount) {
        if (amount <= 0) {
            throw new Error('Invalid amount');
        }
        this._balance += amount;
    }
    getBalance() {
        return this._balance;
    }
}
let accountSecondExample = new AccountTwo(2, 'Char', 150);
console.log(accountSecondExample.getBalance());
class AccountThree {
    constructor(id, owner, _balance, nickname) {
        this.id = id;
        this.owner = owner;
        this._balance = _balance;
        this.nickname = nickname;
    }
    deposit(amount) {
        if (amount <= 0) {
            throw new Error('Invalid amount');
        }
        this._balance += amount;
    }
    get balance() {
        return this._balance;
    }
}
let accountThirdExample = new AccountThree(2, 'Darwin', 200);
console.log(accountThirdExample.balance);
class SeatAssignment {
}
let seats = new SeatAssignment();
seats.A1 = 'Mosh';
seats['A1'] = '5';
seats.A2 = 'John';
class Ride {
    start() {
        Ride._activeRides++;
    }
    stop() {
        Ride._activeRides--;
    }
    static get activeRides() {
        return Ride._activeRides;
    }
}
Ride._activeRides = 0;
let ride1 = new Ride();
ride1.start();
let ride2 = new Ride();
ride2.start();
console.log(Ride.activeRides);
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
    walk() {
        console.log('walking');
    }
}
class Student extends Person {
    constructor(studentId, firstName, lastName) {
        super(firstName, lastName);
        this.studentId = studentId;
    }
    takeTest() {
        console.log('Taking a test');
    }
}
let student = new Student(1, 'John', 'Smith');
console.log(student.fullName);
console.log(student.walk());
class Teacher extends Person {
    get fullName() {
        return `Professor ${super.fullName}`;
    }
}
let teacher = new Teacher('John', 'Smith');
console.log(teacher.fullName);
class Principal extends Person {
    get fullName() {
        return `Principal ${super.fullName}`;
    }
}
printNames([
    new Student(1, 'Katie', 'Butler'),
    new Teacher('Albert', 'Einstein'),
    new Principal('Mary', 'Smith'),
]);
function printNames(people) {
    for (let person of people) {
        console.log(person.fullName);
    }
}
class PersonProtExample {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}
class StudentProtExample extends PersonProtExample {
    constructor(studentId, firstName, lastName) {
        super(firstName, lastName);
        this.studentId = studentId;
    }
    takeTest() {
        console.log('Taking a test');
    }
}
class Shape {
    constructor(color) {
        this.color = color;
    }
    render() {
    }
}
class Circle extends Shape {
    constructor(radius, color) {
        super(color);
        this.radius = radius;
    }
    render() {
        console.log('Rendering a circle');
    }
}
let shape = new Shape('red');
shape.render();
class ShapeAbs {
    constructor(color) {
        this.color = color;
    }
}
class Calendar {
    constructor(name) {
        this.name = name;
    }
}
class GoogleCalendar {
    constructor(name) {
        this.name = name;
    }
    addEvent() {
        throw new Error('Method not implemented.');
    }
    removeEvent() {
        throw new Error('Method not implemented.');
    }
}
class Logger {
    constructor(nameOfFile) {
        this.nameOfFile = nameOfFile;
    }
    writeMessages(message) {
        console.log(message);
    }
}
class PersonExample {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fullNameExample() {
        return `${this.firstName} ${this.lastName}`;
    }
}
class EmployeeExample extends PersonExample {
    constructor(salary, firstName, lastName) {
        super(firstName, lastName);
        this.salary = salary;
    }
}
//# sourceMappingURL=oop_notes.js.map