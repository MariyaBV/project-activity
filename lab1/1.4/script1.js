function Calculator() {
    this.read = function() {
        this.a = +prompt('Введите значение: a =', 0);
        this.b = +prompt('Введите значение: b =', 0);
    };
  
    this.sum = function() { //подсчет суммы
        return this.a + this.b;
    };
  
    this.mul = function() { //подсче произведения
        return this.a * this.b;
    };
}
  
var calculator = new Calculator();
calculator.read();

alert( "Сумма = " + calculator.sum()); //модальное окно с результатом суммы
alert( "Произведение = " + calculator.mul()); //модальное окно с результатом произведения