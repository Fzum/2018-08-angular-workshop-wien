console.log('Hallo Wien!');
var Customer = /** @class */ (function () {
    function Customer(id) {
        this.id = id;
    }
    Customer.prototype.fooBar = function () {
        var _this = this;
        var self = this;
        function callback() {
            return self.id * 10;
        }
        console.log(callback());
        var callback2 = function () { return _this.id * 10; };
        console.log(callback2());
        var city = '"Vienna"';
        var text = 'Hello\n' + city + '\n!';
        console.log(text);
        var text2 = "Hello " + city + "\nwe are doing Angular!";
        console.log(text2);
    };
    return Customer;
}());
var myCustomer = new Customer(3);
myCustomer.fooBar();
console.log(myCustomer);
//# sourceMappingURL=app.js.map