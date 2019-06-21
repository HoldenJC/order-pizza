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

function sizeDisplay(pizza){
  if(pizza.size === 0){
    return "Small";
  } else if (pizza.size === 2){
    return "Medium";
  } else if (pizza.size === 4){
    return "Large";
  } else {
    return "Extra Large";
  }
}

function orderUpdate(){
  $("#currentOrder").empty();
  $.each($(order.pizzas), function(){
    var size = sizeDisplay(this);
    var tops = this.toppings.join(", ");
    $("#currentOrder").append(size + " pizza with " + tops + ": $" + this.price.toFixed(2) + "<br>");
  })
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
    orderUpdate();
    $("#currentOrderLabel").show();

  });
});
