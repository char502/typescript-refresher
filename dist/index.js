"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
class ComponentBaseClass {
    insertInDom() { }
}
class ProfileComponentExtend extends ComponentBaseClass {
}
function Component(constructor) {
    console.log('Component decorator called');
    constructor.prototype.uniqueId = Date.now();
    constructor.prototype.insertInDOM = () => {
        console.log('Inserting the component in the DOM');
    };
}
function ComponentParamExample(value) {
    return (constructor) => {
        console.log('Component decorator called');
        constructor.prototype.options = value;
        constructor.prototype.uniqueId = Date.now();
        constructor.prototype.insertInDOM = () => {
            console.log('Inserting the component in the DOM');
        };
    };
}
function ComponentParamAngular(options) {
    return (constructor) => {
        console.log('Component decorator called');
        constructor.prototype.options = options;
        constructor.prototype.uniqueId = Date.now();
        constructor.prototype.insertInDOM = () => {
            console.log('Inserting the component in the DOM');
        };
    };
}
function Pipe(constructor) {
    console.log('Pipe decorator called');
    constructor.prototype.pipe = true;
}
let ProfileComponentAngular = class ProfileComponentAngular {
};
ProfileComponentAngular = __decorate([
    ComponentParamAngular({ selector: '#my-profile' }),
    Pipe
], ProfileComponentAngular);
function LogBefore(target, methodName, descriptor) {
    const original = descriptor.value;
    descriptor.value = function (message) {
        console.log('Before');
        original.call(this, message);
        console.log('After');
    };
}
class PersonMethDecs {
    say(message) {
        console.log('Person says ' + message);
    }
}
__decorate([
    LogBefore
], PersonMethDecs.prototype, "say", null);
let personDecExample = new PersonMethDecs();
personDecExample.say('Hello');
function LogFlexibleParams(target, methodName, descriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args) {
        console.log('Before');
        original.call(this, ...args);
        console.log('After');
    };
}
class PersonMethFlexParams {
    say(message, something, somethingElse) {
        console.log('Person says ' + message, something, somethingElse);
    }
}
__decorate([
    LogFlexibleParams
], PersonMethFlexParams.prototype, "say", null);
let personDecFlexParamsExample = new PersonMethFlexParams();
personDecFlexParamsExample.say('Hello', 8, true);
function Capitalize(target, methodName, descriptor) {
    const originalMethod = descriptor.get;
    descriptor.get = function () {
        const result = originalMethod.call(this);
        return typeof result === 'string' ? result.toUpperCase() : result;
    };
}
class PersonAccessDec {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
__decorate([
    Capitalize
], PersonAccessDec.prototype, "fullName", null);
let personAccExample = new PersonAccessDec('johnny', 'black');
console.log(personAccExample.fullName);
function MinLength(length) {
    return (target, propertyName) => {
        let value;
        const descriptor = {
            get() {
                return value;
            },
            set(newValue) {
                if (newValue.length < length) {
                    throw new Error(`${propertyName} should be at least ${length} characters long.`);
                }
                value = newValue;
            },
        };
        Object.defineProperty(target, propertyName, descriptor);
    };
}
class UserPropDecExample {
    constructor(password) {
        this.password = password;
    }
}
__decorate([
    MinLength(4)
], UserPropDecExample.prototype, "password", void 0);
let userPropDec = new UserPropDecExample('kjdp');
const watchedParameters = [];
function Watch(target, methodName, parameterIndex) {
    watchedParameters.push({
        methodName,
        parameterIndex,
    });
}
class Vehicle {
    move(speed) { }
}
__decorate([
    __param(0, Watch)
], Vehicle.prototype, "move", null);
console.log(watchedParameters);
//# sourceMappingURL=index.js.map