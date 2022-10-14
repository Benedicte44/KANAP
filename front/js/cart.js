///////////////////////////////THE SCRIPT FOR THE CART PAGE


/////////////////////////////// Definition of variables
let cart = ""; // The cart which is in our local Storage
let articles = []; // We define a variable for the array that will take all the API's products
let productsOrdered = document.getElementById("cart__items"); // We target the HTML element that contains the cart products' details.
let descriptionArea = ""; 
let priceArea = "";
let foundProduct = "";
let newProductQuantity = 0;
let productToChange = {
	// We define the object productToChange with all details on the product to send to localstorage
	id: "",
	name: "",
	quantity: "0",
	srcImg: "",
	altTxt: "",
	color: "",
};
let quantitySum = 0;
let totalQuantity = document.getElementById("totalQuantity");
let priceSum = 0;
let totalPrice = document.getElementById("totalPrice");
let deleteBtn = document.querySelectorAll(".deleteItem");
let inputQty = "";


/////////////////////////////// Function to get all the API's articles in an array
async function getArticles() {
	return fetch("http://localhost:3000/api/products") // we call the API
		.then(function (httpBodyResponse) {
			if (httpBodyResponse.ok) {
				// if we have content we return a json file with all the data of the data base
				return httpBodyResponse.json(); //
			}
		})
		.then(async function (articles) {
			// we return an array in the constant "articles" with all the products of the data base
			return articles;
		})
		.catch(function (error) {
			// if the connection to the API doesn't work we will have an error message in a pop up
			alert(error);
		});
}

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

/////////////////////////////// Function to display the article's attributes in the cart
async function displayArticle() {
	articles = await getArticles(); // the constant "articles" takes all products contained in my data base in an array thanks to the run of the function ""getArticles"
	for (let i = 0; i < cart.length; i++) { // We launch a for loop to get each articles with its details at the rigth place
		foundProduct = articles.find(product => product._id === cart[i].id); // We target each product in the API's articles array
		// we select the element HTML where the attributes of the product have to appear, and we fullfill all the fields of the product thanks to the selection of the targeted key of the array "articles"
		productsOrdered.innerHTML += `<article class="cart__item" id="itération${[i]}${cart[i].id}" data-id="${cart[i].id}" ( data-color="${cart[i].color}">
                                                          <div class="cart__item__img">
                                                                    <img src="${cart[i].srcImg}" alt="${cart[i].altTxt}">
                                                                </div>
                                                                <div class="cart__item__content">
                                                                <div class="cart__item__content__description">
                                                                    <h2>${cart[i].name}</h2>
                                                                    <p>${cart[i].color}</p>
                                                                    <p>${foundProduct.price} €</p>
                                                                </div>
                                                                <div class="cart__item__content__settings">
                                                                    <div class="cart__item__content__settings__quantity">
                                                                    <p>Qté : </p>
                                                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
                                                                    </div> 
                                                                    <div class="cart__item__content__settings__delete">
                                                                                <p class="deleteItem">Supprimer</p>
                                                                                </div>
                                                                            </div>
                                                                            </div>
                                                                        </article>`;
	}
}
displayArticle();

/////////////////////////////// The function to calculate the total quantity
function totalQuantityOfProduct () {
	cart.forEach(element => {
		quantitySum += element.quantity
	});
	totalQuantity.innerText = quantitySum;
}
totalQuantityOfProduct();

/////////////////////////////// The function to calculate the total amount of the cart
async function totalToPay () {
	articles = await getArticles(); // the constant "articles" takes all products contained in my data base in an array thanks to the run of the function ""getArticles"
	cart.forEach(element => {
		foundProduct = articles.find(product => product._id === element.id); // We target each product in the API's articles array
		priceSum += (element.quantity * foundProduct.price)
	});
	totalPrice.innerText = priceSum;
};
totalToPay();

/////////////////////////////// The function to delete a product and remove it form the localStorage
function deleteProduct () {
	cart.forEach(element => {
		console.log(deleteBtn);
	deleteBtn.addEventListener("click", () => {
			alert("produit supprimé")
		})
	})
}
deleteProduct();

/////////////////////////////// The function to register the quantities changes 
inputQty = document.querySelectorAll(".itemQuantity");
		console.log(typeof inputQty.value);
		inputQty.addEventListener('change', () => {
			console.log("on démarre")
			/*for (let i=0 ; i < cart.length; i++) {*/
				let newTargetQuantity = parseInt(inputQty.value);
				let productQuantityToChange = cart.find(
					(object) => object.id == cart[i].id && object.color == cart[i].color
				); // We check if the products of the same color is ever in our cart
				productQuantityToChange.quantity = newTargetQuantity;
			/*}*/
		});
// If the visitor change the quantity of product he wants to order, we send the new quantity on the local storage

/*inputQty = document.getElementByName("itemQuantity"); // We target the inputs where the quantity of product can be changed.;*/

/*
cart[i].quantity = inputQty.addEventListener("change", () => {
							let newTargetQuantity = parseInt(inputQty[i].value);
							let productQuantityToChange = cart.find(
								(object) => object.id == cart[i].id && object.color == cart[i].color
							); // We target the good product in our cart
						productQuantityToChange.quantity = newTargetQuantity;
						});*/
/*console.log(typeof inputQty)
function newQuantity(){
	console.log("on démarre")
	console.log("on y va");
	for (let i=0 ; i < cart.length; i++) {
		inputQty[i].addEventListener('change', () => {
			let newTargetQuantity = parseInt(inputQty[i].value);
			let productQuantityToChange = cart.find(
					(object) => object.id == cart[i].id && object.color == cart[i].color
			); // We check if the products of the same color is ever in our cart
		productQuantityToChange.quantity = newTargetQuantity;
		})
	};
};


newQuantity();*/
