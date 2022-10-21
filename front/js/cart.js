///////////////////////////////THE SCRIPT FOR THE CART PAGE

import getArticles from "./script.js"; // Function to get all the API's articles in an array


//--------------------------------DISPLAY THE CART AND ADD FUNCTION TO CHANGE QUANTITY AND DELETE ITEMS---------------------


/////////////////////////////// Definition of variables
let cart = ""; // The cart which is in our local Storage
let articles = []; // the array that will take all the API's products
let productsOrdered = document.getElementById("cart__items"); // the HTML element that contains the cart products' details.
let foundProduct = ""; // defined to collecte the details (eg the price) of the targeted product on the API's data
let quantitySum = 0; // the total number of products contained in the cart
let totalQuantity = document.getElementById("totalQuantity"); // the place to put the quantitySum data on the DOM
let priceSum = 0; // the total amount of the cart
let totalPrice = document.getElementById("totalPrice"); // the place to put the priceSum data on the DOM
let inputQty = "";
let deleteBtn = "";
let productArticle = "";
let contact = {
	prenom : "",
	nom : "",
	adresse : "",
	ville : "",
	email : ""
};



/////////////////////////////// The function getCart is defined to get the cart which is in the localStorage
getCart();
function getCart() {
	// We call our local storage to get the visitor cart in an array
	cart = localStorage.getItem("cart");
	if (cart === null) {
		// If the cart doesn't exist, we create an empty array
		cart = [];
	} else {
		// If the cart ever exists, we parse the local storage datas
		cart = JSON.parse(cart);
	}
}


/////////////////////////////// Function to DISPLAY the products' details and make the cart dynamic with DELETE and CHANGE QUANTITY functions
async function articleCartParams() {
	articles = await getArticles(); // the constant "articles" takes all products contained in my data base in an array thanks to the run of the function ""getArticles"

/////////////////////////////// Function to DISPLAY the article's attributes in the cart
	for (const element of cart) { // We launch a for loop to get each articles with its details at the rigth place
		foundProduct = articles.find(product => product._id === element.id); // We target each product in the API's articles array
		// we select the element HTML where the attributes of the product have to appear, and we fullfill all the fields of the product thanks to the selection of the targeted key of the array "articles"
		productArticle = document.createElement("article")
		productArticle.setAttribute("data-id", element.id);
		productArticle.setAttribute("data-color", element.color);
		productArticle.classList.add ("cart__item");
		productsOrdered.appendChild(productArticle);
		productArticle.innerHTML = `<div class="cart__item__img">
										<img src="${element.srcImg}" alt="${element.altTxt}">
									</div>
									<div class="cart__item__content">
									<div class="cart__item__content__description">
										<h2>${element.name}</h2>
										<p>${element.color}</p>
										<p>${foundProduct.price} €</p>
									</div>
									<div class="cart__item__content__settings">
										<div class="cart__item__content__settings__quantity">
										<p>Qté : </p>
										<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
										</div> 
										<div class="cart__item__content__settings__delete">
													<p class="deleteItem">Supprimer</p>
										</div>
												</div>
										</div>`						
	}
	deleteItem();
	changeQuantity();
}
articleCartParams();


/////////////////////////////// The function to DELETE a product and remove it from the localStorage
function deleteItem() {
	deleteBtn = document.querySelectorAll(".deleteItem"); // All the "delete" buttons are targeted
	console.log(deleteBtn);
	for (const element of deleteBtn) { // We launch a for loop to take in consideration each button individually
		element.addEventListener("click", (event) => {
			event.preventDefault();
			console.log("on écoute");
			let targetedProduct = element.closest("article").dataset.id; // We get the id of the parent article
			let colorTargetedProduct = element.closest("article").dataset.color; // We get the color of the parent article
			let productToCancel = cart.find(product => product.id == targetedProduct && product.color == colorTargetedProduct);
			cart = cart.filter(p => p != productToCancel); // We keep in the localStorage the products which have a different id and color from the targeted product
			localStorage.setItem("cart", JSON.stringify(cart));
			location.reload(); // we refresh the page
		});
	}
}


/////////////////////////////// The function to CHANGE QUANTITY and send it to the localStorage
function changeQuantity () {
	inputQty = document.querySelectorAll(".itemQuantity"); // All the quantity inputs are targeted
	for (const element of inputQty) {
		element.addEventListener("change", (event) => {
			event.preventDefault();
			let targetedInputProductId = element.closest("article").dataset.id;
			let targetedInputProductColor = element.closest("article").dataset.color;
			let productQtyToChange = cart.find(product => product.id == targetedInputProductId && product.color == targetedInputProductColor)
			productQtyToChange.quantity = Number(element.value); // We replace the quantity of product by the new quantity selected in the localStorage
			localStorage.setItem("cart", JSON.stringify(cart));
			location.reload();// we refresh the page
		});
	}
}


/////////////////////////////// The function to calculate the total QUANTITY and put it in the DOM
function totalQuantityOfProduct () {
	cart.forEach(element => { // We consider each element of the cart and we add its quantity to the global quantity
		quantitySum += element.quantity
	});
	totalQuantity.innerText = quantitySum;
}
totalQuantityOfProduct();


/////////////////////////////// The function to calculate the TOTAL amount of the cart
async function totalToPay () {
	articles = await getArticles(); // the constant "articles" takes all products contained in my data base in an array thanks to the run of the function ""getArticles"
	cart.forEach(element => {
		foundProduct = articles.find(product => product._id === element.id); // We target each product in the API's articles array that fits with the cart items, to take its price
		priceSum += (element.quantity * foundProduct.price); 
	});
	totalPrice.innerText = priceSum;
};
totalToPay();


/////////////////////////////// If the CART is EMPTY, a new message appears
if (cart.length == 0){
	productsOrdered.innerHTML += `<p>Votre panier est vide</p>`;
}




//--------------------------------VALIDATE THE CONTACT DETAILS AND SEND THE ORDER--------------------------------------------

let firstName = document.getElementById("firstName"); // We select the input for the firstname
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg"); // We select the elements where the firstname error message has to appear in case of syntaxe error
let nameMask = /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž∂ð' -]+$/i ;
let lastName = document.getElementById("lastName");
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
let address = document.getElementById("address");
let addressErrorMsg = document.getElementById("addressErrorMsg");
let addressMask = /([0-9]*) ?([a-zA-Z,' ]+)/g;
let city = document.getElementById("city");
let cityErrorMsg = document.getElementById("cityErrorMsg");
let email = document.getElementById("email");
let emailErrorMsg = document.getElementById("emailErrorMsg");
let emailMask = /^[a-zA-Z0-9\.\-_]+[@]{1}[a-zA-Z0-9.-_]+\.+[a-z]{2,10}$/;


/////////////////////////////// FIRSTNAME input configuration
firstName.addEventListener ("change", (e) =>{
	if (nameMask.test(firstName.value) == false) {
		firstNameErrorMsg.innerHTML = "Vous devez obligatoirement renseigner votre prénom sans chiffre ni caractères spéciaux (sauf le trait d'union (-) et l'apostrophe ('))."
	} else {
		firstNameErrorMsg.innerHTML = "";
	};
	contact.prenom = e.target.value;
})

/////////////////////////////// LASTNAME input configuration
lastName.addEventListener ("change", (e) =>{
	if (nameMask.test(lastName.value) == false) {
		lastNameErrorMsg.innerHTML = "Vous devez obligatoirement renseigner votre nom de famille sans chiffre ni caractères spéciaux (sauf le trait d'union (-) et l'apostrophe ('))."
	} else {
		lastNameErrorMsg.innerHTML = "";
	};
	contact.nom = e.target.value;
})

/////////////////////////////// ADRESS input configuration
address.addEventListener ("change", (e) =>{
	if (addressMask.test(address.value) == false) {
		addressErrorMsg.innerHTML = "Vous devez obligatoirement renseigner une adresse comprenant votre nom de rue sans caratères spéciaux (sauf le trait d'union (-), l'apostrophe ('), et la virgule(,))."
	} else {
		addressErrorMsg.innerHTML = "";
	};
	contact.adresse = e.target.value;
})

/////////////////////////////// CITY input configuration
city.addEventListener ("change", (e) =>{
	if (nameMask.test(city.value) == false) {
		cityErrorMsg.innerHTML = "Vous devez obligatoirement renseigner un nom de ville correct sans chiffre ni caractères spéciaux (sauf le trait d'union (-) et l'apostrophe ('))."
	} else {
		cityErrorMsg.innerHTML = "";
	};
	contact.ville = e.target.value;
})
 
/////////////////////////////// EMAIL input configuration
email.addEventListener ("change", (e) =>{
	if (emailMask.test(email.value) == false) {
		emailErrorMsg.innerHTML = "Vous devez obligatoirement renseigner une adresse email correct."
	} else {
		emailErrorMsg.innerHTML = "";
	};
	contact.email = e.target.value;
	console.log(contact)
})

/*function inputCheck () {
	let contactElement = document.querySelectorAll(".cart__order__form__question");
	console.log(contactElement);
	for (const element of contactElement){
		let contactInput = element.children[1];
		console.log(contactInput);
		let contactErrorMsg = element.children[2];
		contactInput.addEventListener("change", () => {
			console.log(contactInput.id);
			console.log(contactInput.value);
			if (contactInput.id == "firstName"||contactInput.id == "lastName"||contactInput.id == "city" && (nameMask.test(contactInput.value) == false)){
				console.log("je veux pas")
				contactErrorMsg.innerHTML = "Erreur de saisie";
				} else if (contactInput.id == "address"|| contactInput.id == "email" && (emailMask.test(contactInput.value) == false)){
					contactErrorMsg.innerHTML = "on est sur la bonne voie"
					} else {
						contactErrorMsg.innerHTML ="";
					};
					
		});
	};
};
inputCheck();*/


