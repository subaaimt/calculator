class Calculator {


    constructor(screen) {
        this.screen = screen;
    }

    clear() {
        this.currentCalString = '';
    }

    delete() {
        this.currentCalString = this.currentCalString.toString().slice(0, -1)
    }


    calculate() {

    }

    getDisplay() {

    }

    updateDisplay(innerText) {
        this.screen.innerText += innerText;

    }
}


(function () {
    let screen = document.querySelector(".cal-screen");

    let calculator = new Calculator(screen);

    document.querySelectorAll(".operation").forEach(btn => {
        btn.addEventListener('click', () => {
            alert(btn.innerText)
        })
    });

    document.querySelectorAll(".operand").forEach(btn => {
        btn.addEventListener('click', () => {
            calculator.updateDisplay(btn.innerText)
        })
    });


    document.querySelectorAll(".number").forEach(btn => {
        btn.addEventListener('click', () => {
            calculator.updateDisplay(btn.innerText)
        })
    });

    document.querySelectorAll(".dot").forEach(btn => {
        btn.addEventListener('click', () => {
            calculator.updateDisplay(btn.innerText)
        })
    });

    document.querySelectorAll(".calculate").forEach(btn => {
        btn.addEventListener('click', () => {
            alert(btn.innerText)
        })
    });

}())
