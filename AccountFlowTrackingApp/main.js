// Data
const account1 = {
  owner: "Roshan Gurung",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2022-04-23T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-En",
};

const account2 = {
  owner: "Prajwal Giri",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2022-04-23T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account3 = {
  owner: "Niroj Dahal",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account4 = {
  owner: "Kaman Khadka",
  movements: [430, 1000, 700, 50, 90, -100, 10, -200],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const accounts = [account1, account2, account3, account4];
//to request loan user should have deposited at least this much percentage of requested amount once
const depositPercent = 10;

//how to know username
//user name is the short form of the full name which is created by username() function for eg: user name of Roshan Gurung is rs.
/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");
const userNameLabel = document.getElementById("username");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////

let currentUserAccount, timer;

function FormatDate(account) {
  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return new Intl.DateTimeFormat(account.locale, options).format(now);
}

function FormatCurrency(value, currency, locale) {
  const formattedCurrency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
  return formattedCurrency;
}
function calculateDateDifference(date) {
  const difference = new Date() - date;
  const differenceInDays = Math.round(difference / (1000 * 60 * 60 * 24));
  let displayDate;
  if (differenceInDays == 0) {
    displayDate = "Today";
  } else if (differenceInDays == 1) {
    displayDate = "Yesterday";
  } else if (differenceInDays <= 7) {
    displayDate = `${differenceInDays} days ago`;
  } else {
    displayDate = FormatDate(date);
  }
  return displayDate;
}

const displayFundMovement = function (account, sorted = false) {
  containerMovements.innerHTML = "";
  const sortedMovements = sorted
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  sortedMovements.forEach(function (mov, index) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const displayDate = calculateDateDifference(
      new Date(account.movementsDates[index])
    );
    const newMovementRow = `<div class="movements__row">
    <div class="movements__type movements__type--${type}"> ${index} ${type} ${Math.abs(
      mov
    )} </div>
    <div class="movements__date">${displayDate} </div>
    <div class="movements__value"> ${FormatCurrency(
      mov,
      currentUserAccount.currency,
      currentUserAccount.locale
    )}</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", newMovementRow);
  });
};

const displayTotalBalance = function (movements) {
  const bal = movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${FormatCurrency(
    bal,
    currentUserAccount.currency,
    currentUserAccount.locale
  )}`;
};
const displayInOutAndInterest = function (movements) {
  const depositAmount = movements
    .filter((mov) => mov > 0)
    .reduce((acc, data) => acc + data, 0);
  console.log(depositAmount);
  labelSumIn.textContent = `${FormatCurrency(
    depositAmount,
    currentUserAccount.currency,
    currentUserAccount.locale
  )}`;

  const withdraws = movements
    .filter((mov) => mov < 0)
    .reduce((acc, data) => acc + Math.abs(data), 0);

  labelSumOut.textContent = `${FormatCurrency(
    withdraws,
    currentUserAccount.currency,
    currentUserAccount.locale
  )}`;

  const totalInterest = movements
    .filter((mov) => mov > 0)
    .map((interest) => (interest * currentUserAccount.interestRate) / 100)
    .filter((fil) => fil >= 1)
    .reduce((acc, item) => acc + item, 0);
  labelSumInterest.textContent = `${FormatCurrency(
    totalInterest,
    currentUserAccount.currency,
    currentUserAccount.locale
  )}`;
};

const userNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
//sets username to all accounts
userNames(accounts);

//login functionality implementation

const setLogInTimeOut = function () {
  let maxTime = 30;
  const tick = function () {
    const min = String(Math.round(maxTime / 60)).padStart(2, 0);
    const sec = String(Math.round(maxTime % 60)).padStart(2, 0);
    labelTimer.textContent = `${min} : ${sec}`;
    if (maxTime == 0) {
      containerApp.style.opacity = 0;
      clearInterval(timer);
    }
    maxTime--;
  };
  const timer = setInterval(() => {
    tick();
  }, 1000);

  return timer;
};

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  currentUserAccount = accounts.find((acc) => {
    return (
      acc.username === inputLoginUsername.value &&
      acc.pin == inputLoginPin.value
    );
  });
  if (currentUserAccount == null) {
    alert("incorrect username or pin! ❌");
    return false;
  }
  containerApp.style.opacity = 1;
  inputLoginUsername.value = "";
  inputLoginPin.value = "";
  inputLoginPin.blur();
  userNameLabel.textContent = `(${currentUserAccount.owner})`;
  if (timer) clearInterval(timer);
  timer = setLogInTimeOut();
  UpdateUI(currentUserAccount);
  labelDate.textContent = FormatDate(currentUserAccount);
});
function UpdateUI(currentAccount) {
  displayFundMovement(currentAccount);
  displayInOutAndInterest(currentAccount.movements);
  displayTotalBalance(currentAccount.movements);
}

//transfer amount functionality
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const transferredToAccount = accounts.find(
    (acc) => acc.username == inputTransferTo.value
  );
  if (transferredToAccount == null) {
    alert("account not found 💥! please enter correct username");
    return false;
  }

  if (transferredToAccount == currentUserAccount) {
    alert("cannot transfer to own account");
    return false;
  }
  const transferredAmount = inputTransferAmount.value;

  const currentAccountTotal = currentUserAccount.movements.reduce(
    (acc, mov) => acc + mov,
    0
  );

  if (transferredAmount > 0 && transferredAmount > currentAccountTotal) {
    alert("transferred amount is more than available balance");
    return false;
  }

  transferredToAccount.movements.push(Math.abs(transferredAmount));
  transferredToAccount.movementsDates.push(new Date().toISOString());
  currentUserAccount.movementsDates.push(new Date().toISOString());
  currentUserAccount.movements.push(-transferredAmount);
  inputTransferAmount.value = "";
  inputTransferTo.value = "";
  inputTransferAmount.blur();
  inputTransferTo.blur();

  UpdateUI(currentUserAccount);

  clearInterval(timer);
  timer = setLogInTimeOut();
});

//close account functionality
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value != currentUserAccount.username &&
    inputClosePin.value != currentUserAccount.pin
  ) {
    alert("user credentail do not match");
    return false;
  }

  const currentUserIndex = accounts.findIndex(
    (acc) =>
      acc.username == inputCloseUsername.value && acc.pin == inputClosePin.value
  );

  if (currentUserIndex < 0) {
    alert("credential do not match");
    return false;
  }

  accounts.splice(currentUserIndex, 1);
  containerApp.style.opacity = 0;
});

//request loan funcationality
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const requestedLoan = inputLoanAmount.value;

  const IsRequestValid = currentUserAccount.movements
    .filter((data) => data > 0)
    .some((mov) => mov >= (requestedLoan * depositPercent) / 100);
  if (IsRequestValid) {
    currentUserAccount.movements.push(Number(requestedLoan));
    currentUserAccount.movementsDates.push(new Date().toISOString());
    UpdateUI(currentUserAccount);

    inputLoanAmount.value = "";
    inputLoanAmount.blur();
  } else {
    alert("request is invalid");
  }

  clearInterval(timer);
  timer = setLogInTimeOut();
});
let isSorted = false;
btnSort.addEventListener("click", function (event) {
  event.preventDefault();
  displayFundMovement(currentUserAccount, !isSorted);
  isSorted = !isSorted;
});
