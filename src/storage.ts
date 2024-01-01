//
export default class Store {}

// Classes for compressing and Encrypting objects
// while storing them in the 'Store'
// In this case, don't want to export
// the below classes as they are part of the implementation detail of this module

// So other modules shouild not know about their existence
// All they need to know is the 'Store' class
// So they just create a new 'Store' and add an object to it
// Everything else is an implementation detail

// i.e. like a remote control, most implementation details are hidden
// reducing the coupling/dependancy between our modules

// -----------------------------------------------------------

// If exporting only a single thing from a module
// Indicate that this is the default object exported from this module module

// export default class Store {}

// default exports can coexist with named exports

// Other modules need to know about the 'Format' enum
// Now, when importing these objects

export enum Format {
  Raw,
  Compressed,
}
//
// -----------------------------------------------------------

// class Compressor {}

// class Encryptor {}
