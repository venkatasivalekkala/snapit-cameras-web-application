$(document).ready(function()
{

var cart = new shopping_cart("jadrn013");
var totalPrice=0;
var tax=0;
var total=0;
fillShoppingCart();

var shipName = $("#shippingCity").val();
console.log("shipName"+shipName)
if(shipName.trim() == "null") {
handleInProdFailure("fail");

}





function getBlurFunction(sku) 
	{
		return function() 
		{
			validateOnBlur(sku);
		}
	}
console.log(totalPrice);

function validateOnBlur(sku){
console.log("id= "+sku);
if($("#qty"+sku).val().trim() == ""){
$("#qty"+sku).val("0"); 
$("#prc"+sku).text("0");
} else if($("#qty"+sku).val().trim() == "0") {

removeItem("sku"+sku);

} else {

var quant = $("#qty"+sku).val();

//console.log("quant blur"+quant)
cart.setQuantity(sku, quant);
calculateTotalPrice();
}

}

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
 total = totalPrice + tax+5;
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
			//show Error
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
    $.ajax({url:url, async: true, success:handleInProducts, error:handleInProdFailure});
    
        console.log(skus); 
}
   
 function handleInProducts(response)
{

	
 	var items = response.split('|||');
 	var checkoutProducts;
 	prodString = "";
 	prodString +="<table id=checkoutTable class=checkouttable><tr><th>Product</th><th>Quantity</th><th>Price</th></tr>";
	for(j=0; j < items.length; j++) {
	if(j == items.length-1) {
	checkoutProducts = items[j];
	} else {
	var item = items[j].split('|');

console.log(item);
	prodString +="<tr><div id=prod"+j+" name="+item[6]+"><td><div id=chkoutimage><img src=/~jadrn013/proj1/images/u_load_images/"+item[4]+" width=80px height=80px></div><div id=checkoutdetail>"+item[0]+"-"+item[2]+"<p>"+item[1]+"</p><p>$"+item[3]+"</p></div></td><td><input type=text id=qty"+item[5]+" size=5 maxlength=3 /> <a href=# class=removelink id=rem"+item[5]+">Remove</a></td> <input type=hidden id=ohq"+item[5]+" value ="+item[6]+"/><input type=hidden id=rtl"+item[5]+" value ="+item[3]+" /><td>$<span id=prc"+item[5]+">"+item[3]+"</span></td></div></tr>";
	$('form').append('<input type="hidden" id="hid'+item[5]+'"  name="'+item[5]+'" />');
	}
	} 
	prodString += "</table>";
	prodString +="<div id=placeContinueButton><input type=submit value='Place Order' id=placeOrderBotton />";
	prodString +="<input type=button value='Continue Shopping' id=continueShopping /></div>";
	 document.getElementById("checkout_data").innerHTML = prodString;
	 
	 console.log(document.getElementById("checkoutButton"));
	 
	 $("#continueShopping").click(function() {
	 window.location.href = "/jadrn013/proj3.html";
	 });
	 
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
	
	
$("#rem"+sku).on('click', function() {
removeItem(this.id);
});
	
document.getElementById("qty"+sku).addEventListener("blur", getBlurFunction(sku), false);  

}
calculateTotalPrice();
	 


}

function removeItem(id) {
console.log("remove"+id);
cart.delete(id.substring(3,10));
fillShoppingCart();

}

function handleInProdFailure(response) {
console.log("remove"+response);
 document.getElementById("checkout_data").innerHTML = "";
 window.location.href = "/jadrn013/proj3.html";

}


});



