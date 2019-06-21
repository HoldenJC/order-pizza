function Order(){
  this.pizzas = []
}

var order = new Order();

Order.prototype.addPizza = function(pizza){
  this.pizzas.push(pizza);
}

function Pizza(){
  this.size = 0,
  this.toppings = [],
  this.price = 6;
}

Pizza.prototype.calculatePrice = function(){
  this.price = this.price + this.size + (this.toppings.length * 2);
}

function resetPizzaForm(){
  $.each($("input[type='checkbox']:checked"), function(){
    $(this).prop('checked', false);
  });
  $("#selectSize").get(0).selectedIndex = 0;
}

$(function(){
  $("#pizzaForm").submit(function(event) {
    event.preventDefault();

    var userPizza = new Pizza();

    userPizza.size = parseInt($("#selectSize").val());
    $.each($("input[name='topping']:checked"), function(){
      userPizza.toppings.push($(this).val());
    });

    userPizza.calculatePrice();
    order.addPizza(userPizza);
    resetPizzaForm();

  });
});
