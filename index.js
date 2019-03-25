
export default class Calculator {
    static add(x, y) {
        return x + y;
    }
    
    static multiply(x, y) {
        return x * y;
    }
    
    static isPositive(x) {
        return x >= 0;
    }
    
    static isNegative(x) {
        return x <= 0;
    }

    static root(x, root) {
        return new Promise((resolve, reject) => setTimeout(() => {
            for(var result = x; root >= 2; root /= 2) {
                result = Math.sqrt(result);
            }
            resolve(result);
        }, 1500));
    }

    static cos(x) {
        //TODO not implemented
    }

    static toggleReturn() {
        Calculator.toggle ^= 1;
        return Calculator.toggle ? true : false;
    }
}