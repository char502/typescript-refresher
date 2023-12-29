// These types can be inferred as a values have been assigned to them
// They have been initialised with values
let sales: number = 123_456_789;
let course: string = 'TypeScript';
let is_published: boolean = true;

// this variable has a type of 'any' as it's not possible to infer it
// should avoid using any as much as possible
let level;

function render(document: any) {
  console.log(document);
}

// =======================
// Arrays
// =======================

// JS arrays can be dynamic so each element can be of a different type
let numbers: number[] = [1, 2, 3];
numbers[0] = 1;
// can use intellisense to autosuggest functions can run on a number as have
// told ts that each item in an array  is a number
numbers.forEach((n) => n.toString());

// =======================
// Tuples - a fixed length array where each element has a particular type
// =======================

// often Used with pairs of values (i.e. key/value pairs)
// best practice - restrict tuples to only two values
// any thing more than that could make the code hard to understand

let user: [number, string] = [1, 'Mosh'];
// first element will suggestion all number functions
user[0].toFixed(1);
// second element will suggestion all string functions
user[1].slice();
user.push(1);

// =======================
// Enums - a list of related constants
// =======================

// const small = 1;
// const medium = 2;
// const large = 3;

// PascalCase

// By default, the first member defaults to 0

// so need to explicitly set them to be different
// (med and large will be concurrent ie, 2 and 3 etc if not set explicitly)

// adding const here (optional) reduces the compiled (js) code
const enum Size {
  Small = 1,
  Medium,
  Large,
}

let mySize: Size = Size.Medium;
console.log(mySize);

// if want values to be a string, have to set each one explicitly

// adding const here (optional) reduces the compiled (js) code
const enum SizeAsString {
  SmallAsString = 's',
  MediumAsString = 'm',
  LargeAsString = 'l',
}

let stringSize: SizeAsString = SizeAsString.MediumAsString;
console.log(stringSize);

// =======================
// Functions
// =======================

// How TypeScript helps avoid common problems when working with functions
// Best practice, should always properly annotate our functions

// Use 'void' as return type if are not going to return a value

function calculateTax(income: number, taxYear = 2022): number {
  if (taxYear < 2022) return income * 1.2;
  return income * 1.3;
}

// only have to include 1 x parameter as have given a default value to taxYear
calculateTax(10_000, 2023);

// =======================
// Objects
// =======================

// readonly - prevents accidentally modifying the value of this property

let employee: {
  readonly id: number;
  name: string;
  retire: (date: Date) => void;
} = {
  id: 1,
  name: 'Mosh',
  retire: (date: Date) => {
    console.log(date);
  },
};

// =======================
// Type Aliases
// =======================

// A type alias
// This can be used in multiple places
type EmployeeAlias = {
  readonly id: number;
  name: string;
  retire: (date: Date) => void;
};

let employeeAliasExample: EmployeeAlias = {
  id: 1,
  name: 'Mosh',
  retire: (date: Date) => {
    console.log(date);
  },
};

// =======================
// Union types
// =======================

// Can give a variable or a function more than one type

function kgToLbs(weight: number | string): number {
  if (typeof weight === 'number') {
    // will auto suggest all functions can apply to a number
    return weight * 2.2;
  } else {
    // will auto suggest all functions can apply to a string
    return parseInt(weight) * 2.2;
  }
}

kgToLbs(10);
kgToLbs('10kg');

// =======================
// Intersection types
// =======================

// an object that is a number and a string at the same time
let weight: number & string;

type Draggable = {
  drag: () => void;
};

type Resizable = {
  resize: () => void;
};

// More realistic example of an intersection type
type UIWidget = Draggable & Resizable;

// Now, with this type in place, we can declare a
// variable called textbox, which is a UI widget

let textBox: UIWidget = {
  drag: () => {},
  resize: () => {},
};

// =======================
// Literal Types
// =======================

// Literal (exact, specific)
type Quantity = 50 | 100; // Example of a literal type (don't have to be numbers)
let quantity: Quantity = 50;

type Metric = 'cm' | 'inch';

// =======================
// =======================
// Nullable Types
// =======================
// =======================

// By defalt, TS very strict about using null or undefined values
// Because these are a common source of bugs in applications

function greet(name: string | null | undefined) {
  if (name) {
    console.log(name.toUpperCase());
  } else {
    console.log('Hola!');
  }
}

greet(undefined);

// =======================
// Optional Chaining
// =======================

type Customer = {
  birthday?: Date;
};

function getCustomer(id: number): Customer | null | undefined {
  return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(1);
// Optional property access operator
// code only executed if have a customer that is not null or undefined
console.log(customer?.birthday?.getFullYear());

// Optional element access operator (useful when dealing with arrays) (?.)
//    customers?.[0]

// Optional call
// let log: any = (message: string) => console.log(message);
let otherLog: any = null;

// This code will get executed only if log is referencing an actual function
otherLog?.('a');

// =======================
// Nullish Coalescing Operator
// =======================

let speed: number | null = null;

// 30 as a default value
let ride = {
  // Falsy (undefined, null, '', false, 0)
  // what if 0 is a valid value for the speed?
  // If 0 entered here, it's going to be ignored because it's a false value
  speed: speed || 30,
};

// so, a more accurate way to implement this scenario is by checking for null

let alternativeRide = {
  speed: speed !== null ? speed : 30,
};

let nullishCRide = {
  // Nullish Coalescing Operator (??)
  // If speed is not null or undefined, use that value
  // or use 30 as a default value

  // the value for speed will be used when it's present but when it's null or undefined,
  // use 30 in it's place
  speed: speed ?? 30,
};

// =======================
// Type Assertions
// =======================

// Sometimes we know more about the type of an object than typeScript
// need to tell the compiler not to infer it

let phone = document.getElementById('phone') as HTMLInputElement;
// HTMLElement
// HTMLInputElement
// Once have added 'as HTMLInputElement' can access the value property
console.log(phone.value);
// In TS, the 'as' keyword doesn't perform any type conversion
// so it's not going to convert the object that is returned
// from this method to a different type of object

// This is purely for telling the compiler that we know more about
// the type of this object
// So if the object that is returned from this method is not a HTMLInputElement
// this line is not going to raise any exceptions

// And instead, when we try to access the value property (for example),
// our program is going to crash

// So be aware, there is not type conversion happening under the hood

// ==========================================
// Another syntax to use type assertion
// instead of using the 'as' keyword, use <> as shown below

let phoneAlt = <HTMLInputElement>document.getElementById('phone');

// A couple of examples:

// --------------------------------------------------
// Type Assertion:
let code: any = 123;
let employeeCode = <number>code;
console.log(typeof employeeCode); //Output: number
// --------------------------------------------------
// --------------------------------------------------
// Type Assertion with Object:
let employeeObjOne = {};
// employeeObjOne.name = 'John'; //Compiler Error: Property 'name' does not exist on type '{}'
// employeeObjOne.code = 123; //Compiler Error: Property 'code' does not exist on type '{}'

// --------------------------------------------------

interface Employee {
  name: string;
  code: number;
}

let employeeObj = <Employee>{};
employeeObj.name = 'John'; // OK
employeeObj.code = 123; // OK

// =======================
// The unknown Type
// =======================

// --------------------------------------------------
// The unknown type is the type-safe version of any.
// Similar to any, it can represent any value but we cannot perform
// any operations on an unknown type without first narrowing to a more specific type.
// --------------------------------------------------

// object is of type unknown
// So the compiler doesn't know about the type of the document
// it doesn't know if there is a 'move', 'fly' or other methods on this object

// this where we use 'type narrowing'
// By using a type guard, we can narrow down the type of an object
// And get more specific
function renderUnkType(document: unknown) {
  // Narrowing
  if (typeof document === 'string') {
    // within this block, will now have access to all string methods i.e.
    document.toUpperCase();
  }
  // typeof only works for primitive types like string, boolean, number
  // if have custome objects created with classes, have to use another operator
  // called instanceof
  // --------------------------------------------------
  // if (document instanceof functionsObject) {
  //   document.move();
  //   document.fly();
  //   document
  // --------------------------------------------------
}

// the 'unknown' type is preferred to the 'any' type
// because the compiler forces us to do some type checking
// to make sure the methods we're calling exist on the target object

// =======================
// The never Type
// =======================

// --------------------------------------------------
// The never type represents values that never occur.
// We often use them to annotate functions that never return or always throw an error.
// --------------------------------------------------

// represents values than never occur

function reject(message: string): never {
  throw new Error(message);
}

function processEvents(): never {
  // infinite loop in the example
  while (true) {
    // read a message from a queue
  }
}

// reject('...');
// processEvents();
// If processEvents() as above is  uncommented - the below never runs because processEvents() contains an infinite loop
// console.log('Hello World');

// =======================
// Exercises
// =======================

type UserAlias = {
  name: string;
  age: number;
  occupation?: string;
};

let usersExample: UserAlias[] = [
  { name: 'John Smith', age: 30, occupation: 'Software engineer' },
  { name: 'Kate Müller', age: 28 },
];

type Bird = {
  fly: () => void;
};

type Fish = {
  swim: () => void;
};

type Pet = 'Bird' | 'Fish';

type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

// let userAbc = getUser();
// console.log(userAbc?.address?.street);

// let x = foo ?? bar();

// value is declared as an unknown type.
// In order to call methods on an unknown object, we have to use type narrowing first:

let value: unknown = 'a';
if (typeof value === 'string') {
  console.log(value.toUpperCase());
}