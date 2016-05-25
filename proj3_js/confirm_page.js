$(document).ready(function()
{

var cart = new shopping_cart("jadrn013");

var totalPrice=0;
var tax=0;
var total=0;
fillShoppingCart();


function calculateTotalPrice() {
totalPrice = 0;
tax=0;
total=0;
var products = cart.getCartArray();
for(var i = 0; i<products.length; i++){
var sku = products[i][0];
var quantity = products[i][1];
$("#hid"+sku).val(""+quantity);

var retail = $("#rtl"+sku).val();
var price = quantity*retail;
totalPrice+=price;



}

console.log("total"+totalPrice);
$("#subtotal").text(totalPrice);
$("#subTotal").val(totalPrice);
 tax = (totalPrice * 8) /100;
$("#tax").text(tax);
$("#Tax").val(tax);
 total = totalPrice + tax;
$("#total").text(total);
$("#Total").val(total);

}

function updateQuantityAndPrice(id, eve) 
	{
		whichEvent = eve.which;

		
			var sku = id.substring(3,10);
			var onHandQuantity =  $("#ohq"+sku).val();
			var userQuantity = $("#qty"+sku).val();
			console.log("ohq"+onHandQuantity);
			console.log("userQ"+userQuantity);
			if(parseInt(userQuantity,10) > parseInt(onHandQuantity,10)){
			console.log("quantity exceds");
			$("#prc"+sku).text("0");
			}else{
			var retail = $("#rtl"+sku).val();
			var price = userQuantity*retail;
			$("#prc"+sku).text(price);
			if(userQuantity.trim()=="") {
			cart.setQuantity(sku, "0");
			} else {
			cart.setQuantity(sku, $("#qty"+sku).val());
			}
			}
		calculateTotalPrice();	
	}
	
	
	function fillShoppingCart()
{


        var cartArray = cart.getCartArray();
        var skus = "(";
        for(i=0; i < cartArray.length; i++) {
        	if(i == 0){
        	skus += "'"+cartArray[i][0]+"'";
        	}else{
            skus += ",'"+cartArray[i][0]+"'";
            }

            }
             skus += ")";

   var url = "/jadrn013/servlet/Proj3GetProducts?inProducts="+skus;
    console.log(url);
    $.ajax({url:url, async: true, success:handleInProducts});
   
        console.log(skus); 
}
   
 function handleInProducts(response)
{
	
 	var items = response.split('|||');
 	var checkoutProducts;
 	prodString = "";
 	prodString = "<h1 class=top> Congratulations </h1><h2 class=h2_center> Your order placed successfully </h2>";
 	prodString +="<div id=checkoutItems><table id=confirm_item_table><tr><th>Product</th><th>Quantity</th><th>Price</th></tr>";
	for(j=0; j < items.length-1; j++) {
	if(j == items.length-1) {
	checkoutProducts = items[j];
	} else {
	var item = items[j].split('|');
	}

console.log(item);
	prodString +="<tr><div id=prod"+j+" name="+item[6]+"><td><div id=confirmimage><img src=/~jadrn013/proj1/images/u_load_images/"+item[4]+" width=80px height=80px></div><div id=confirmdetails>"+item[0]+"-"+item[2]+"<p>"+item[1]+"</p></div></td><td><input type=text id=qty"+item[5]+" size=5 maxlength=3 disabled /></td><input type=hidden id=ohq"+item[5]+" value ="+item[6]+"/><input type=hidden id=rtl"+item[5]+" value ="+item[3]+" /><td><span id=prc"+item[5]+">"+item[3]+"</span></td></div></tr>";
	
	$('form').append('<input type="text" id="hid'+item[5]+'"  name="'+item[5]+'" />');
		
	
	}
	prodString += "</table></div>";
	var oldData = document.getElementById("checkout_data").innerHTML;
	 document.getElementById("checkout_data").innerHTML = prodString+oldData;
	 
	 console.log(document.getElementById("checkoutButton"));
	 
	 
	 var products = cart.getCartArray();
	 
for(var i = 0; i<products.length; i++){
var sku = products[i][0];
var quantity = products[i][1];


$("#qty"+sku).val(quantity);
var retail = $("#prc"+sku).text();
var price = quantity*retail;

$("#prc"+sku).text(price)
totalPrice+=price;

$("#qty"+sku).on( "keyup", function( event ) {
		updateQuantityAndPrice(this.id, event);	
	});
	
}
calculateTotalPrice();

	 
for(var i = 0; i<products.length; i++){

deleteCookie();
}	 

}

function deleteCookie() {
 var cartArray = cart.getCartArray();
        
        for(i=0; i < cartArray.length; i++) {
        cart.delete(cartArray[i][0]);
        }

}

});



