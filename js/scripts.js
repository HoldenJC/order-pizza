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

  if (tops.length > 0) {
    $("#currentOrder").append("<div style=\"display: none;\" class=\"orderItem\">" + size + " pizza with " + tops + ": $" + currentPizza.price.toFixed(2) + "</div>");
  } else {
    $("#currentOrder").append("<div style=\"display: none;\" class=\"orderItem\">" + size + " pizza with no toppings: $" + currentPizza.price.toFixed(2) + "</div>");
  }
  $(".orderItem").slideDown();
  $("#totalCost").html("Total: $" + order.total.toFixed(2));
}

function completeOrder() {
  $("#pizzaForm").slideUp();
  $("#currentOrderLabel").html("<span class=\"font-weight-bold\">Final Order:</span>");
  $("#completeOrderButton").fadeOut(800);
  $("#pickupDelivery").delay(800).fadeIn(800);
}

function pickupOrder() {
  $("#pickupChosen").html("Thank you for your order!<br><span class=\"font-weight-bold\">Your order number is: " + Math.floor(Math.random() * 101) + "</span><br>Please reference this order number when you arrive at the store. Our address is:<br><br>123 Pizza Lane<br>Pizzatown Creek, Pizzalvania, 12345<br>United Plates of Pizza");

  $("#pickupDelivery").fadeOut(800);
  $("#pickupChosen").delay(800).fadeIn(800);
}

function deliveryOrder() {
  $("#pickupDelivery").slideUp(800);
  $("#deliveryChosen").delay(800).slideDown(800);
  $("#addressForm").click(function() {
    $("#deliveryForm").slideUp(800);

    $("#deliveryDetails").html("Thank you for your order!<br><span class=\"font-weight-bold\">Your order number is: " + Math.floor(Math.random() * 101) + "</span><br>Your order will be delivered to the following address:<br><br><span class=\"font-weight-bold\">" + $("#userName").val() + "<br>" + $("#userAddress").val() + " " + $("#userAddress2").val() + "<br>" + $("#userCity").val() + ", " + $("#userState").val() + ", " + $("#userZip").val() + "</span>");

    $("#deliveryDetails").delay(800).slideDown(800);
  });
}

function buttonListeners() {
  $("#completeOrderButton").click(function() {
    completeOrder();
  });
  $("#pickup").click(function() {
    pickupOrder();
  });
  $("#delivery").click(function() {
    deliveryOrder();
  });
}

$(function() {
  buttonListeners();
  $("#pizzaForm").submit(function(event) {
    event.preventDefault();

    if (!isNaN(parseInt($("#selectSize").val()))) {
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
      $("#completeOrderButton").delay(2400).slideDown(800);
    } else {
      $("#alertField").append("<div id=\"userAlert\" class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>");
      $("#userAlert").append("Please select a pizza size!");
    }
  });
});
