class Calculator {
    constructor(screen) {
        this.screen = screen;
        this.displayNumArray = [];
        this.operators = new Set(['/', '*', '+', '-']);
        this.prevDigit = '';
        this.resultDisplayed = false;
    }

    clear() {
        this.screen.innerText = '';
        this.displayNumArray = [];
        this.prevDigit = '';
        this.resultDisplayed = false;
    }

    delete() {
        this.screen.innerText = this.screen.innerText.slice(0, -1)
        this.prevDigit = this.prevDigit.slice(0, -1)
    }


    calculate() {

        let stack = [];
        let num = '';
        let sign = null

        for (let i = 0; i <= this.displayNumArray.length; i++) {
            const currNum = this.displayNumArray[i];

            if (!isNaN(currNum)) num += currNum;

            if (isNaN(currNum)) {
                num = Number(num)
                switch (sign) {
                    case '+':
                    case null:
                        stack.push(num)
                        break;
                    case '-':
                        stack.push(-num)
                        break;
                    case '*':
                        stack.push(stack.pop() * num)
                        break;
                    case '/':
                        stack.push(stack.pop() / num)
                        break;
                }
                sign = currNum;
                num = '';
            }
        }

        return stack.reduce((a, b) => {
            return a + b
        }, 0)
    }

    displayResult() {
        this.displayNumArray.push(this.prevDigit);
        this.screen.innerText = this.calculate();
        this.resultDisplayed = true;
        this.displayNumArray = [];
    }

    updateDisplay(innerText) {
        if (innerText === '.' && this.prevDigit.includes('.')) return
        
        if (this.resultDisplayed) {
            this.clear();
        }
        this.screen.innerText += innerText;
        if (this.operators.has(innerText)) {
            this.displayNumArray.push(this.prevDigit);
            this.displayNumArray.push(innerText);
            this.prevDigit = '';
        } else {
            this.prevDigit += innerText;
        }
    }
}


(function () {
    let screen = document.querySelector(".cal-screen");

    let calculator = new Calculator(screen);

    document.querySelectorAll(".operation").forEach(btn => {
        btn.addEventListener('click', () => {
            if(btn.innerText==='CE'){
                calculator.clear();
            }else if(btn.innerText==='DEL'){
                calculator.delete();
            }
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

    let dotBtn = document.querySelector(".dot");
    dotBtn.addEventListener('click', () => {
        calculator.updateDisplay(dotBtn.innerText)
    });


    let calBtn = document.querySelector(".calculate");
    calBtn.addEventListener('click', () => {
        calculator.displayResult();
    });


}())
