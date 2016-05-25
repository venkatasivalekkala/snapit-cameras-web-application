
// form input info objects
var firstNameInfo;
var lastNameInfo;
var addressInfo;
var cityInfo;
var stateInfo;
var zipcodeInfo;
var phoneNumberAreaInfo;
var phoneNumberPrefixInfo;
var phoneNumberExtenstionInfo;

var shippingFirstNameInfo;
var shippingLastNameInfo;
var shippingAddressInfo;
var shippingCityInfo;
var shippingStateInfo;
var shippingZipcodeInfo;
var shippingPhoneNumberAreaInfo;
var shippingPhoneNumberPrefixInfo;
var shippingPhoneNumberExtenstionInfo;
var nameOnCardInfo;
var cardNumberInfo;
var yearInfo;
var monthInfo;
var securityCode;
var cardType;
var infoArray;

var inputType = 
    {
        TEXT:0, SECURITY:1, ADDRESS:2, CITY:3, STATE:4, ZIP:5, MONTH:6,
         YEAR:7, PHONE_3Digits:8, PHONE_EXT:9, CREDITCARD:10, DROPDOWN:11
     };

//error message divs
var ErrorMessageDivArray = ["message", "shipping_message", "payment_message"];

    
//jquery function to change focus when phone number is entered
$(document).ready(function(){
var cart = new shopping_cart("jadrn013");
var subTotalValue = $("#subtotalOrder").text();
console.log("sub"+subTotalValue);
if(cart.size() == 0 || subTotalValue.trim() == "null") {
//You dont have any items in cart.
window.location.href="/jadrn013/proj3.html";
return;

}
var products = cart.getCartArray();
//calculateTotalPrice();
    $("#firstname").focus();
     initVariables();
     
     function focusPhoneField(phoneInputIdFocused, phoneInputIdToTransfer)
    {
        if($(phoneInputIdFocused).val().length == 3) 
        {
          $(phoneInputIdToTransfer).focus();
        }
    }
  
  $("#checkboxCenter").click(function(){
        console.log("clicked checkbock jq"+this.id);
        checkboxClicked(this.id);  
        });
  
  $("#hmphone1").keyup(function(){
      focusPhoneField("#hmphone1", "#hmphone2");
  });
    
    $("#hmphone2").keyup(function(){
        focusPhoneField("#hmphone2", "#hmphone3");
  });
   
    $("#tel1").keyup(function(){
      focusPhoneField("#tel1", "#tel2");
  });
    
    $("#tel2").keyup(function(){
        focusPhoneField("#tel2", "#tel3");
  });
  
  document.getElementById('cardtype').addEventListener('change', updateSecurityInput, false);
  
});

//initialize info objects when page loads.
function initVariables() {
    firstNameInfo={
         ID:"firstname", TYPE:inputType.TEXT, ERROR:"Please enter valid first name. Only characters, space, - and ' are allowed.", ERROR_DIV_ID:"message", NAME:"first name"
    }

     lastNameInfo={
         ID:"lastname", TYPE:inputType.TEXT, ERROR:"Please enter valid last name. Only characters, space, - and ' are allowed.", ERROR_DIV_ID:"message", NAME:"last name"
    }  

     addressInfo = {
          ID:"address1", TYPE:inputType.ADDRESS, ERROR:"Please enter valid address. Only characters space numbers # - / and . are allowed.", ERROR_DIV_ID:"message", NAME:"address"
     }
     
     cityInfo={ 
          ID:"city", TYPE:inputType.CITY, ERROR:"Please enter valid city. Special characters and numbers are not allowed.", ERROR_DIV_ID:"message", NAME:"city"
     }
     
    stateInfo={
         ID:"state", TYPE:inputType.STATE, ERROR:"Please enter valid state abbreviation. Example : for California enter CA or ca", ERROR_DIV_ID:"message", NAME:"state"
     }
    
    zipcodeInfo={
         ID:"zipcode", TYPE:inputType.ZIP, ERROR:"Please enter valid zip. Only numbers are allowed.", ERROR_DIV_ID:"message", NAME:"zip"
     }
    
    phoneNumberAreaInfo={
      ID:"hmphone1", TYPE:inputType.PHONE_3Digits, ERROR:"Please enter valid phone areacode. Only numbers are allowed.", ERROR_DIV_ID:"message", NAME:"area code"
     }
    
    phoneNumberPrefixInfo={
      ID:"hmphone2", TYPE:inputType.PHONE_3Digits, ERROR:"Please enter valid phone prefix. Only numbers are allowed.", ERROR_DIV_ID:"message", NAME:"prefix"
     }
     
    phoneNumberExtenstionInfo = {
      ID:"hmphone3", TYPE:inputType.PHONE_EXT, ERROR:"Please enter valid phone extension. Only numbers are allowed.", ERROR_DIV_ID:"message", NAME:"extension"
     }
     
    shippingFirstNameInfo = {
          ID:"shippingfirstname", TYPE:inputType.TEXT, ERROR:"Please enter shipping first name. Only characters, space, - and ' are allowed.", ERROR_DIV_ID:"shipping_message", NAME:"shipping first name"
     }
     
    shippingLastNameInfo = {
         ID:"shippinglastname", TYPE:inputType.TEXT, ERROR:"Please enter shipping last name. Only characters, space, - and ' are allowed.", ERROR_DIV_ID:"shipping_message", NAME:"shipping last name"
     }
    
         shippingAddressInfo = {
          ID:"shippingaddress1", TYPE:inputType.ADDRESS, ERROR:"Please enter valid shipping address. Only characters space numbers # - / and . are allowed.", ERROR_DIV_ID:"shipping_message", NAME:"shipping address"
     }
     
     shippingCityInfo={ 
          ID:"shippingcity", TYPE:inputType.CITY, ERROR:"Please enter valid shipping city. Special characters and numbers are not allowed.", ERROR_DIV_ID:"shipping_message", NAME:"shipping city"
     }
     
    shippingStateInfo={
         ID:"shippingstate", TYPE:inputType.STATE, ERROR:"Please enter valid shipping state abbreviation. Example : for California enter CA or ca", ERROR_DIV_ID:"shipping_message", NAME:"shipping state"
     }
    
    shippingZipcodeInfo={
         ID:"shippingzipcode", TYPE:inputType.ZIP, ERROR:"Please enter valid shipping zip. Only numbers are allowed.", ERROR_DIV_ID:"shipping_message", NAME:"shipping zip"
     }

     shippingPhoneNumberAreaInfo={
        ID:"tel1", TYPE:inputType.PHONE_3Digits, ERROR:"Please enter valid shipping areacode. Only numbers are allowed.", ERROR_DIV_ID:"shipping_message", NAME:"shipping area code "
     }
     
     shippingPhoneNumberPrefixInfo= {
         ID:"tel2", TYPE:inputType.PHONE_3Digits, ERROR:"Please enter valid shipping prefix. Only numbers are allowed.", ERROR_DIV_ID:"shipping_message", NAME:"shipping prefix "
    }
     
     shippingPhoneNumberExtenstionInfo= {
        ID:"tel3", TYPE:inputType.PHONE_EXT, ERROR:"Please enter valid shipping extension. Only numbers are allowed.", ERROR_DIV_ID:"shipping_message", NAME:"shipping extension "
    }
     
     nameOnCardInfo = {
          ID:"nameoncard", TYPE:inputType.TEXT, ERROR:"Please enter valid name on card.", ERROR_DIV_ID:"payment_message", NAME:"name on card"
     }
     
     cardNumberInfo = {
          ID:"cardnumber", TYPE:inputType.CREDITCARD, ERROR:"Please enter valid card number. Only numbers are allowed.", ERROR_DIV_ID:"payment_message", NAME:"card number"
     }
     
       monthInfo={
         ID:"month", TYPE:inputType.MONTH, ERROR:"Please enter valid month. Only numbers are allowed.", ERROR_DIV_ID:"payment_message", NAME:"month"
     }

    yearInfo={
         ID:"year", TYPE:inputType.YEAR, ERROR:"Please enter valid year. Only numbers are allowed.", ERROR_DIV_ID:"payment_message", NAME:"year"
    }
    
     cardType={
         ID:"cardtype", TYPE:inputType.DROPDOWN, ERROR:"Please select card type.", ERROR_DIV_ID:"payment_message", NAME:"card type"
    }
    
     securityCode={
         ID:"securitycode", TYPE:inputType.SECURITY, ERROR:"Please enter valid security code. Only numbers are allowed.", ERROR_DIV_ID:"payment_message", NAME:"security code"
    }
        
     
	infoArray = [firstNameInfo, lastNameInfo, addressInfo, cityInfo, stateInfo, zipcodeInfo, 
	phoneNumberAreaInfo, phoneNumberPrefixInfo, phoneNumberExtenstionInfo, shippingFirstNameInfo, 
	shippingLastNameInfo, shippingAddressInfo, shippingCityInfo, shippingStateInfo, shippingZipcodeInfo, 
	shippingPhoneNumberAreaInfo, shippingPhoneNumberPrefixInfo, shippingPhoneNumberExtenstionInfo, 
	cardType, nameOnCardInfo, cardNumberInfo, monthInfo, yearInfo, securityCode];
	
	for(var i=0; i<infoArray.length; i++) 
	{
		var obj = infoArray[i];
		document.getElementById(obj.ID).addEventListener("blur", getBlurFunction(obj), false);  
	}
  
    function getBlurFunction(obj) 
    {
        return function() 
        {
        	validateOnBlur(obj);
        }
    }
}

function validateOnBlur(obj) 
{
    if(checkEmptyValue(obj, false) == false) {
		return false;
	}
	if(validateInput(obj, false) == false) {
    	return false;
}
    clearError(obj);
}

function validateInput(obj, isShowError) 
{
switch(obj.TYPE) 
    {
		case inputType.TEXT:
            if(validateNames(obj, isShowError) == false) 
             {
                return false;
             }
            break;

             case inputType.NUMBER:
                if(validateNumber(obj, isShowError) == false) 
                {
                    return false;
                }
                break;
                        
            case inputType.ADDRESS:
                if(validateAddress(obj, isShowError) == false) 
                {
                    return false;
                }
                break; 
            
            case inputType.CITY:
                if(validateCity(obj, isShowError) == false) 
                {
                    return false;
                }
                break;
                     
                     
            case inputType.STATE:
                if(validateState(obj, isShowError) == false) 
                {
                    return false;
                }
                break;
                    
            case inputType.ZIP:
                if(validateZip(obj, isShowError) == false) 
                {
                    return false;
                }
                break;

            case inputType.PHONE_3Digits:
                if(validateNumberForLength(obj, 3, isShowError) == false) 
                {
                    return false;
                }
                break; 
                     
            case inputType.PHONE_EXT:
                if(validateNumberForLength(obj, 4, isShowError) == false) 
                {
                    return false;
                }
                break; 
 
            case inputType.MONTH:
                if(validateMonth(obj, isShowError) == false) 
                {
                    return false;
                }
                break;
     
            case inputType.YEAR:
                if(validateCCYear(obj, isShowError) == false) 
                {
                    return false;
                }
                break;
             
             
            case inputType.CREDITCARD:
            	if(validateNumberForLength(obj, 16, isShowError) == false) 
                {
                    return false;
                }
                break;
                
            case inputType.DROPDOWN:
        		if(validateDropdownList(obj, isShowError)==false) 
        		{
            		return false;
        		}
        		break;
    }    	
}  

function validateCCYear(obj, isShowError) 
{
    var today = new Date();
    var currentYear = today.getFullYear();  
    var currentMonth = today.getMonth();  
    //validate 4 digit year.
    if(validateNumberForLength(obj, 4, isShowError) == false)
    {   
        return false;
    } 
    // user entered year greater than current year which is invalid. show error.
    if(currentYear - getValueFromId(obj.ID) > 0)
    {   if(isShowError) {
        	document.getElementById(obj.ERROR_DIV_ID).innerHTML = "Please enter valid credit card expiry year.";
        	document.getElementById(obj.ID).style.borderColor="red";
        	document.getElementById(obj.ID).focus();
    	}
        return false;
    } 

    var inMonth = document.ValidateWhole.month.value.trim()-1;
    var inYear = document.ValidateWhole.year.value.trim();
    //var newDate = new Date(inYear, inMonth, inDate);
    
    if(currentYear == getValueFromId(obj.ID)) 
    {
    if(inMonth < currentMonth) {
    if(isShowError) {
        document.getElementById(obj.ERROR_DIV_ID).innerHTML = "Please enter valid credit card expiry year.";
        document.getElementById(obj.ID).style.borderColor="red";
        document.getElementById(obj.ID).focus();
    }
        return false;
    } 
    }
}

function validateform()
 {
     if(!infoArray) 
     {
     initVariables();
     }
     clearAllErrorMessages();
     
     //check input types and show error message if input is empty or invalid
    for(var i= 0; i<infoArray.length; i++) 
    {
        if(checkEmptyValue(infoArray[i], true) == false) {
        	return false;
        }
        if(validateInput(infoArray[i], true) == false) {
           return false;
           }
    }
}
 
function validateAddress(obj, isShowError)
{
    var value = getValueFromId(obj.ID);
    if(isAddress(value))
    {
        return true;  
    }  
    else  
    {  
        if(isShowError) {
        	showErrorDiv(obj, false);
        }
        return false;  
    } 
}
     
function validateCity(obj, isShowError)
{
    var value = getValueFromId(obj.ID);
    if(isCity(value))
    {
        return true;  
    }  
    else  
    {
        if(isShowError) {
       		showErrorDiv(obj, false);
        }
        return false;   
    }
}
     
     
function validateState(obj, isShowError)
{
    if(validateTextInput(obj, isShowError) == false)
    {
       return false;
    }
    var value = getValueFromId(obj.ID);
    //check if user input is one of the below states seperated by semicolon
    stateString = "wa;or;ca;ak;nv;id;ut;az;hi;mt;wy;co;nm;nd;sd;ne;ks;ok;tx;mn;ia;mo;ar;la;wi;il;ms;mi;in;ky;tn;al;fl;ga;sc;nc;oh;wv;va;pa;ny;vt;me;nh;ma;ri;ct;nj;de;md;dc";
    if (value.length == 2 && stateString.indexOf(value.toLowerCase() + ";") > -1) 
    {
       return true;
    } 
    else
    {
        if(isShowError) {
        showErrorDiv(obj, false);
        }
        return false;
    }
}
     
function validateZip(obj, isShowError) 
{
    if(validateNumber(obj) == false)
    {
        if(isShowError) {
        showErrorDiv(obj, false);
        }
        return false;
    } 
    else if(getValueFromId(obj.ID).length < 5) 
    {         
        if(isShowError) {
        document.getElementById(obj.ERROR_DIV_ID).innerHTML = "Please enter 5 digit Zip";
        document.getElementById(obj.ID).style.borderColor="red";
        document.getElementById(obj.ID).focus();
        }
        return false;
     } 
    else 
    {
    return true;
    }
}
     
function validateNumberForLength(obj, length, isShowError) 
{
    if(validateNumber(obj)) 
    {
    if(getValueFromId(obj.ID).length == length) 
    {
        return true;
    } 
    else 
    {
        if(isShowError) {
        document.getElementById(obj.ERROR_DIV_ID).innerHTML = "Please enter "+length+' digits in '+obj.NAME;
        document.getElementById(obj.ID).style.borderColor="red";
        document.getElementById(obj.ID).focus();
        }
        return false;
    }
} 
    else
    {
    if(isShowError) {
    showErrorDiv(obj, false);
    }
    return false;  
    }
}
     
function validateMonth(obj, isShowError) 
{
    var value = getValueFromId(obj.ID);
    if(validateNumber(obj)) {
    if(value >0 && value <=12) {
        return true;
    } else {
        if(isShowError) {
        document.getElementById(obj.ERROR_DIV_ID).innerHTML = "Please enter valid month between 1-12";
        document.getElementById(obj.ID).style.borderColor="red";
        document.getElementById(obj.ID).focus();
        }
    return false;
    }
    } 
    else
    {
    if(isShowError) {
    	showErrorDiv(obj, false);
    	}
    return false;     
    }
}

function validateDropdownList(obj, isShowError)
{
    if(isEmpty(document.getElementById(obj.ID).value.trim()) == false)
    {
         return true;  
    }  
    else  
    {  
        if(isShowError) {
        showErrorDiv(obj, true);
        }
        return false;  
    } 
}

function updateSecurityInput()
{
	var cardtype = $("#cardtype").val();
	$("#securitycode").val("");
	if(cardtype == "americanexpress")
	{
		document.getElementById("securitycode").maxLength =4;
	}
	else
	{
		document.getElementById("securitycode").maxLength =3;
	}
}
     
     /*Helper Functions*/ 
function isEmpty(value)
{
    if(value !="")
    {
        return false;
    }
    else 
    {
       return true;
    }
}
   
function isLetter(value) 
{
    var letters = /^[A-Za-z]+$/; 
    return value.match(letters); 
}

function isName(value) 
{
    var letters = /^[A-Za-z\s\-\']+$/; 
    return value.match(letters); 
}
 
function isNumber(value)
{
    var numberExpression = /^[0-9]+$/;
    return value.match(numberExpression); 
}   
     
function isAddress(value)
{
    var addressExpression=/^[a-zA-Z\s\d\#\/\.\-]+$/;
    return value.match(addressExpression);
}
     
function isCity(value)
{
    var cityExpression= /^[a-zA-Z\s]+$/;
    return value.match(cityExpression); 
}

function isDateOfBirth(value)
{
    var dateExpression=/^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-\d{4}$/;
    return value.match(dateExpression);
}

function validateTextInput(obj, isShowError) 
{
    var value = document.getElementById(obj.ID).value.trim();
    if(isLetter(value))  
    {
        return true;  
    }  
    else  
    {  
        if(isShowError) {
        	showErrorDiv(obj, false);
        }
        return false;  
    }  
}

function validateNames(obj, isShowError) {
var value = document.getElementById(obj.ID).value.trim();
    if(isName(value))  
    {
        return true;  
    }  
    else  
    {  
        if(isShowError) {
        	showErrorDiv(obj, false);
        }
        return false;  
    }  
}
     
function validateNumber(obj)
{
    var value = getValueFromId(obj.ID);
    if(isNumber(value)){
        return true;  
    }  
    else {  
        return false;  
    }  
}

function checkEmptyValue(obj, isShowError) 
{
if(obj.TYPE != inputType.GENDER 
            && obj.TYPE != inputType.DROPDOWN
            && obj.TYPE != inputType.PHOTO)
        {
             var value = getValueFromId(obj.ID);
             if(isEmpty(value)) 
             {
                 if(isShowError) {
                 	showErrorDiv(obj, true);
                 }
                return false;
            }
        }
        return true;
}
  
    //clear all red borders and error messages.
function clearAllErrorMessages() 
{
    clearAllErrors();
    clearAllErrorBorder();
}
     
function clearAllErrorBorder() 
{
     for(var i=0; i<infoArray.length; i++) 
     {
        clearError(infoArray[i]);
    }
}
     
function clearError(obj) 
{
clearAllErrors();
var id = obj.ID;
     console.log("clear eror"+document.getElementById(id));
        if(id == "inlineDiv") 
        {
            document.getElementById(id).style.borderColor="#ffffff";
        } 
        else 
        {
            document.getElementById(id).style.borderColor="#dddddd";
        }
}

function clearAllErrors() 
{
document.getElementById("message").innerHTML = "";
document.getElementById("shipping_message").innerHTML = "";
document.getElementById("payment_message").innerHTML = "";
}
       
function getValueFromId(id) 
{
    return document.getElementById(id).value.trim();
}

function showErrorDiv(obj, isEmpty)
{
    if(isEmpty) 
    {
        if(obj.TYPE == inputType.DROPDOWN || obj.TYPE == inputType.PHOTO) 
        {
            document.getElementById(obj.ERROR_DIV_ID).innerHTML = obj.ERROR;
        } 
        else 
        {
            console.log('inside isempty');
            document.getElementById(obj.ERROR_DIV_ID).innerHTML = 'Please enter ' + obj.NAME;
        }
    } 
    else 
    { 
        console.log('inside not isempty');
        document.getElementById(obj.ERROR_DIV_ID).innerHTML = obj.ERROR; 
    }
    document.getElementById(obj.ID).style.borderColor="red";
    document.getElementById(obj.ID).focus();
}

function checkboxClicked(className) 
{
    if(document.getElementById(className).checked) 
    {
   		document.getElementById("shippingfirstname").value = document.getElementById("firstname").value;
   		document.getElementById("shippingmiddlename").value = document.getElementById("middlename").value;
   		document.getElementById("shippinglastname").value = document.getElementById("lastname").value;
   		document.getElementById("shippingaddress1").value = document.getElementById("address1").value;
   		document.getElementById("shippingaddress2").value = document.getElementById("address2").value;
   		document.getElementById("shippingcity").value = document.getElementById("city").value;
   		document.getElementById("shippingstate").value = document.getElementById("state").value;
   		document.getElementById("shippingzipcode").value = document.getElementById("zipcode").value;
   		document.getElementById("tel1").value = document.getElementById("hmphone1").value;
   		document.getElementById("tel2").value = document.getElementById("hmphone2").value;
   		document.getElementById("tel3").value = document.getElementById("hmphone3").value;
    } else {
     	document.getElementById("shippingfirstname").value ="";
     	document.getElementById("shippingmiddlename").value="";
     	document.getElementById("shippinglastname").value="";
      	document.getElementById("shippingaddress1").value = "";
   		document.getElementById("shippingaddress2").value = "";
   		document.getElementById("shippingcity").value = "";
   		document.getElementById("shippingstate").value = "";
   		document.getElementById("shippingzipcode").value = "";
   		document.getElementById("tel1").value = "";
   		document.getElementById("tel2").value = "";
   		document.getElementById("tel3").value = "";
    } 
}