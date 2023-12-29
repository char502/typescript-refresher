// OOP with TS

// Programming paradigms (styles/ways of writing code)

// Procedural
// Functional
// Object Oriented
// Event-driven
// Aspect-oriented

// In OOP, objects are the building blocks of the application

// an object is a unit that contains:

// Data (state)
// Operations (behaviour)

// ===================
// Person Object:
// ===================

// properties:
// name
// email

// behaviour/methods (functions inside a person object)

// talk()
// dance()

// OOP - Objects are building blocks of application
// Functional programming - functions are building blocks of application

// ===================
// Creating Classes
// ===================

// A class is a blueprint for creating objects
// like an object factory

// A bank account object:

// Account

// id
// owner
// balance

// depopsit()
// withdraw()

class Account {
  readonly id: number;
  owner: string;
  balance: number;
  nickname?: string;

  constructor(id: number, owner: string, balance: number, nickname?: string) {
    this.id = id;
    this.owner = owner;
    this.balance = balance;
    this.nickname = nickname;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error('Invalid amount');
    }
    // Record a transaction object
    this.balance += amount;
  }
}

// constructor - special method inside a class used for initialising an object
// this method cannot have a return type annotation because it should always
// return an instance of a bank account

// ===================
// Creating Objects
// ===================

// creating an instance/object from an existing class
let account = new Account(1, 'Mosh', 0);

// with optional nickname property
let accountNick = new Account(1, 'Mosh', 0, 'teacher');

account.deposit(100);

console.log(account.balance);
console.log(account);
console.log(accountNick);
// not useful for objects
console.log(typeof account);
// use this instead, will produce a boolean value
console.log(account instanceof Account);

// Unions and type guards
// if (typeof someObj === 'number) {}

// typeof will always show an object
// what if want to check the type of a custom object and see if it's an instance of a given class

// here would use instanceof operator

// ===================
// Read-Only and Optional Properties
// ===================

// if use readonly, can only set the value of a property in the constructor
// if try to set it anywhere else, will get a compilation error

// readonly and optional properties in the example above

// ===================
// Access Control Keywords
// ===================

// In TS have 3 x access modifiers

// public
// private
// protected

class AccountTwo {
  // when create properties, they are all PUBLIC by default
  readonly id: number;
  owner: string;
  // if use private keyword
  // by convention, prefix private properties with an underscore
  private _balance: number;
  nickname?: string;

  constructor(id: number, owner: string, balance: number, nickname?: string) {
    this.id = id;
    this.owner = owner;
    this._balance = balance;
    this.nickname = nickname;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error('Invalid amount');
    }
    // Record a transaction object
    this._balance += amount;
  }
  // private calculateTax() {
  //   // if only want to call this method from inside a method on this class
  //   // don't want to use it on the outside
  //   return this._balance * 2.2;
  // }
  getBalance(): number {
    return this._balance;
  }
}

let accountSecondExample = new AccountTwo(2, 'Char', 150);
// The below will now show a compilation error (if uncommented) as balance is a private property
// So cannot access the property outside the account class
// Can only be changed within a method

// -------------------------------
// accountSecondExample.balance
// -------------------------------

console.log(accountSecondExample.getBalance());

// ===================
// Parameter Properties
// ===================

class AccountThree {
  // Parameter properties
  // tell the compiler to create properties by this name and initialise them in one go
  constructor(
    public readonly id: number,
    public owner: string,
    private _balance: number,
    public nickname?: string
  ) {}

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error('Invalid amount');
    }
    // Record a transaction object
    this._balance += amount;
  }
  // private calculateTax() {
  //   // if only want to call this method from inside a method on this class
  //   // don't want to use it on the outside
  //   return this._balance * 2.2;
  // }
  get balance(): number {
    return this._balance;
  }

  // -------------------------------------
  // Setter example
  // -------------------------------------

  // set balance(value: number) {
  //   if (value < 0) {
  //     throw new Error('Invalid value');
  //   }
  //   this._balance = value;
  // }
}

// ===================
// Getters and Setters
// ===================

// A getter is a method inside a class that we use for getting the value of a property
// see example above
// to run it, see below

let accountThirdExample = new AccountThree(2, 'Darwin', 200);

console.log(accountThirdExample.balance);

// The balance should only be updated as a result of depositing or withdrawing money
// But may want to implement a setter where we get a value and validate it

// see setter example above (would probably not give it the same name as the getter)

// ===================
// Index Signatures
// ===================

// Can't add properties to an object in TypeSCript as TS is very strict about the shape of objects
// But there may be situatiobns where need to add properties to an object dynamically

class SeatAssignment {
  // Seats: A1, A2,
  // Names: Mosh, John
  // Don't want to do this:
  // Repetative
  // What if there a 100, 1000 seats in a venue etc
  // what if, in another venue, the seats are numbered differently?
  // A1: string;
  // A2: string;
  // so instead use an Index signature property as below:
  [seatNumber: string]: string; // can set any other valid type like customer object etc
}

let seats = new SeatAssignment();
seats.A1 = 'Mosh';
// coiuld also use square bracket notation, this is the same as the above:
seats['A1'] = '5';
seats.A2 = 'John';

// So, using index signatures, we can create properties dynamically, just like JS
// But can also get type checking/type safety
// So we know that, in our current declaration
// we can only store string values in these properties.

// ===================
// Static Members
// ===================

// A static property is a property that belongs to a class and not an object
// So will only have one instance of that property in memory

// When make a property or method static
// That property or method becomes part of a class
// and will have only a single instance of them in memory

// Uber Example

class Ride {
  // passenger
  // pickupLocation
  // dropOffLocation
  private static _activeRides: number = 0;
  // constructor(public activeRides: number) {}

  // no longer use 'this' in the methods for the static class
  // -----------------------------------------------------------
  // i.e.

  // start() {
  //   this.activeRides++;
  // }

  // -----------------------------------------------------------

  // 'this' references the current object
  // but an instance of the Ride class does not have a property by this name
  // so need to replace 'this' with the class name

  start() {
    Ride._activeRides++;
  }
  stop() {
    Ride._activeRides--;
  }

  // This getter method is part of a ride object
  // To move it to the right class, have to prefix it
  // with the static keyword as well
  static get activeRides() {
    return Ride._activeRides;
  }
}

// Ride.activeRides = 10;

let ride1 = new Ride();
ride1.start();

let ride2 = new Ride();
ride2.start();

console.log(Ride.activeRides);

// Here, dealing with two separate objects, ride1 and ride 2
// Each object is in separate space in memory
// so each object is independantly tracking the active rights
// that is why the console.logs each show 1 ride

// What is needed is a single or global place where we can keep track
// of the active rights

// This is where we use STATIC PROPERTIES

// A static property is a property that belongs to a class and not an object
// So will only have one instance of that property in memory

// So, once the static properly has been added, will see 2 x total active rides
// (all rides for all current instances)

// ==========================================
// Problem with implementation
// anywhere in this code, can directly modify activeRides by doing:

// Ride.activeRides = 10;

// This is a bug
// need to use access modifiers

// So make the static property private when creating the class (so cannot access it directly):
// private static activeRides: number = 0;

// then create a public getter for reading it's value

// ==========================================

// ===================
// Inheritance
// ===================

// The example shows classes implemented in same file
// As best practice, should have them implemented in separate files

// A mechanism that allows to reuse code

// write code once, use it in many places
// extract common properties and methods and put them in a separate class
// i.e. common properties of Student and Teacher in Person class
// then have Student and Teacher inherit these commonalities

// Parent/Base/Super Class = Person class in example
// Child/Derived/Sub = Student and Teacher

class Person {
  constructor(public firstName: string, public lastName: string) {}

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  walk() {
    console.log('walking');
  }
}

// Inheriting from the person class
class Student extends Person {
  constructor(public studentId: number, firstName: string, lastName: string) {
    // Have a special keyword called 'Super' that we use to reference the base class
    // The below calls the constructor of the base class
    // Need firstname and lastname in the Student constructor as well
    // However, we remove the public modifier from firstName and lastname
    // As do not want to create them again, only want to reference those that already exist
    // only need public on the student ID which is a property specific to this class
    // then include firstName and lastName in the super call
    super(firstName, lastName);
  }

  takeTest() {
    console.log('Taking a test');
  }
}

let student = new Student(1, 'John', 'Smith');
console.log(student.fullName);
console.log(student.walk());

// The example shows classes implemented in same file
// As best practice, should have them implemented in separate files

// ===================
// Method Overriding
// ===================

// sometimes want to change something in the inherited code

// i.e. in teacher class, want to change the implementation of the full name getter
// to prefix name of the teacher with professor
// this is method overriding
// this means changing it's implementation

// note: when using inheritance, if don't want to add extra properties, don't need to use a constructor
// will just inherit the constructor of the person class

class Teacher extends Person {
  // prefix the modified getter with the override keyword
  // to tell the compiler that we're overriding or changing the
  // implementation of this method

  // also use 'super' to reference the base class
  // so don't have to repeat

  override get fullName() {
    // return 'Professor' + super.fullName;
    return `Professor ${super.fullName}`;
  }
}

let teacher = new Teacher('John', 'Smith');

console.log(teacher.fullName);

// Can achieve the same result without using the override keyword

// But this can cause problems when implementing the class
// Can help prevent this by using the following setting in tsconfig.json:

// "noImplicitOverride": true
// /* Ensure overriding members in derived classes are marked with an override modifier. */,

// -------------------------------------------------------------------------------------------
class Principal extends Person {
  override get fullName() {
    // return 'Professor' + super.fullName;
    return `Principal ${super.fullName}`;
  }
}

// because 'Principal' is also a 'Person', can add a principle object in 'printNames' below

// -------------------------------------------------------------------------------------------

// ===================
// Polymorphism
// ===================

// Powerful method build on top of overriding

// Means 'Many Forms'

// Refers to a situation where an object can take many different forms

// Different output depending on the type of person - polymorphism in action
// in each iteration of the for loop, this person object (of type Person) is taking a different form

printNames([
  new Student(1, 'Katie', 'Butler'),
  new Teacher('Albert', 'Einstein'),
  // Enhanced program without single change to the function below
  new Principal('Mary', 'Smith'),
]);

function printNames(people: Person[]) {
  // Example of Polymorphism
  // in each iteration of the for loop,
  // This Person object (of type Person) is taking a different form
  // the Person object is acting Polymorphically
  for (let person of people) {
    console.log(person.fullName);
  }
}

// Open Closed Principle
// Classes should be:
// Open for extension
// Closed for modification

// So, should be able to extend them or inherit from them
// But we should not modify them

// Because, if change or modify a class, we might potentially break something
// somewhere else and end up with a bug

// If properly test the class and know it's working
// then don't have to touch it.

// So, can enhance our application simple by adding new classes

// So we write new code, instead of changing existing code

// Practically speaking, cannot adhere to this principle 100% of the time
// Is impossible and potentially costly
// This is just a guiding principle

// Polymorphism allows us to follow this guidline

// --------------------------------------------------------------------

// Have to use 'override' keyword to tell compiler that
// Are overriding or changing the implementation of the full name getter

// This is how we achieve polymorphic behaviour
// the 'fullName' getter is defined in the Person class

// but have changed it's implementation in a couple of subclasses

// If didn't use the override keyword here
// The getter would be disconnected from the one defined in the base class

// So someone could go and make a change there, refactor it, change the name or restructure it
// And this would break our polymorphic behaviour

// ===================
// Private vs Protected Members
// ===================

// In TS, also have protected members

class PersonProtExample {
  constructor(public firstName: string, public lastName: string) {}

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  // protected walkProt() {
  //   console.log('walking');
  // }

  // private walkPriv() {
  //   console.log('walking');
  // }
}

// If make the 'walk method 'private', can access it anywhere within the class,
// But cannot access it from the outside

// So, if create a 'Person' object, we cannot call the walk method on that object

// Protected members are exactly the same
// Can access them anywhere within the class
// but not from the outside

// The difference:
// protected members are inherited
// private members are not

// so, where the 'walk' method is protected,
// That means, can go to a child class, like 'Student'
// And access it

class StudentProtExample extends PersonProtExample {
  constructor(public studentId: number, firstName: string, lastName: string) {
    super(firstName, lastName);
  }

  takeTest() {
    // this.walkProt - will be available
    // this.walkPriv - will only be available in PersonProtExample, is not inherited
    console.log('Taking a test');
  }
}

// protected members should not be used that often unless you know what you're doing
// because they can create COUPLING in your application

// so just stick to public and private

// Just useful to be aware of them if see them in other people's code

// ===================
// Abstract Classes and Methods
// ===================

class Shape {
  constructor(public color: string) {}

  render() {
    // console.log(object)
  }
}

class Circle extends Shape {
  constructor(public radius: number, color: string) {
    super(color);
  }

  // Actual algorithm for drawing a circle is implemented here
  // Similarly, could have other classes like rectancle, triangle and so on
  // And in all these classes, we implement the render method
  override render(): void {
    console.log('Rendering a circle');
  }
}

// problem with this Shape implementation

let shape = new Shape('red');
shape.render();

// Doesn't make sense to render a shape
// Not a real thing like a circle

// This is where we use abstract classes and methods

// If want to stop us from being able to create an instance of the shape class
// We mark this class as abstract

// Here, telling the TypeScript compiler that this class is Abstract or SIMPLE or NOT READY
// So, another class, like 'Circle', has to extend it

abstract class ShapeAbs {
  constructor(public color: string) {}

  abstract render(): void;
}

// Now, if try to create an instance of a shape
// get a compilation error saying:

// 'Cannot create an instance of an abstract class.'

// ---------------------------------------------------------

// let shapeAbs = new ShapeAbs('green');
// shapeAbs.render();

// ---------------------------------------------------------

// An abstract class is like an uncooked meal, it's not ready

// Another class has to extend it

// Quite often in abstract classes, we have abstract methods
// These are methods that have no implementation
// There is no way for us to implement them
// Just like the render method in 'ShapeAbs'
// so here will prefix the render method with 'abstract'

// remove the braces ({}) as cannot have an implementation
// terminate line with a ';'
// Annotate with the 'void' return type (it can't return anything)

// Abstract methods can only exist in abstract classes

// Abstract has no representation in JaveScript, is purely a TYpeScript concept

// ===================
// Interfaces
// ===================

// In OOP, have another building block called an 'INTERFACE'

// USed to define the 'Interface' or 'shape' of an object

// ---------------------------------------------------------

// All these calendars should have some common properties and methods
// So, can define all these commonalities in a base class called 'Calendar'

// Calendars

// - Google
// - iCal
// - Outlook

abstract class Calendar {
  constructor(public name: string) {}

  // these methods can't have implementation
  // because the implementation depends on the type of calendar
  // i.e. recording an event in a Google calendar is
  // different from an Outlook calendar

  // So should technically all these methods and this class as abstract
  abstract addEvent(): void;
  abstract removeEvent(): void;
}

// The above recreatewd as an Interface:

interface ICalendar {
  name: string;
  addEvent: () => void;
  removeEvent: () => void;
}

// No Interfaces in JavaScript
// The interface purely used by the TypeScript compiler for type checking

// Is more concise and shorter than an abstract class

// ---------------------------------------
// Abstract class or an Interface?

// It depends
// Here, calendar class is not providing any logic or algorithm that subclasses can reuse
// just have method declarations

// So in this case, better to use an Interface
// Because our code will end up being more concise and shorter
// Both in TypeScrip and JavaScript

// If had some logic/algorithm/method with a few lines of code
// and wanted to share that code amongst subclasses
// Then couldn't use an Interface

// Interfaces cannot have method implementations
// Can only specify the signature of our methods
// ---------------------------------------

// Can use Inheritance with Interfaces

// Will inherit everything in Calendar and add something extra
// i.e. in a CloudCalendar might want to sync to the cloud where wouldn't in a non cloud calendar
interface CloudCalendar extends Calendar {
  sync(): void;
}

// Once have an Interface, then what
// At some point, want a real calendar implementation
// Like Google calendar

class GoogleCalendar implements ICalendar {
  constructor(public name: string) {}

  addEvent(): void {
    throw new Error('Method not implemented.');
  }
  removeEvent(): void {
    throw new Error('Method not implemented.');
  }
}

// could later create another class like Outlook calendar that
// implements the same interface

// Now, both these classes will end up having the same shape

// So, using an Interface, can describe the shape of an object
