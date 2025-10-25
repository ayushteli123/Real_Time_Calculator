const expression = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");

let input = "";

// Update result in real time
function updateResult() {
  try {
    if (input.trim() === "") {
      resultDisplay.textContent = "= 0";
    } else {
      const evaluated = eval(input.replace(/×/g, "*").replace(/÷/g, "/"));
      resultDisplay.textContent = "= " + evaluated;
    }
  } catch {
    resultDisplay.textContent = "= Error";
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.textContent;

    if (value === "C") {
      input = "";
    } else if (value === "DEL") {
      input = input.slice(0, -1);
    } else if (value === "=") {
      try {
        input = eval(input).toString();
      } catch {
        input = "Error";
      }
    } else {
      input += value;
    }

    expression.value = input;
    updateResult();
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (/[0-9+\-*/.%]/.test(key)) {
    input += key;
  } else if (key === "Enter") {
    try {
      input = eval(input).toString();
    } catch {
      input = "Error";
    }
  } else if (key === "Backspace") {
    input = input.slice(0, -1);
  } else if (key.toLowerCase() === "c") {
    input = "";
  }

  expression.value = input;
  updateResult();
});
