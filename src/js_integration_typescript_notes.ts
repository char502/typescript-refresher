// ===================
// ===================
// Integration with JavaScript
// ===================
// ===================

// ===================
// Including JS Code in TS Projects
// ===================

// How to run TypeScript and JavaScript code side by side

// will get a compilation error because,
// by default JavaScript code is not included in the compilation process
// So, the TypeScript compipler cannot 'see' our tax module

// Solve this problem by
// tsconfig.json, have to turn on:

// --------------------------------
// "allowJs": true
// --------------------------------

/* Allow JavaScript files to be a part of your program. 
 Use the 'checkJS' option to get errors from these files. */

import { calculateTax } from './tax';

let tax = calculateTax(10_000);
console.log(tax);

// ===================
// Enable Type Checking in JS Code
// ===================

// Using JS by defult, don't get any type checking

// can turn this on in tsconfig.json
// will get some basic type checking
// Not as comprehensive as in TS files but it's better than nothing

// "checkJs": true,
// Enable error reporting in type-checked JavaScript files.

// Can use // @ts-nocheck (At top of file)
// So TS stays silent

// let tax = calculateTax(); fron a .js file can receive any type of argument
// As income parameter is set to any by default it can
// receive any kind of arg including undefined
// which is what is applied as default if no arg given

// ===================
// Describing Types Using JSDoc
// ===================

// One way to describe type information for JavaScript code is using JS doc

// Is a special type of comment can add to our code

// -------------------------------------------------------------------

// Generates the below:

// export function calculateTax(income) {
//     return income * 0.3;
//   }

// /**
//  *
//  * @param {*} income
//  * @returns
//  */

// shows have 1 x parameter (income)
// VS code doesn't know the type so has used a '*'

// need to change the '*' to 'number

// can also specify the type of the return value:

// So looks like this:

// /**
//  *
//  * @param {*} income
//  * @returns {number}
//  */

// -------------------------------------------------------------------
// -------------------------------------------------------------------

// So using 'JS Doc', can provide type information to the TypeScript compiler
// Can also explain our code:

// What the function is doing
// Each parameter

// /**
//  * Calculates income tax.
//  * @param {number} income - Net salary after expenses
//  * @returns {number}
//  */
// export function calculateTax(income) {
//     return income * 0.3;
//   }

// -------------------------------------------------------------------

// ===================
// Creating Declaration Files
// ===================

// Another way to provide type information to the TypeScript compiler

// Useful if don't want to modify your JavaScript code and add these comments

// create a 'tax.d.ts' (name of file shoudl match the corresponding JS file)
// but extension should be 'd.ts' (d is short for declaration)
// Same as a header file in 'C'

// In the declaration file, we declare all the features
// of the target module

// When using this approach
// Should describe ALL the features in the target module
// Anything you don't describe will be invisible to the comppiler

// ===================
// Using Definitely Typed Declaration Files
// ===================

// Using third party JavaScript libraries in our TypeScript projects

import * as _ from 'lodash';

// Will get an error saying:
// Could not find a declaration file for module 'lodash'.

// We see this because lodash is a pure JS library
// It doesn't have JS Doc comments
// It doesn't have declaration files
// So what can we do?

// ------------------------------------------------------------------------
// USe gitHub repo called 'definitely typed'

// In this repo, can find declaration files for all the popular JS libraries

// 'npm i --save-dev @types/lodash'
// @types is the 'definitely typed' repo
// '.../lodash' is the target package

// '--save-dev', Want to install it as a dev sdpendency
// or 'npm i -D @types/lodash' as a shortcut

// ------------------------------------------------------------------------

// Because, not going to deploy this with our application
// This is purely for compile time

// The error has now gone.

// Can now use any lodash functions and they will contain the relevant types:

// _.clone([1, 2, 3]);

// ------------------------------------------------------------------------

// Because TypeScript getting more popular every day,
// Many JavaScript libraries come with declaration files

// So we dont' need to install their declaration files separately from the 'definitely typed' repo
