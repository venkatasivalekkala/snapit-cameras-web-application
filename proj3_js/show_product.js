$(document).ready(function()
{
var cart = new shopping_cart("jadrn013");

$("#addToCart").click(function() {
addProductToCart();
});

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
});

function addProductToCart() {
var sku = $('#sku').val();

if(sku !="" && isQuantityAvailable(sku) > 0){
console.log("quantity"+cart.getQuantity(sku));
cart.add(sku, '1');
        updateDisplay();
        updateCartCount(true);
}else{
console.log(" quantity not available");

}
}


function setProductToCart(numProducts) {
var sku = $('#sku').val();
var on_hand = document.getElementById('on_hand').innerHTML;
console.log("onhand"+on_hand);
console.log("numprod"+numProducts);
if(parseInt(on_hand,10) > parseInt(numProducts,10)) {
console.log("numprod IN"+numProducts);
if(parseInt(numProducts,10) == 0) {
cart.delete(sku, numProducts);
} else {
cart.setQuantity(sku, numProducts);
}
updateDisplay();
updateCartCount(false);
} else{
console.log(" quantity not available");
updateDisplay();
updateCartCount(false);

}

}

  function isQuantityAvailable(sku){
  var on_hand = document.getElementById('on_hand').innerHTML;
  return on_hand -cart.getQuantity(sku); 
  console.log(cart.getQuantity(sku));
  } 