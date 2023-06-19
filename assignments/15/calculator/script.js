// Calculator Variables
var expression = ""; // Stores the current expression

// Calculator Functions
function addToExpression(value) {
    expression += value;
    updateDisplay(expression);
}

function clearExpression() {
    expression = "";
    updateDisplay(expression);
}

function evaluateExpression() {
    try {
        var result = eval(expression);
        expression = result.toString();
        updateDisplay(expression);
    } catch (error) {
        expression = "Error";
        updateDisplay(expression);
    }
}

function updateDisplay(value) {
    document.getElementById("display").value = value;
}

// Event Listeners for Calculator Buttons
var buttons = document.getElementsByClassName("calculator-button");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        var value = this.getAttribute("data-value");
        addToExpression(value);
    });
}

document.getElementById("clear-button").addEventListener("click", function () {
    clearExpression();
});

document.getElementById("equals-button").addEventListener("click", function () {
    evaluateExpression();
});
