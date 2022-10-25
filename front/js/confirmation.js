///////////////////////////////THE SCRIPT FOR THE CONFIRMATION PAGE

let searchParams = new URLSearchParams(window.location.search); // We collect our url elements
let orderNumber = " "; // The variable "oderID" refers to the order number found in the URL
let orderId = document.getElementById("orderId")

// We collecte the order number that appears in the URL to communicate it to the customer in the DOM
if (searchParams.has("order")) {
	orderNumber = searchParams.get("order");
    orderId.innerText = orderNumber;
} 
