       
function shopping_cart(owner) {
    this.owner = $.trim(owner);
    this.skuArray = new Array();
    this.qtyArray = new Array();
    
    this.vendors = "-1";
    this.categories = "-1";
    this.searchString="-1";

//////////////////////////////////////////////////////////////////////////
// Do not use the following two methods;  they are private to this class
    this.getCookieValues = function() {  // PRIVATE METHOD
        var raw_string = document.cookie;        
        var arr = new Array();
        var parArr = new Array();
        if(raw_string == undefined)
            return;
        var tmp = raw_string.split(";");
        var myValue = null;        
        for(i=0; i < tmp.length; i++)
            if(tmp[i].indexOf(owner) != -1)
                myValue = tmp[i].split("=");
        if(!myValue)
            return;
           parArr =  myValue[1].split("|||");
        arr = parArr[0].split("||");
        for(i=0; i < arr.length; i++) {
            var pair = arr[i].split("|"); 
            if(pair[0] == undefined || pair[1] == undefined) continue;
            this.skuArray[i] = pair[0];
            this.qtyArray[i] = pair[1];
            }   
           this.vendors =  parArr[1];
           this.categories = parArr[2];
           this.searchString=parArr[3];
           console.log("read cookie ven"+this.vendors);
           console.log("read cookie cat"+this.categories);
           console.log("read cookie search"+this.searchString);
                  
        }
        
    this.writeCookie = function() {  // PRIVATE METHOD
        var toWrite = this.owner+"=";
        for(i=0; i < this.skuArray.length; i++) 
            toWrite += this.skuArray[i] + "|" + this.qtyArray[i] + "||";
        toWrite = toWrite.substring(0,toWrite.length - 2);
        toWrite += "|||"+this.vendors+"|||"+this.categories+"|||"+this.searchString+"; path=/";
        console.log("written cookie"+toWrite);
        document.cookie = toWrite;
        }
//////////////////////////////////////////////////////////////////////////            
        
    this.add = function(sku, quantity) {
    console.log("add quantity");
        sku = $.trim(sku);
        quantity = $.trim(quantity);
        this.getCookieValues(); 
        var found = false;
        for(i=0; i < this.skuArray.length; i++)
        if(this.skuArray[i] == sku) {        
            this.qtyArray[i] = parseInt(quantity,10) + parseInt(this.qtyArray[i],10);
            found = true;            
            }
        if(!found) {       
            this.skuArray.push(sku);
            this.qtyArray.push(quantity);
            }
        this.writeCookie();         
    }
    
 this.setVendorValues = function(vendors) {
    
    if(vendors.trim()) {
    this.vendors = vendors.trim();
    } else {
    this.vendors="-1";
    }
    this.writeCookie(); 
    } 
    
 this.setCatValues = function(categories) {
    if(categories.trim()) {
    this.categories = categories.trim();
    } else {
    this.categories="-1";
    }
    this.writeCookie(); 
    }
    
this.setSearchValues = function(searchString) {
     if(searchString.trim()) {
    this.searchString = searchString.trim();
    } else {
    this.searchString="-1";
    }
    
    this.writeCookie();  
    }
    
    this.getSearchValues = function() {
	this.getCookieValues();
    return this.vendors+"|"+this.categories+"|"+this.searchString;
    
    }
    
    
    
    this.setQuantity = function(sku, quantity) {  
        sku = $.trim(sku);
        var found = false;
        if(sku == "") return;        
        quantity = $.trim(quantity);            
        this.getCookieValues();
        
        for(i=0; i < this.skuArray.length; i++)
            if(this.skuArray[i] == sku) {        
                this.qtyArray[i] = parseInt(quantity,10);            
                found = true;
                console.log("found"+this.qtyArray[i])
                }
        if(found)
            this.writeCookie();
        }    
    
       this.delete = function(sku) {
        sku = $.trim(sku);
        var index = -1;
        this.getCookieValues();       
        for(i=0; i < this.skuArray.length; i++)
        if(this.skuArray[i] == sku)  
            index = i;               
        if(index != -1) {      
            this.skuArray.splice(index,1);
            this.qtyArray.splice(index,1);
            }         
        if(this.skuArray.length == 0) {
            document.cookie = this.owner + "= ;expires=-1;path=/";
            }
        else
            this.writeCookie();
        }
        
    this.size = function() {
        this.getCookieValues();
        var count = 0;
        for(i=0; i < this.qtyArray.length; i++)
            count += parseInt(this.qtyArray[i],10);
        return count;
        }        
        
    this.getCartArray = function() {
        this.getCookieValues();
        var returnArray = new Array();
        for(i=0; i < this.skuArray.length; i++) {
            returnArray[i] = new Array();
            returnArray[i].push(this.skuArray[i]);
            returnArray[i].push(this.qtyArray[i]);
            }
        return returnArray;
        } 
        
        
    this.getQuantity = function(sku) {
    	console.log(sku);
        this.getCookieValues();
        var returnArray = this.getCartArray();
        console.log("quant get array"+returnArray);
        for(i=0; i < returnArray.length; i++) {
        console.log("quantity"+returnArray[i][0]);
            if(returnArray[i][0] == sku){
            console.log("cookie quant="+returnArray[i][1]);
            return returnArray[i][1];
            console.log(returnArray[i][1]);
            }
            }
        return 0;
        }                               
}    
        