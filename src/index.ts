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
