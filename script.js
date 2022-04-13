// Selectors
const calcGrid = document.querySelector(".calc__grid");
const calcSelection = document.querySelectorAll(".calc__selection");
const calcBtns = document.querySelectorAll(".calc__btn");
const calcReset = document.querySelector(".calc__reset");
const calcInputBill = document.querySelector(".calc__input--bill");
const calcInputPeople = document.querySelector(".calc__input--people");
const calcInputFields = document.querySelectorAll(".calc__input--field");
const calcGridInput = document.querySelector(".calc__grid--input");
const calcZero = document.querySelector(".calc__inputs--zero");
const totalTipPer = document.querySelector(".calc__total--tip");
const totalPer = document.querySelector(".calc__total--per");
let tip, resetActive;

// Reset Button Skin
const resetBtnActive = function () {
  calcReset.style = "";
  calcReset.classList.add("calc__reset--active");
  calcReset.classList.add("calc__reset--hover");
  resetActive = true;
};

// Reset Button Functionality
calcInputFields.forEach((field) =>
  field.addEventListener("keydown", function () {
    resetBtnActive();
    displayAmounts();
  })
);
calcReset.addEventListener("click", function () {
  calcReset.style.backgroundColor = "#0d686d";
  calcReset.style.color = "#0d5357";
  calcReset.classList.remove("calc__reset--active");
  calcReset.classList.remove("calc__reset--hover");
  calcBtns.forEach((btn) => {
    btn.classList.remove("selected");
    btn.style = "";
  });
  calcInputBill.value = "";
  calcInputPeople.value = "";
  totalTipPer.textContent = "$0.00";
  totalPer.textContent = "$0.00";
  calcGridInput.value = "";
  resetActive = false;
});

// Button Skin
calcGrid.addEventListener("click", function (e) {
  const btnSelected = function () {
    e.target.style.backgroundColor = "var(--strong-cyan)";
    e.target.style.color = "var(--very-dark-cyan)";
  };
  calcBtns.forEach((btn) => {
    btn.style = "";
    if (e.target === btn) {
      btnSelected(e);
    }
  });

  // Adding a class to get static value from element (tip)
  calcBtns.forEach((btn) => {
    let selected;
    btn.classList.remove("selected");
    if (e.target === btn) {
      btn.classList.add("selected");
      selected = document.querySelector(".selected");

      // Calculate tip
      tip = parseInt(selected.textContent) * (1 / 100);
      resetBtnActive();
    }
  });
  displayAmounts();
});

// Display functionality
calcInputPeople.addEventListener("keyup", function (e) {
  if (calcInputPeople.value === "0") {
    calcZero.classList.remove("hidden");
    setTimeout(zeroTimer, 3000);
  } else if (tip && calcInputPeople.value !== "0") displayAmounts();
  else {
    tip = parseInt(+calcGridInput.value) * (1 / 100);
    displayAmounts();
  }
  resetBtnActive();
});

// Function declarations
function displayAmounts() {
  const bill = +calcInputBill.value;
  const people = +calcInputPeople.value;
  const total = bill * tip + bill;
  const tipPerPerson = (bill * tip) / people;
  const totalPerPerson = total / people;
  if (bill && people && tip) {
    totalTipPer.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalPer.textContent = `$${totalPerPerson.toFixed(2)}`;
  }
}

function zeroTimer() {
  calcZero.classList.add("hidden");
}
