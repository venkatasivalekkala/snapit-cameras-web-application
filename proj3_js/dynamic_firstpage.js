var vendorString = "";
var catString = "";
var prodString = "";
var sortValue = "relevance";
var vendorArray = new Array();
var categoryArray = new Array();
var productArray = new Array();
var cart;

$(document).ready(function()
{
	init();
});


function init() 
{

    fetch_vendor_string_data();
    fetch_category_string_data();  
    fetch_products();  
    set_on_change_listner();
    cart = new shopping_cart("jadrn013"); 
    setSearchBar();
    
              
}

function getSearchValuesAndSetFilters(){
console.log("SEARCH"+cart.getSearchValues());
var search = cart.getSearchValues();
if(search) {
var arr = search.split("|");
if(arr[2].trim()!="undefined" && arr[2].trim() != "-1") {
var search = arr[2].trim();
console.log("search called");
$("#search").val(search);

if(arr[0].trim()=="-1" && arr[1].trim()=="-1" ) {
filterProduct();
}
}
for(i=0; i<arr.length;i++) {
if(i==0 && arr[i].trim() != "-1" && arr[i].trim() != "undefined") {
var ven = arr[i];
ven = ven.substring(1, ven.length-1);
var venArr = ven.split(",");
for(j=0; j<venArr.length; j++) {
var venId = ""+venArr[j];
console.log("CHECKED"+venId);
$("#"+venId).prop('checked', true);
selectVendor(venId);
}
console.log("first vendor"+venArr[0]);
}

if(i==1 && arr[i].trim() != "-1"  && arr[i].trim() != "undefined") {

var cat = arr[i];
cat = cat.substring(1, cat.length-1);
var catArr = cat.split(",");
console.log("first Cat"+catArr[0]);
for(j=0; j<catArr.length; j++) {
var catId = ""+catArr[j];
console.log("CATEGORY CHECKED"+catId);
$("#cat"+catId).prop('checked', true);
selectCategory("cat"+catId);
}
} 



}

}
}

function setSearchBar(){
if($("#search").val().trim()!="") {

filterProduct();
}
$("#search").on( "keyup", function( event ) {

		filterProduct();
	});
}

function searchProduct(id, event) {

 $.ajax({url:"/jadrn013/servlet/Proj3GetProducts?search="+$("#search").val().trim(), async: true, success:handleFilteredProduct});
}
    
function fetch_vendor_string_data() 
{
	$.ajax({url:"/jadrn013/servlet/GetVendorCategory?id=vendor", async: true, success:handleVendor});
} 
    
function fetch_category_string_data() 
{
	$.ajax({url:"/jadrn013/servlet/GetVendorCategory?id=cat", async: true, success:handleCategory});
} 
        
function handleVendor(response) {

 	var items = response.split('|||');
    var vendorHandle = $('[name="vendor"]'); 
	for(i=0; i < items.length; i++) {
	var item_ven = items[i].split('|');
	if(i==0) {
	vendorString +="<div><input type=checkbox id="+item_ven[0]+" name= "+item_ven[1]+"> "+item_ven[1]+"</div>";

	} else {
	vendorString +="<div><input type=checkbox id="+item_ven[0]+" name= "+item_ven[1]+"> "+item_ven[1]+"</div>";
	}

    }
  document.getElementById("vendor").innerHTML = vendorString;
    for(i=0; i <= items.length; i++) {
    	$("#"+i).click(function(){
    	selectVendor(this.id)
    	});
    }
}

function selectVendor(id){
	$("#").addClass("selected");
	var isChecked = document.getElementById(id).checked;

  	if(isChecked){
		vendorArray[id] = document.getElementById(id).name;
  	}else{
  		delete vendorArray[id];
  	}
 
    filterProduct(); 
} 
         
function handleCategory(response) {

 	var items = response.split('|||');
    var vendorHandle = $('[name="category"]');
	for(j=0; j < items.length; j++) {
	var item_cat = items[j].split('|');
	if(j==0) {
	catString +="<div><input type=checkbox id=cat"+item_cat[0]+" name="+item_cat[1]+"> "+item_cat[1]+"</div>";

	} else {
	catString +="<div><input type=checkbox id=cat"+item_cat[0]+" name="+item_cat[1]+"> "+item_cat[1]+"</div>";
	}

    }
 document.getElementById("category").innerHTML = catString;
 for(j=0; j <= items.length; j++) {
    	$("#cat"+j).click(function(){
    	selectCategory(this.id)
    	});
    }
    
    getSearchValuesAndSetFilters();
}
  
function selectCategory(id){
	$("#").addClass("selected");

	var isChecked = document.getElementById(id).checked;

  	if(isChecked){
		categoryArray[id.substring(3,id.length)] = document.getElementById(id).name;
  	}else{
  		delete categoryArray[id.substring(3,id.length)];
  	}

   filterProduct(); 
  }
  
function fetch_products(){
if(vendorArray.length == 0 && categoryArray.length == 0){
$.ajax({url:"/jadrn013/servlet/Proj3GetProducts", async: true, success:handleProducts});
}
}

function filterProduct(){

var url = "";
var isCategoryPresent = false;
var isVendorPresent=false;
var isFilterPresent=false;
var vendorString = "";
var categoryString = "";
var search="";
var catCartString="-1";
 if(vendorArray.length > 0){
 
     url = "/jadrn013/servlet/Proj3GetProducts";
    var j = 0;
    
    for(i = 0; i<vendorArray.length; i++){
    
    if(vendorArray[i]){
    isVendorPresent = true;
    if(j == 0){
    
    vendorString += "("+i; 

    j++;
    }else{


vendorString += ","+i;
    j++;
    }
    }
    }
    if(vendorString != ""){
    
    vendorString += ")";
    
    url += "?vendor="+vendorString; 
   
    }
    
     cart.setVendorValues(vendorString);

    }

     if(categoryArray.length > 0){
     if(url=="") {
     url = "/jadrn013/servlet/Proj3GetProducts";
     }
    var m = 0;
    
    for(n = 0; n<categoryArray.length; n++){
    if(categoryArray[n]){
    isCategoryPresent = true;
    if(isVendorPresent == false) {
    if(m == 0){
    catCartString="";
    catCartString+="("+n;
    categoryString += "?category=("+n; 

    m++;
    }else{
    catCartString+=","+n;
    categoryString += ","+n; 

    m++;
    }
    } else {
    if(m == 0){
    catCartString="";
    catCartString+="("+n;
    categoryString += "&category=("+n; 
    

    m++;
    }else{
    catCartString+=","+n;
    categoryString += ","+n; 

    m++;
    }
    }
    }
    }
    if(categoryString != ""){
    catCartString+=")";
    categoryString += ")";
    url += categoryString;
    
    }
    
    cart.setCatValues(catCartString);

    }
    
    
    if(sortValue != "relevance"){
    
    if(isVendorPresent || isCategoryPresent){
    url += "&sort="+sortValue;
    }else{
    url="";
    url += "/jadrn013/servlet/Proj3GetProducts?sort="+sortValue;
    }
    }
    
    search = $("#search").val().trim();
    if(search != "") {
    
    
     if(isVendorPresent || isCategoryPresent || isFilterPresent){
    url += "&search="+search;
    }else{
    url="";
    url += "/jadrn013/servlet/Proj3GetProducts?search="+search;
    }  
    

   
    }
    
    cart.setSearchValues(search);
    
    if(url.trim() != "") {

     $.ajax({url:url, async: true, success:handleFilteredProduct});
     }
   
}


function handleProducts(response){

	document.getElementById("product").innerHTML = "";
	prodString="";
 	var items = response.split('|||');

	for(j=0; j < items.length; j++) {
	var item = items[j].split('|');
	var quantityString;
	var addToCartButton;
	if(item[5] == "null"){
	quantityString = "coming soon";
	addToCartButton="<button class=disabled  disabled> Add to cart</button>";
	}else if(item[5] == 0){
	quantityString = "more on the way";
	addToCartButton="<button class=disabled  disabled> Add to cart</button>";
	}else if(item[5] > 0){
	quantityString = "in stock";
	addToCartButton="<button class=show_add_buton id=atc"+item[6]+"  > Add to cart</button>";
	}
	prodString +="<div class=display_div><div id=prod"+j+" name="+item[6]+"><img src=/~jadrn013/proj1/images/u_load_images/"+item[4]+" width=200px height=200px><p>"+item[0]+"-"+item[2]+"</p><p>"+item[1]+"</p><p>$"+item[3]+"</p><p>"+quantityString+"</p></div><p>"+addToCartButton+"  <button class=show_add_buton id=sds"+item[6]+">Show details</button></p><input type=hidden id=sku"+item[6]+" value="+item[6]+" /> <input type=hidden id=onh"+item[6]+" value="+item[5]+"></div>";

	
	if((j+1) % 3 == 0){

	
	}
	}

	 document.getElementById("product").innerHTML = prodString;
	 
	 for(j=0; j < items.length; j++) {
	var item = items[j].split('|');
	
	 $("#sds"+item[6]).on('click', function() {
	 
	 openProduct(this.id.substring(3,10));
	 });
	 $("#atc"+item[6]).on('click', function() {

		var sku = this.id.substring(3,10);

if(sku !="" && isQuantityAvailable(sku, $("#onh"+sku).val()) > 0){

cart.add(sku, '1');
        updateDisplay();
        updateCartCount(true);
}else{

}
});
}
	 
	 for(l=0; l < items.length; l++){
	$("#prod"+l).click(function(){
	openProduct(this.attributes["name"].value)
    	});
	 }
}

function handleFilteredProduct(response){

	if(response.trim() !="") {
	handleProducts(response);
	} else {
	document.getElementById("product").innerHTML = "Product not present";
	prodString="";
	}
	
}
function set_on_change_listner(){
$( "#filter" ).change(function() {
  var filterDropdown =  document.getElementById("filter");
  sortValue = filterDropdown.options[filterDropdown.selectedIndex].value;
   if(sortValue != "relevance"){
   filterProduct();
   }
});
}

function openProduct(id){
window.location.href = "/jadrn013/servlet/ShowProduct?sku="+id;
}


function openCheckout(checkoutProducts){
window.location.href = "/jadrn013/servlet/OpenCheckout?checkoutProducts="+checkoutProducts;
}

function openBillingPage() {
window.location.href = "/jadrn013/servlet/BillingPage";
}


      
  function isQuantityAvailable(sku, on_hand){
  return (on_hand-cart.getQuantity(sku)); 
 
  }    


