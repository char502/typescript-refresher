// ===================
// Generics and reusable types
// ===================

// ===================
// Understanding the Problem
// ===================

class KeyValuePair {
  constructor(public key: number, public value: string) {}
}

let pair = new KeyValuePair(1, 'Apple');

// what if, somewhere else in application,
// wanted the key to have a string value (not a number)

// ----------------------------------------------------
// Have 2 x solutions

// 1.
// define key parameter as 'any'
// so can pass any kinf of object for the key (not ideal as lose type safety)

// 2.
// duplicate the class and call the second one 'StringKeyValuePair' and
// define the ket parameter as a string

class StringKeyValuePair {
  constructor(public key: string, public value: string) {}
}

let pairWithKeyString = new StringKeyValuePair('1', 'Apple');

// Would be repetative and redundant, and what if want different types for the value
// would have to create yet another class

// ------------------------------------------------------
// Need a common and reusable solution
// ------------------------------------------------------

// ===================
// Generic Classes
// ===================

// often use T as generic classes in TypeScript are the same as template classes in C++
// And T is short for template

// Can use anything you like, T is common
// But here, might want K and V as they correspond to a Key and Value
class KeyValuePairGeneric<K, V> {
  constructor(public key: K, public value: V) {}
}

let pairGenericStringNumber = new KeyValuePairGeneric<string, number>('1', 5);

// can then get type safety and intellisense on key even though it was defined as a generic
// (then set later as a string in this instance)
// pairGenericStringNumber.key.
// pairGenericStringNumber.value

// ------------------------------------------------------
// In the example, have only made the 'key' generic
// Can make the value generic as well
// ------------------------------------------------------

// what if don't supply the generic type args

let pairStringNumberNoArgs = new KeyValuePairGeneric(7, 'aString');

// The compiler can infer the type of the key and the value
// As have passed a number and a string here, the compiler knows that
// The key is a number and the value is a string in this case

// pairStringNumberNoArgs.value.

// ------------------------------------------------------
// So, most of the time, don't have to explicitly supple generic type arguments
// The compipler can infer them for us
// ------------------------------------------------------

// ===================
// Generic Functions
// ===================

// As well as generic classes, can create generic functions/methods

function wrapInArray(value: number) {
  return [value];
}

let numArr = wrapInArray(1);

// Ininitial state above, can't pass a string value

// Can use generics to make this function generic or reusable

function wrapInArrayGeneric<T>(value: T) {
  return [value];
}

let genStrArr = wrapInArrayGeneric('a'); // type is string[]
let genNumArr = wrapInArrayGeneric(2); // type is number[]

// What about a function inside a class

class ArrayUtils {
  wrapInArrayGenMethod<T>(value: T) {
    return [value];
  }
}

let utils = new ArrayUtils();

// Just as with standalone function can run the method with a string or a number
// let numsFromClass = utils.wrapInArrayGenMethod('f')
// let numsFromClass = utils.wrapInArrayGenMethod(5)

// ------------------------------------------------------------

// could make it a static method and access the method directly
// (not have to create an object first - as static methods belong to classes)
class ArrayUtilsStat {
  static wrapInArrayStaticMethod<T>(value: T) {
    return [value];
  }
}

let utilsStat = ArrayUtilsStat.wrapInArrayStaticMethod(5);

// ===================
// Generic Interfaces
// ===================

// Can also make interfaces generic

// defining an interface for representing the result of calling one of these endpoints:

// http://mywebsite.com/users
// http://mywebsite.com/products

// As data can be different depending on whether the endpoint is calling 'users' or 'products'
// We represent that future (as yet unknown) type as 'T'

// When calling data from an endpoint, may also get an error so would need to include that as well
// Would be string or null as may not necessarily get an error
// The data would also be T or null as won't have data where there is an error
interface Result<T> {
  data: T | null;
  error: string | null;
}

// using the genric interface
// Because this function is returning a generic result
// should also add the generic type at the beginning

function fetch<T>(url: string): Result<T> {
  console.log(url);
  return { data: null, error: null };
}

// interfaces for the api result

interface User {
  username: string;
}

interface Product {
  title: string;
}

// If don't have a generic type argument and just have fetch()
// Will get a result of 'unknown'
// The TS compiler cannot infer the generic type argument for us
// Have to explicitly specify it

let result = fetch<User>('url');
// result.data, will then show all properties of our user object (i.e. username)
// If calling a 'Product'
// result.data, will then show all properties of our product object (i.e. title)

// result.data.<username or title depending on defined type for 'T'>

// ===================
// Generic Constraints
// ===================

function echo<T>(value: T): T {
  return value;
}

// What if want to constrain/limit the type of objects that can pass to the function

echo(false);

// --------------------------------------------------------------------
// Use 'extends' to specify the type that can be assigned to 'T'
// --------------------------------------------------------------------

function echoLimitedType<T extends number | string>(value: T): T {
  return value;
}

// if true to pass a boolean below, will get a compilation error

echoLimitedType(8);

// --------------------------------------------------------------------
// Can also constrain by the shape of an object
// --------------------------------------------------------------------

function echoObjLimitedType<T extends { name: string }>(value: T): T {
  return value;
}

// Now, can only pass objects that conform to this shape
echoObjLimitedType({ name: 'Bob' });

// --------------------------------------------------------------------
// Can also constrain with an interface
// --------------------------------------------------------------------

interface PersonGeneric {
  name: string;
}

function echoInterfaceLimitedType<T extends PersonGeneric>(value: T): T {
  return value;
}

echoInterfaceLimitedType({ name: 'Jane' });

// --------------------------------------------------------------------
// Can also constrain by class
// --------------------------------------------------------------------

class PersonClassExample {
  constructor(public name: string) {}
}

class CustomerClassExample extends PersonClassExample {}

function echoClassLimitedType<T extends PersonClassExample>(value: T): T {
  return value;
}

// Any object that is a 'PersonClassExample'
// That means, any instance of 'PersonClassExample'
// Or any classes that directly or indirectly derive from PersonClassExample
echo(new PersonClassExample('h'));
echo(new CustomerClassExample('j'));

// ===================
// Extending Generic Classes
// ===================

interface Product {
  name: string;
  price: number;
}

// Need a mechanism for storing these objects

// Need to store different kinds of objects:
// products, orders, agopping carts etc

// So need to add a generic type parameter to make this class generic

// In this case, don't want to create a constructor because it doesn't really
// make sense to create a new instance of this class and give it an empty array
// Like new Store([])
// This is unnecessary
// Is better to give this responsibility to this class itself
// So, have initialised it directly

class Store<T> {
  protected _objects: T[] = [];

  add(obj: T): void {
    this._objects.push(obj);
  }
}

// What to prevent this happening
// Wiping out the array

// -------------------------------------------------------------------
// let store = new Store<Product>();
// store.objects = [];
// -------------------------------------------------------------------

// so need to make it private so it's only accessible within the store class

// Three different scenarios:

// -------------------------------------------------------------------
// 1. Passing on the generic type parameter from parent to (inherited) child class
// -------------------------------------------------------------------

// Need to add a generic type parameter to original class (Store)
// and the new instance of this class (CompressibleStore)
// otherwise the new class instance won't be able to accept a generic type parameter

// new CompressibleSTore() // won't be able to take a generic type argument

// -------------------------------------------------------------------

// With: class CompressibleStore<T> extends Store<T>
// Now the compiler knows that, whatever we pass for T,
// Is going to be used as teh argument for this generic class

// so can now do: new CompressibleStore<Product>()

// In this scenario, we are passing on the generic type parameter

// The generic type parameter we have in the base class
// Is also going to be used in the child class
class CompressibleStore<T> extends Store<T> {
  compress() {
    // compress items
  }
}

let store = new CompressibleStore<Product>();
store.compress;

// -------------------------------------------------------------------
// 2. Implement a method for finding objects
// Example - How to Restrict the generic type parameter
// -------------------------------------------------------------------

// include undefined in case can't find the given object

// _objects property not available because it was made private
// private members are not inherited in child classes

// To fix this problem need to make the _objects property 'protected'

// predicate: You use predicate functions to check if your input meets some condition

// ---------------------

// class SearchableStore<T> extends Store<T> {
//   find(name: string): T | undefined {
//     // property name does not exist on type T
//     // The compiler doesn't know that this type T has a property
//     // by this name
//     // can solve this problem by adding a constraint
//     return this._objects.find((obj) => obj.name === name);
//   }
// }

// ---------------------

// Add a constraint to T:

// --------------------------------------------------------------------

// Use 'extends' to specify the type that can be assigned to 'T'

class SearchableStoreWConstraint<T extends { name: string }> extends Store<T> {
  find(name: string): T | undefined {
    // property name does not exist on type T
    // The compiler doesn't know that this type T has a property
    // called 'name'
    // can solve this problem by adding a constraint
    return this._objects.find((obj) => obj.name === name);
    // This function, takes an object, the name property of that object
    // should be equal to the name argument that receive in the find method
  }
}

// --------------------------------------------------------------------

// So now can use this generic class for finding any kind of object
// that has a name property

// It doesn't have to be product
// It could be anything (as long as have a name property in that object)
// We can use this class to store that object and find it

// -------------------------------------------------------------------
// 3. Fix (or terminate) the generic type parameter
// -------------------------------------------------------------------

// Certain operations that can only be performed on products

// In this scenario, we don't have a generic type parameter here
// beacuse, you're dealing with a very specific store (don't want it to be generic)

// Fix (or terminate) the generic type parameter
class ProductStore extends Store<Product> {
  // This method is very specific to products
  // don't want to use this in a 'user' store or a 'shopping cart' store
  filterByCategory(category: string): Product[] {
    // for simplicity, just returning an empty array
    console.log(category);
    return [];
  }
}

// When extending a generic class, we have 3 x options:

// Can fix the generic type parameter
// We can restrict it (apply a constraint)
// Can simply pass it on to the child class

// ===================
// The keyof Operator
// ===================

// -------------------------------------------------------------------
interface ProductWKOf {
  name: string;
  price: number;
}
// -------------------------------------------------------------------

// should be able to find any object that has a property with a given value
class StoreWKOf<T> {
  protected _objectsWKOf: T[] = [];

  addWKOf(obj: T): void {
    this._objectsWKOf.push(obj);
  }

  // return value is either an instance of T
  // or undefined if there is no object that satisfies this criteria
  findWKOf(property: keyof T, value: unknown): T | undefined {
    // Problem here in that, because using the square bracket syntax
    // The compiler thinks we're using an index signature property
    // Index signatures are used for dynamically adding properties to an object
    // But in this case, we're not dealing with dynamic properties
    // We're dealing with actual properties of an object
    // So, to solve this problem, we should tell the compiler
    // No, we are not using an index signature
    // We are working with actual properties of type T

    // And to do that, we just change the type of property from string
    // To keyof (or property of) T
    // So, the property that we pass here,
    // Can only be one of the keys or properties of type T
    // So, if T is ProductWKOf, then keyof T => 'name' | 'price'

    // the keyof operator returns a union of properties of the given type
    // And thay is why, we can only pass, either name or price when calling this method
    // So, when pass a non-existant property
    // Will get a compile time error
    return this._objectsWKOf.find((obj) => obj[property] === value);
  }
}

// -------------------------------------------------------------------
let storeWKOf = new StoreWKOf<ProductWKOf>();
storeWKOf.addWKOf({ name: 'a', price: 1 });
storeWKOf.findWKOf('name', 'a');
storeWKOf.findWKOf('price', 1);
// storeWKOf.findWKOf('nonExistingProperty', 1);

// With this implementation, we can call the find method and pass a non existing property
// And when we run our program, our program is going to crash
// Because there is no product by the name 'nonExistingProperty' in the product interface

// This is where we use the keyof operator to solve this problem
// -------------------------------------------------------------------

// ===================
// Type Mapping
// ===================

// Sometimes, need to base a type on another type

// this is called type mapping

interface ProdMap {
  name: string;
  price: number;
}

// what if, somewhere else in application, need a product with Read Only properties

// One option,
// Duplicate the interface

interface ReadOnlytProdMap {
  readonly name: string;
  readonly price: number;
}

// Not a good solution, as have to update both each time

// -----------------------------------------------------------
// Type mapping, create a new type based on an existing type
// but in this new type, we want to add all these properties dynamically
// and make them readonly

// Start with 'type' keyword as here we have to create a type alias, so we cannot use an interface

// Then, instead of hard coding these property names here
// Going to use index signature syntax to dynamically add properties
// And
// Using the keyof operator, we're going to dynamically get the properties of the product type

type ReadOnlyProdMapKey = {
  // Index Signature
  // keyof operator
  readonly [Property in keyof ProdMap]: ProdMap[Property];
  // Using the keyof operatror you're getting all keys/properties of the ProdMap
  // Using the 'in' operator, you're iterating over these keys
  // And 'Property' in each iteration is going to hold one of these property names
  // So, in the first iteration, 'Property' is going to be 'name'
  // In the second iteration, it's going to be price
  // So, kind of like a for loop

  // So, get the properties, what about the type?
  // In this case, want to use same types have used in the ProdMap interface (ProdMap[Property])

  // So if 'Property' is 'name' (first iteration)
  // ProdMap of 'Property' will return 'string'

  // So if 'Property' is 'price' (second iteration)
  // ProdMap of 'Property' will return 'number'

  // So, getting all the keys of a product, as well as their type

  // can then make them readonly in one go
};

// So now, if we create a product of this type
// All these properties are going to be readonly

let Prd: ReadOnlyProdMapKey = {
  name: 'a',
  price: 1,
};

// now if try to set one of the properties to some other value
// will get a compilation error
// Prd.name = 'fgh'; // Result - Cannot assign to 'name' because it is a read-only property

// --------------------------------------------------------

// Next level,
// Why do we limit ourselves to ProdMap

// What if need another type of readonly object, like, readonly customer

// Here can add a generic type parameter

type ReadOnlyMapKey<T> = {
  readonly [Property in keyof T]: T[Property];
};

// Now can create a readonly product, or a readonly customer or any kind of given object

interface CustomerExample {
  id: number;
  name: string;
  address: string;
}

let Cust: ReadOnlyMapKey<CustomerExample> = {
  id: 1,
  name: 'Olivia',
  address: 'Pearson',
};
// --------------------------------------------------------

// Now, using the same technique
// Can create a product type with optional properties

// To make each property optional, we have to append a '?' at the end
// And for the type use T[K] (T in K)

type Optional<T> = {
  [K in keyof T]?: T[K];
};

// Similarly, can create another type and make each property nullable

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// Because these types are pretty useful
// They are actually built into TypeScript

// ================
// Exercises
// ================

function echoCheck<T>(arg: T): T {
  return arg;
}

// ----------------------------------------------------------

function printName<T extends { name: 'something' }>(obj: T) {
  console.log(obj.name);
}

// ----------------------------------------------------------

class Entity<T> {
  constructor(public id: T) {}
}

// ----------------------------------------------------------

interface User {
  userId: number;
  username: string;
}

// keyof will return - a union of the properties of User

// 'userId' | 'username'
