function Order() {
  this.pizzas = [],
    this.total = 0
}

var order = new Order();

Order.prototype.addPizza = function(pizza) {
  this.pizzas.push(pizza);
}

function Pizza() {
    this.size = 0,
    this.toppings = [],
    this.price = 6
}

Pizza.prototype.calculatePrice = function() {
  this.price = this.price + this.size + (this.toppings.length * 2);
}

Pizza.prototype.calculateTotal = function() {
  order.total += this.price;
}

function resetPizzaForm() {
  $.each($("input[type='checkbox']:checked"), function() {
    $(this).prop('checked', false);
  });
  $("#selectSize").get(0).selectedIndex = 0;
}

function sizeDisplay(pizza) {
  if (pizza.size === 0) {
    return "Small";
  } else if (pizza.size === 2) {
    return "Medium";
  } else if (pizza.size === 4) {
    return "Large";
  } else {
    return "Extra Large";
  }
}

function orderUpdate(currentPizza) {
  var size = sizeDisplay(currentPizza);
  var tops = currentPizza.toppings.join(", ");
  currentPizza.calculateTotal();

  $("#currentOrder").append("<div style=\"display: none;\" class=\"orderItem\">" + size + " pizza with " + tops + ": $" + currentPizza.price.toFixed(2) + "</div>");
  $(".orderItem").slideDown();
  $("#totalCost").html("Total: $" + order.total.toFixed(2));
  // $(".orderItem").slideDown();
}

$(function() {
  $("#pizzaForm").submit(function(event) {
    event.preventDefault();

    var userPizza = new Pizza();

    userPizza.size = parseInt($("#selectSize").val());
    $.each($("input[name='topping']:checked"), function() {
      userPizza.toppings.push($(this).val());
    });

    userPizza.calculatePrice();
    order.addPizza(userPizza);
    resetPizzaForm();
    orderUpdate(userPizza);
    $("#currentOrderLabel").slideDown(800);
    $("#currentOrder").delay(800).slideDown(800);
    $("#totalCost").delay(1600).slideDown(800);
  });
});
