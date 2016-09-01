# snapit-cameras-web-application

#Project 3


Your project is due on Tuesday, April 21st. Your project must be correctly published in your class account on jadran to receive any credit. The main entry point must be a file named proj3.html, NOT index.html.

We will be using the Tomcat web server instead of Apache for most of this project. All files for this project must go in or below your web_services subdirectory. This means all files including html, css, js, etc. The sole exception to this is product image files. Since you have stored product images in your public_html area, you should leave them there, and use a URL that points to your images folder. Other than images, no part of the project may be in or below public_html.

You will access your online store (the landing page) via the following URL pattern:

            
            http://jadran.sdsu.edu/jadrnXXX/proj3.html
        
Note that there is no ~ (tilde) character in the URL. As with previous assignments, you must create a zero length file named finished in the top level of your web_services folder; in the same location as your proj3.html file.

#The Assignment:

This is a continuation of the previous two projects. For this assignment, you will write the customer application, the online storefront. This application is the 'face' of your business to the public. You should make every effort to make this application attractive, friendly, and easy to use. The appearance and ease of use will be weighted heavily during grading.

All dynamic content coming from the server must be done with Java servlets or JSP. You may not use Perl, PHP or anything else for dynamic code on the server side other than Java. You should also plan to make optimum use of Javascript to enhance your site. You are welcome to use JQquery, DOJO, Ember, Backbone, AngularJS, or any other publicly available Javascript library if you wish.

This is your major project for the semester and the single most important graded component in the course; your work on this project will be carefully considered in the determination of your final course grade.

#Details:

There should NOT be any kind of login screen.

Your application will allow users to browse through your store offerings easily.

You should include search functionality or filters to assist customers in finding what they want.

When any item is visible on screen, you should show the manufacturer's id, thumbnail image, price of each item, and status, "in stock", "more on the way" or "coming soon".

When an item is selected, you should show complete information about the item including a larger image, description, features, and the retail price. (do not display fields that are inappropriate, such as the cost or any internal stocknumbers)
All of the items in your product database table should be displayed regardless of the on hand quantity.

in stock, the on_hand quantity > 0.

more on the way, the on_hand quantity == 0.

coming soon, the sku does not exist in the on_hand table, but is in the inventory table. This is new merchandise that has been ordered, but has not yet arrived.

Be sure to insert a minimum of 25 records in the inventory database table, of which at least 20 must be in stock, with an on hand quantity > 0. Include at least 5 items that are in the inventory table but not in stock.

You will offer a 'shopping cart' which will offer 'Add to shopping cart' and 'Check Out Now' buttons. A link or button to the shopping cart should always be visible.

Users may select items and add them to the shopping cart. You will want to use AJAX for this to avoid refreshing the current page. You must save the state of your shopping cart so that users can put things in the cart then continue shopping.

Customers may not purchase items (or put them in the shopping cart) that you don't have. If a customer wants to purchase a quantity that exceeds your on hand quantity, you must alert the customer that the quantity is unavailable.

Customers should be able to modify quantities or delete items from the shopping cart at will.

The 'Check Out Now' button should take the users to a screen where they may purchase the items in the shopping cart with a credit card. NOTE: There must NOT be a login screen for this application. Required fields for this are:

Shipping Information (Name, Address, Address, City, State, Zip, Contact Phone).

Billing Information (Name, Address, Address, City, State, Zip, Phone, Credit Card Type, Credit Card Number, Credit Card Expiration Date, Security Code).

The two addresses may be different. The billing information must match what the credit card company has on file for that customer. Add a checkbox to allow the user to use the billing address for the shipping address. [The user shouldn't have to enter the same address twice.]

When using/testing your application, please do NOT enter valid credit card information!

Once shipping and billing information has been entered, display an Order Summary page which shows the name and address to which the items will be shipped, the items ordered, and the quantity for each with extension. Include a $5.00 shipping charge and 8% sales tax. In California, sales tax is applied to the shipping charge when it is a flat amount, so include the $5.00 shipping charge when calculating the tax. Show a total for the order and give the buyer the options to 'Place Order' or 'Cancel'. Display a confirmation page after a successful purchase to let the customer know the order was accepted and the merchandise is on the way. (The cancel option does not remove items from the shopping cart, but just returns the user to the main page. The 'Place Order' choice should remove the purchased items from the shopping cart.)

A customer purchase should cause an entry into the merchandise shipped out table in your database. This will reduce the on hand quatity for that item.

Once the purchase has been completed, there need not be any facility for the customer to return to or view/modify/cancel the order.

Also, note that you are not storing the customer information (name, addresses, credit card # etc). Of course, a real business would store this information in the database, but this has been deleted from your project to keep the size of it manageable.
You may use xhtml, html 5, CSS ,Javascript, AJAX, Java Servlets, JSP, JDBC and also the MySQL database on opatija for this project. Of course you are welcome to use techniques for specific issues or problems that you find online. Be sure to limit the amount of such material, and to document the source for such techniques.

