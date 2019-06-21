function Pizza(){
  this.size = "",
  this.toppings = [],
  this.price = 0;
}

var userPizza = new Pizza();

$(function(){
  $("#pizzaForm").submit(function(event) {
    event.preventDefault();

    var userSize = $("#selectSize").val();

    var userToppings = [];
    $.each($("input[name='topping']:checked"), function(){
      userToppings.push($(this).val());
    });

    userPizza.size = userSize;
    userPizza.toppings = userToppings;

  });

});
