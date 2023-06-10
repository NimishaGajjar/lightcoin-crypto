class Account {

  constructor(username) {
    this.username = username;
    this.transaction = [];
  }
  get balance() {
    return this.transaction.reduce((sum, transaction) => sum + transaction.value, 0);
  }
  addTransaction(transaction) {
    this.transaction.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  withdrawalAllowed() {
    return this.account.balance + this.value >= 0;
  }

  commit() {
    if (this.withdrawalAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    } else {
      console.log('Sorry, you don\'t have enough money in your account to withdraw that amount');
    }
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

}


const myAccount = new Account('snow-patrol');

t1 = new Deposit(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

console.log('Balance:', myAccount.balance);

t3 = new Withdrawal(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Balance:', myAccount.balance);
