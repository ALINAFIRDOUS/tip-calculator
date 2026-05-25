const billAmount = document.getElementById("bill");
const customTipPercentage = document.getElementById("custom");
const numberofpeople = document.getElementById("people");
const billTipAmount = document.getElementById("tipAmount");
const billTotalPerPerson = document.getElementById("total");
const totalTipDisplay = document.getElementById("totalTip");
const grandTotalDisplay = document.getElementById("grandTotal");
const resetButton = document.getElementById("resetBtn");
const buttons = document.querySelectorAll(".tip-btns button");

function validateInputs(bill, tip, people) {
  let isValid = true;

  // Bill validation
  if (isNaN(bill) || bill <= 0) {
    document.getElementById("billError").textContent =
      "Bill must be greater than 0";
    isValid = false;
  } else {
    document.getElementById("billError").textContent = "";
  }

  // Tip validation (only if user entered something)
  if (!isNaN(tip)) {
    if (tip < 0 || tip > 100) {
      document.getElementById("tipError").textContent = "Tip must be 0–100";
      isValid = false;
    } else {
      document.getElementById("tipError").textContent = "";
    }
  } else {
    document.getElementById("tipError").textContent = "";
  }

  // People validation
  if (numberofpeople.value === "" || isNaN(people)) {
    document.getElementById("peopleError").textContent = "";
  } else if (people < 1 || !Number.isInteger(people)) {
    document.getElementById("peopleError").textContent = "Min 1 person";
    isValid = false;
  } else {
    document.getElementById("peopleError").textContent = "";
  }
  return isValid;
}



//automatic tip calculation when clicked on tip % button
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    buttons.forEach((btn) => btn.classList.remove("selected"));
    customTipPercentage.classList.remove("custom-active");
    e.target.classList.add("selected");
    customTipPercentage.value = "";

    let tipvalue = e.target.innerText.replace("%", "");

    if (billAmount.value === "") return;
    const people =
      numberofpeople.value === "" ? 1 : parseInt(numberofpeople.value);

    calculateTip(parseFloat(billAmount.value), parseInt(tipvalue), people);
  });
});

billAmount.addEventListener("input", () => {
  const bill = parseFloat(billAmount.value);

   if (billAmount.value !== "" && numberofpeople.value === "") {
    numberofpeople.value = 1;
  }

  const people = parseInt(numberofpeople.value);
  

  let tip = parseFloat(customTipPercentage.value);

  const selectedBtn = document.querySelector(".tip-btns .selected");
  if (isNaN(tip) && selectedBtn){
    tip = parseInt(selectedBtn.innerText.replace("%", ""));
  }
  calculateTip(bill, tip, people);
});

numberofpeople.addEventListener("focus", () => {
  if (numberofpeople.value == 1) {
    numberofpeople.value = "";
  }
});
numberofpeople.addEventListener("blur", () => {
  if (numberofpeople.value === "" && billAmount.value !== "") {
    numberofpeople.value = 1;
 const bill = parseFloat(billAmount.value);

    let tip = parseFloat(customTipPercentage.value);

    const selectedBtn = document.querySelector(".tip-btns .selected");

    if (isNaN(tip) && selectedBtn) {
      tip = parseInt(selectedBtn.innerText.replace("%", ""));
    }

    calculateTip(bill, tip, 1); }
});
//
numberofpeople.addEventListener("input", () => {
  const bill = parseFloat(billAmount.value);
  const people = parseInt(numberofpeople.value);

  let tip = parseFloat(customTipPercentage.value);

  const selectedBtn = document.querySelector(".tip-btns .selected");
  if (isNaN(tip) && selectedBtn) {
    tip = parseInt(selectedBtn.innerText.replace("%", ""));
  }

  calculateTip(bill, tip, people);
});

//automatic tip calculation when user gives custom tip %
customTipPercentage.addEventListener("input", (e) => {
  buttons.forEach((btn) => btn.classList.remove("selected"));
  customTipPercentage.classList.add("custom-active");

  if (billAmount.value === "") {
    resetEverything();
    return;
  }
  const people =
    numberofpeople.value === "" ? 1 : parseInt(numberofpeople.value);

  calculateTip(
    parseFloat(billAmount.value),
    parseFloat(e.target.value),
    people,
  );
});

//to caluclate tip
function calculateTip(billAmount, tipPercentage, numberofpeople) {
  
 if (isNaN(tipPercentage)) {
    tipPercentage = 0;
  }

  const isValid = validateInputs(
    billAmount,
    tipPercentage,
    numberofpeople
  );
  if (!isValid) {
    billTipAmount.innerHTML = "₹0.00";
    billTotalPerPerson.innerHTML = "₹0.00";
    totalTipDisplay.innerHTML = "₹0.00";
    grandTotalDisplay.innerHTML = "₹0.00";
    return;
  }

  //total tip
  const totalTip = billAmount * (tipPercentage / 100);
  //tip per person
  const tipPerPerson = totalTip / numberofpeople;
  //total per person
  const totalPerPerson = (billAmount + totalTip) / numberofpeople;

  // 4. Round to nearest
  const tipDisplay = tipPerPerson.toFixed(2);
  const totalDisplay = totalPerPerson.toFixed(2);
  const totalTipFormatted = totalTip.toFixed(2);
  const grandTotalFormatted = (billAmount + totalTip).toFixed(2);

  // 5. Update UI
  billTipAmount.innerHTML = `₹${tipDisplay}`;
  billTotalPerPerson.innerHTML = `₹${totalDisplay}`;
  totalTipDisplay.innerHTML = `₹${totalTipFormatted}`;
  grandTotalDisplay.innerHTML = `₹${grandTotalFormatted}`;
}

// reset
resetButton.addEventListener("click", resetEverything);
function resetEverything() {
  buttons.forEach((btn) => btn.classList.remove("selected"));

  billTipAmount.innerHTML = "₹0.00";
  billTotalPerPerson.innerHTML = "₹0.00";
  totalTipDisplay.innerHTML = "₹0.00";
  grandTotalDisplay.innerHTML = "₹0.00";

  billAmount.value = "";
  numberofpeople.value = "";
  customTipPercentage.value = "";


  document.getElementById("billError").textContent = "";
  document.getElementById("tipError").textContent = "";
  document.getElementById("peopleError").textContent = "";

  customTipPercentage.classList.remove("custom-active");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.activeElement.blur();
  }
});
