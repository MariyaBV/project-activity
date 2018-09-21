function Calculator() {
    this.a = 0;
    this.b = 0;


    this.read = function() {
        this.a = +prompt('Введите значение: a =', 0); // this.a = parseInt(promt('Введите значение: a =', 0), 10) || 0;
        this.b = +prompt('Введите значение: b =', 0); // this.b = number(promt('Введите значение: a =', 0), 10) || 0;
    };
  
    this.sum = function() { //подсчет суммы
        return this.a + this.b;
    };
  
    this.mul = function() { //подсчет произведения
        return this.a * this.b;
    };
}
  
var calculator = new Calculator();
calculator.read();

console.log("Сумма = " + calculator.sum());
console.log("Произведение = " + calculator.mul());

//alert("Сумма = " + calculator.sum()); //модальное окно с результатом суммы
//alert("Произведение = " + calculator.mul()); //модальное окно с результатом произведения