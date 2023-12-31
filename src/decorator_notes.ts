// Decorators

// Allow to change and enhance classes

// ===================
// What are decorators
// ===================

// attributes that apply to our classes and their members
// And with this, can change how they behave

// Frequentlt use in Angular and Vue applications

// Convert a class for a web application

// ---------------------------------------------------------
// @Component
// class ProfileComponent {}
// ---------------------------------------------------------

// Ts doesn't have this component or any build in decorators
// so have to create our own
// Angular and Vue come with a number of build in decorators
// like component/pipe etc

// ---------------------------------------------------------
// Under the hood, the decorator is just a function
// that gets called by the JavaScript runtime

// So the JavaScript runtime or the JavaScript engine that executes our code is going
// to call that function and pass our class to it

// In that function, have a chance to modify this class
// Can add new properties
// Add new methods
// Change the implementation of existing methods
// ---------------------------------------------------------

// Before can create any decorators, first, have to enable a special compiler option
// They are an experimental feature and
// Their standards and implementation might change in the future

// ===================
// Class Decorators
// ===================

// A decorator is just a function that gets called by the JavaScript runtime

// depending on where we're going to apply this decorator, the number and type
// of parameters varies

// If applying to a class, should have a single parameter
// that represents our constructor function
// Can call it anything but it's the type that matters
// If the type is a function,
// The runtime assumes We're going to apply this on a class

// In the function, have a chance to modify or enhance our class
// So can add new properties and methods/change existing methods
// Can even delete properties and methods

// Can take the constructor and go to it's prototype
// Every object in JS has prototype
// From which it inherits various properties and methods
// can go to this prototype and add new properties and methods
// then, all instances of profile component
// (or any classes that have) the 'Component' decorator
// Will inherit those new properties and methods

// insertInDOM lets say every component should have a method for inserting it in the DOM
// So when add a component in the DOM, then the browser is going to show that component to the user

// So now, every instance of profile component is going to have these new members

// -----------------------------------------------------------------------------

// Could also solve this problem using inheritance
// So, instead of defining a decorator
// Could create a base class
// this is another way to solve the same problem
// But decorators are just another tool in our toolbox
class ComponentBaseClass {
  insertInDom() {}
}

// Then have ProfileComponent extend the base component class

class ProfileComponentExtend extends ComponentBaseClass {}

// -----------------------------------------------------------------------------

function Component(constructor: Function) {
  console.log('Component decorator called');
  constructor.prototype.uniqueId = Date.now();
  constructor.prototype.insertInDOM = () => {
    console.log('Inserting the component in the DOM');
  };
}

// -------------------------------------------------------
// @Component
// class ProfileComponent {}
// -------------------------------------------------------

// Will get 'Component decorator called' when running the above
// Even though we didn't create any instances of the profile component
// Whether have 0 or 10 instances,
// This decorator is called once
// And this is our chance to enhance or modify our classes

// ===================
// Parameterized Decorators
// ===================

// Sometimes, need to pass arguments to our decorators

// Put decorator inside another function
// Now have a decorator factory

// This function is acting as a factory for creating a decorator

function ComponentParamExample(value: number) {
  return (constructor: Function) => {
    console.log('Component decorator called');
    constructor.prototype.options = value;
    constructor.prototype.uniqueId = Date.now();
    constructor.prototype.insertInDOM = () => {
      console.log('Inserting the component in the DOM');
    };
  };
}

// More real world, as seen in frameowrks like Angular
// pass an object as an argument to the decorator

type ComponentOptions = {
  selector: string;
};

function ComponentParamAngular(options: ComponentOptions) {
  return (constructor: Function) => {
    console.log('Component decorator called');
    constructor.prototype.options = options;
    constructor.prototype.uniqueId = Date.now();
    constructor.prototype.insertInDOM = () => {
      console.log('Inserting the component in the DOM');
    };
  };
}

// Selector is the Id of an element in the DOM
// -------------------------------------------------------
// @ComponentParamAngular({ selector: '#my-profile' })
// class ProfileComponentAngular {}
// ------------------------------------------------------

// ===================
// Decorator Composition
// ===================

// Can also apply multiple decorators to a class or it's members

function Pipe(constructor: Function) {
  console.log('Pipe decorator called');
  constructor.prototype.pipe = true;
}

@ComponentParamAngular({ selector: '#my-profile' })
@Pipe
class ProfileComponentAngular {}

// Output - decorators are applied in reverse order
// Idea comes from Maths

// Pipe decorator called
// Component decorator called

// If have expression like f of g of x f(g(x))
// First 'g' of 'x' is evaluated
// Then the result is passed to 'f'

// So in this case,
// Because each decorator is a function
// first, the 'Pipe' decorator is going to get called with our profile component
// (So it's going to enhance our component)
// Then the result is going to get passed to the 'ComponentParamAngular' decorator

// ===================
// Method Decorators
// ===================

// Can enhance our methods using decorators

// To apply a decorator on a method, need 3 x parameters

// 1. The object that owns the target method
// (in this case, 'any' is the type that the TypeScript compiler expects from us)
// 2. Name of the target method
// 3. Descriptor object or target method
// Property Descriptors: every property in an object has a descriptor object
// That describes that property

// The names don't matter but there needs to be 3 of them and they all need to be of a specific type

// ------------------------------------------------------------------------------------------
// function Log(target: any, methodName: string, descriptor: PropertyDescriptor) {
//   // 'value' references the target method
//   // So, can set this to a new function to replace the original function or method
//   // the below can replace the 'say' function
//   // Normally would want to enhance a method rather completely replace it

//   // So, want to do something before or after that method
//   descriptor.value = function () {
//     console.log('New Implementation');
//   };
// }
// ------------------------------------------------------------------------------------------

function LogBefore(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  // get a reference to the original method
  // Better to use the const keyword as don't want to accidentally reset this variable to something else
  // Type assertion here as property set in parameters as 'any'
  // Need to tell the TypeScript compiler that this is a function
  const original = descriptor.value as Function;

  // Normally would want to enhance a method rather completely replace it
  // So, want to do something before or after that method
  descriptor.value = function (message: string) {
    console.log('Before');
    // Call the original method in the middle
    // Need a reference to the original method
    // don't get any intellisense here as type of property is 'any'
    // have to use type assertion ('as Function')

    // Use the 'call method on the function'
    // Takes 2 x params, the 'this' keyword
    // And the Argument (or arguments) want to pass to the target function
    // Hard Coded here
    original.call(this, message);
    console.log('After');
  };
}
class PersonMethDecs {
  @LogBefore
  // can completely replace this method with an entirely new method
  say(message: string) {
    console.log('Person says ' + message);
  }
}

let personDecExample = new PersonMethDecs();
// The value that we pass here is going to get ignored
// Because it's going to get replaced by the hard coded value in the LogBefore decorator
// As that is the new Implementation of the same method.
// So, in this new implementation we don't have a parameter like 'message',
// We have hard coded a value and we're going to pass to the original

// What if want to use the actual argument ('Hello')
// pass parameter on descriptor as above: (descriptor.value = function (message: string) {)
// then add to the function call in the decorator: (original.call(this, message))

// Small problem
// With this implementation, can only apply this decorator on functions or methods
// With this signature
// Methods that have one parameter of type string
// So not very flexible

personDecExample.say('Hello');

// ----------------------------------------------------------------------------------------

// To make decorator more flexible
// So can apply this decorator on any type of method:

function LogFlexibleParams(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value as Function;
  // Use rest operator to allow this function to take varying number of parameters

  // Also, using a function expression not an arrow function
  // If we use an arrow function, we get a compilation error
  // Because arrow functions don't define their own 'this' keyword
  // so we cannot use them as methods in a class

  // So, when redefining methods, we should always use a function expression
  descriptor.value = function (...args: any) {
    console.log('Before');
    // While calling the original function, going to use the spread operator
    // So we spread all these arguments and pass them one by one to the original function
    original.call(this, ...args);
    console.log('After');
  };
}
class PersonMethFlexParams {
  @LogFlexibleParams
  // can completely replace this method with an entirely new method
  say(message: string, something: number, somethingElse: boolean) {
    console.log('Person says ' + message, something, somethingElse);
  }
}

let personDecFlexParamsExample = new PersonMethFlexParams();

// Small problem
// With this implementation above, can only apply this decorator on functions or methods
// With this signature
// Methods that have one parameter of type string
// So not very flexible

personDecFlexParamsExample.say('Hello', 8, true);

// ===================
// Accessor Decorators
// ===================

// Applying decorators to getters and setters

// Accessor decorators are very similar to method decorators
// Because this accessor is a getter
// under the hood it's just a method
// so, need 3 x parameters just like method decorators
function Capitalize(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  // first need a reference to the original method/getter
  // 'descriptor.value' only works for regular methods
  // here, have to use the 'get' property
  const originalMethod = descriptor.get;

  // now, redefine the getter
  // getters cannot have any arguments
  // so no args required
  descriptor.get = function () {
    // A '?' was added here
    // Is called optional chaining
    // we see this because original can be undefined

    // --------------------------
    // The equivalent is:
    // if (originalMethod !== null && originalMethod !== undefined) {
    //   originalMethod?.call(this);
    // }
    // --------------------------

    // In this case
    // Need to check if result is a string object
    // Then we're going to return string to Uppercase
    const result = originalMethod!.call(this);

    return typeof result === 'string' ? result.toUpperCase() : result;

    // In this case, know original is not going to be undefined
    // because we're going to apply this decorator on a getter
    // so 'originalMethod' will always have a value
    // In this case, instead of a '?'
    // Could use an '!'
    // And with this, we're telling the compiler.
    // 'I know this is not going to be null or undefined so trust me'
  };
}

class PersonAccessDec {
  constructor(public firstName: string, public lastName: string) {}

  @Capitalize
  get fullName() {
    // return null;
    return `${this.firstName} ${this.lastName}`;
  }
}

let personAccExample = new PersonAccessDec('johnny', 'black');
console.log(personAccExample.fullName);

// ===================
// Property Decorators
// ===================

// A decorator for enhancing a property
// proeprty decorators are very similar to method decorators except do not have a property descriptor
// Instead, going to define a property descriptor for the target property
function MinLength(length: number) {
  return (target: any, propertyName: string) => {
    let value: string;

    // better to use 'const' here as don't want to accidentally reassign it
    const descriptor: PropertyDescriptor = {
      // need a getter to return setter check
      get() {
        return value;
      },
      // perform data validation inside a setter
      set(newValue: string) {
        if (newValue.length < length) {
          throw new Error(
            `${propertyName} should be at least ${length} characters long.`
          );
        }
        value = newValue;
      },
    };
    Object.defineProperty(target, propertyName, descriptor);
  };
}

class UserPropDecExample {
  @MinLength(4)
  // With this decorator, can ensure that our passwords are at least 4 characters long
  password: string;

  // In this case, cannot use the public modifier
  // because going to apply our new decorator on this property itself
  constructor(password: string) {
    this.password = password;
  }
}

let userPropDec = new UserPropDecExample('kjdp');
// every time try to set the password, our decorator gets called and validates the new value

// ------------------------------------------------
// userPropDec.password = '1';
// console.log(userPropDec.password);
// ------------------------------------------------

// So, with property decorators, can enhance existing properties

// ===================
// Parameter Decorators
// ===================

// Not something used that often but if designing a framework for other people to use
// Then, might want to know how this parameter decorator works

type WatchedParameter = {
  // Two pieces of information we need to know about these watch parameters
  methodName: string;
  parameterIndex: number;
};

// Array of watch parameters
const watchedParameters: WatchedParameter[] = [];

// Has 3 x parameters
function Watch(target: any, methodName: string, parameterIndex: number) {
  // Store some metadata about these parameters
  // So later our framework can do something about them
  watchedParameters.push({
    methodName,
    parameterIndex,
  });
  // So, we're collecting some metadata
  // And our framework can use this metadata later on to do something
  // Perhaps at some point we're going to create objects
  // And we want to know what parameters we shoudl watch
}
class Vehicle {
  // A parameter decorator for watching this parameter
  move(@Watch speed: number) {}
}

console.log(watchedParameters);

// returns:  [ { methodName: 'move', parameterIndex: 0 } ]

// So now know that, in the 'move' method
// We have to watch the first parameter

// Create a decorator for adding a sauce to Pizza instances:

// Exercise:

@Sauce('pesto')
class Pizza {}

// In the above example, all instances of the Pizza class should have a sauce property set to pesto.

// Solution:

function Sauce(sauce: string) {
  return (constructor: Function) => {
    constructor.prototype.sauce = sauce;
  };
}
