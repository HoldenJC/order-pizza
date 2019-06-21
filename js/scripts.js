function Pizza(){
  this.size = 0,
  this.toppings = [],
  this.price = 6;
}

var userPizza = new Pizza();

Pizza.prototype.calculatePrice = function(){
  this.price = this.price + this.size + (this.toppings.length * 2);
}

$(function(){
  $("#pizzaForm").submit(function(event) {
    event.preventDefault();

    var userSize = parseInt($("#selectSize").val());

    var userToppings = [];
    $.each($("input[name='topping']:checked"), function(){
      userToppings.push($(this).val());
    });

    userPizza.size = userSize;
    userPizza.toppings = userToppings;

    userPizza.calculatePrice();

  });

});
