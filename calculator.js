class BasicCalculator {

    add(num1, num2) {
        this.sanitise(num1, num2)

        return num1 + num2;
    }

    subtract(num1, num2) {
        this.sanitise(num1, num2)
        return num1 - num2;
    }


    multiplication(num1, num2) {
        this.sanitise(num1, num2)
        return num1 * num2;
    }

    division(num1, num2) {
        this.sanitise(num1, num2);
        if(num2===0){
            throw "Divide by zero  exception"
        }
        return num1 / num2;
    }

    sanitise(num1, num2) {
        if (isNaN(num1) || isNaN(num2)) {
           throw "Not a valid number"
        }
    }

}

class BodmasCalulator extends BasicCalculator {
    constructor(expression){
        super();
        this.expression = expression;
    }

    calculate() {
       
        let stack = [];
        let num = '';
        let sign = null

        for (let i = 0; i <= this.expression.length; i++) {
            const currNum = this.expression[i];

            if(currNum===" ") continue;
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
                        stack.push(this.multiplication(stack.pop() , num))
                        break;
                    case '/':
                        stack.push(this.division(stack.pop() , num))
                        break;
                }
                sign = currNum;
                num = '';
            }
        }
        return stack.reduce((a, b) => {
            return this.add(a , b);
        }, 0)
   
    }

}

let bdmcal = new BodmasCalulator('3/2');
try{
    console.log( bdmcal.calculate())
}catch(msg){
    console.log(1,msg);
}
