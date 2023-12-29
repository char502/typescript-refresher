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
//# sourceMappingURL=index.js.map