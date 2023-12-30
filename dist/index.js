"use strict";
class KeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
let pair = new KeyValuePair(1, 'Apple');
class StringKeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
let pairWithKeyString = new StringKeyValuePair('1', 'Apple');
class KeyValuePairGeneric {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
let pairGenericStringNumber = new KeyValuePairGeneric('1', 5);
let pairStringNumberNoArgs = new KeyValuePairGeneric(7, 'aString');
function wrapInArray(value) {
    return [value];
}
let numArr = wrapInArray(1);
function wrapInArrayGeneric(value) {
    return [value];
}
let genStrArr = wrapInArrayGeneric('a');
let genNumArr = wrapInArrayGeneric(2);
class ArrayUtils {
    wrapInArrayGenMethod(value) {
        return [value];
    }
}
let utils = new ArrayUtils();
class ArrayUtilsStat {
    static wrapInArrayStaticMethod(value) {
        return [value];
    }
}
let utilsStat = ArrayUtilsStat.wrapInArrayStaticMethod(5);
function fetch(url) {
    console.log(url);
    return { data: null, error: null };
}
let result = fetch('url');
function echo(value) {
    return value;
}
echo(false);
function echoLimitedType(value) {
    return value;
}
echoLimitedType(8);
function echoObjLimitedType(value) {
    return value;
}
echoObjLimitedType({ name: 'Bob' });
function echoInterfaceLimitedType(value) {
    return value;
}
echoInterfaceLimitedType({ name: 'Jane' });
class PersonClassExample {
    constructor(name) {
        this.name = name;
    }
}
class CustomerClassExample extends PersonClassExample {
}
function echoClassLimitedType(value) {
    return value;
}
echo(new PersonClassExample('h'));
echo(new CustomerClassExample('j'));
class Store {
    constructor() {
        this._objects = [];
    }
    add(obj) {
        this._objects.push(obj);
    }
}
class CompressibleStore extends Store {
    compress() {
    }
}
let store = new CompressibleStore();
store.compress;
class SearchableStoreWConstraint extends Store {
    find(name) {
        return this._objects.find((obj) => obj.name === name);
    }
}
class ProductStore extends Store {
    filterByCategory(category) {
        console.log(category);
        return [];
    }
}
class StoreWKOf {
    constructor() {
        this._objectsWKOf = [];
    }
    addWKOf(obj) {
        this._objectsWKOf.push(obj);
    }
}
let storeWKOf = new StoreWKOf();
storeWKOf.addWKOf({ name: 'a', price: 1 });
console.log(storeWKOf);
//# sourceMappingURL=index.js.map