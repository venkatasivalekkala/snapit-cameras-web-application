var isShoppingCartVisible=0;

$(document).ready(function()
{
console.log("loading cart");
	initFloatingCart();
});

function initFloatingCart() 
{
	
	var totalPrice=0;
	$('#data_column').hide();	
     
    
    cart = new shopping_cart("jadrn013"); 
    initShoppingCart(); 
    updateCartCount(false);
    
    
              
}


function updatePrice() {
 var cartArray = cart.getCartArray();
        if(cartArray.length > 0) {
 for(i=0; i < cartArray.length; i++) {
        	
        	var skuFromCookie = cartArray[i][0];
        	var quant = cartArray[i][1];
        	var retail = $("#rtl").val();
        	console.log(skuFromCookie+"  "+retail);
        	$('#prc'+skuFromCookie).val(quant*retail);
        
 
            }
}


}
function initShoppingCart() {
$('#cartImage').mouseleave(function(){
console.log("mouseout");

   $( document ).mousemove(function( event ) {
  var pageCoords = "( " + event.pageX + ", " + event.pageY + " )";
  var clientCoords = "( " + event.clientX + ", " + event.clientY + " )";
  // console.log(pageCoords+" "+($(window ).width() - event.clientX )+" "+(event.pageX < 80)+" "+(event.pageX >400));
   if(event.pageY < 100 && event.pageY > 55) {
  // console.log("inside");
   if(event.clientX < ($(window ).width()-30) && event.clientX > ($(window ).width()-75) ) {
   if(isShoppingCartVisible == 0) {
   if(fillShoppingCart()){
    isShoppingCartVisible = 1;
   $('#data_column').slideDown(300, function() {
   console.log("slide down");
  
   });
   }
   }
   } else {
   if(isShoppingCartVisible == 1) {
   $('#data_column').slideUp(200, function() {
   console.log("slide up");
   isShoppingCartVisible = 0;
   });
   }
   }
   
   } else if($(window ).width() - event.clientX > 450 ||  event.pageY > 625 || event.pageY < 55) {
if(isShoppingCartVisible == 1) {
  $('#data_column').slideUp(200, function(){
   console.log("slide up");
   isShoppingCartVisible = 0;
  });
  }
  }


});
});

$('#cartImage').hover(function(){
if(isShoppingCartVisible == 0) {
if(fillShoppingCart()) {
console.log("hover OUT");
isShoppingCartVisible = 1;
$('#data_column').slideDown(300, function() {
console.log("hover");
isShoppingCartVisible = 1;
});
}
}
});

}
   
function fillShoppingCart()
{


        var cartArray = cart.getCartArray();
        if(cartArray.length > 0) {
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

    $.ajax({url:url, async: true, success:handleInProducts, error:handleInProdFailure});

        return 1;
        } else {
        console.log("no sku");
        document.getElementById("checkout_data_column").innerHTML = "";
        $('#data_column').slideUp(200);
        return 0;
        } 
}
   
 function handleInProducts(response)
{

var totalPrice = 0;

	
 	var items = response.split('|||');
 	var checkoutProducts;
 	prodString = "";
 	prodString +="<div><table id=rightFloating><tr><th>Product</th><th>Quantity</th><th>Price</th></tr>";
	for(j=0; j < items.length; j++) {
	if(j == items.length-1) {
	checkoutProducts = items[j];
	continue;
	} else {
	var item = items[j].split('|');
	}
	
	prodString +="<tr><div id=prod"+j+" name="+item[6]+"><td><div id=floating_image_details><div><img src=/~jadrn013/proj1/images/u_load_images/"+item[4]+" width=80px height=80px></div><div id=floating_details>"+item[0]+"-"+item[2]+"</div></div></td><td><input type=text id=qty"+item[5]+" size=5 maxlength=3 />  <input name=ohq"+item[5]+" type=hidden value="+item[6]+" id=ohq"+item[5]+" /> <input type=hidden value="+item[3]+" id=rtl"+item[5]+" />  <a href=#  id=rem"+item[5]+" class=floating_remove>Remove</a></td><td>$<label id=prc"+item[5]+"></label></td></div></tr>";
	
	}
	prodString += "</table></div>";
	 document.getElementById("checkout_data_column").innerHTML = prodString;
	 
	 document.getElementById("checkout_button_column").innerHTML = "<form action=/jadrn013/servlet/BillingPage method=post><label class=floating_subtotal>Subtotal: </label><label class=floating_subtotal_doller>$</label><label id=subtotal_label></label><hr> <input name=total type=hidden id=total /> <input  type=hidden id=subtotal name=subtotal /> <input name=tax type=hidden id=tax /><div id= button><input type=submit value=CheckOut id=checkoutButton name=submit class=button /></div></form><div id=cart_error>&nbsp;</div>";

        
var products = cart.getCartArray();
for(var i = 0; i<products.length; i++){
var sku = products[i][0];
var quantity = products[i][1];

        	var retail = $("#rtl"+sku).val();
        	console.log("sku from coo"+sku+"  "+retail);
        	$('#prc'+sku).text(quantity*retail);




$("#qty"+sku).val(quantity);
var retail = $("#prc"+sku).text();
var price = quantity*retail;

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

function updateCartCount(isShake) {
document.getElementById("checkout_count").innerHTML = cart.size();

if(isShake) {
 $("#cartImage").animate({ 'zoom': 1.1 }, 400);
 
 $("#cartImage").animate({ 'zoom': 1 }, 400);

}

}


function updateQuantityAndPrice(id, eve) 
	{
		whichEvent = eve.which;

		
			var sku = id.substring(3,10);
			var onHandQuantity =  $("#ohq"+sku).val();
			var userQuantity = $("#qty"+sku).val();
			console.log("ohq"+onHandQuantity);
			console.log("userQ"+userQuantity);
			$("#cart_error").text("");
			$("#"+id).removeClass("cart_error");

			if(parseInt(userQuantity,10) > parseInt(onHandQuantity,10)){

			$("#cart_error").text("Quantity is not available");

			$("#"+id).addClass("cart_error");
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
		updateCartCount(false);
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

console.log("totalduysduysudsydusdysud"+totalPrice);

$("#subtotal").val(totalPrice);
$("#subtotal_label").text(totalPrice);


$("#tax").val(tax);
 total = parseInt(totalPrice,10) + parseInt(tax,10)+5;
$("#total").text(total);
$("#total").val(total);
console.log("TOTAL P"+total);

}


function getBlurFunction(sku) 
	{
		return function() 
		{
			validateOnBlur(sku);
		}
	}


function validateOnBlur(sku){
console.log("ONBLUR= "+$("#qty"+sku).val());
var cartQty = $("#qty"+sku).val().trim();
var onHandQuantity =  $("#ohq"+sku).val();
if(cartQty == "" || parseInt(cartQty,10) == 0 || parseInt(cartQty,10) > parseInt(onHandQuantity,10)){
$("#qty"+sku).val("0"); 
$("#prc"+sku).text("0");
removeItem("sku"+sku);
$("#cart_error").text("");
} 

var quant = $("#qty"+sku).val();

calculateTotalPrice();
updateCartCount(false);
}

function removeItem(id) {
console.log("remove"+id);
cart.delete(id.substring(3,10));
fillShoppingCart();
updateCartCount(false);
updateDisplay();

}

function updateDisplay() {
        var cartArray = cart.getCartArray();
        var toWrite = "<table>";
        toWrite += "<tr><th>SKU</th><th>Quantity</th></tr>";
        for(i=0; i < cartArray.length; i++) {
            toWrite += "<tr>";
            toWrite += "<td>"+cartArray[i][0]+"</td>";
            toWrite += "<td>"+cartArray[i][1]+"</td>"; 
            toWrite += "</tr>";
            }
        toWrite += "</table>"; 
    
        console.log(toWrite); 
        } 

function handleInProdFailure(response) {


}

function openBillingPage() {
window.location.href = "/jadrn013/servlet/BillingPage?cart="+cart.size();
}


