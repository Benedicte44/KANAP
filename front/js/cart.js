///////////////////////////////THE SCRIPT FOR THE CART PAGE


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



/////////////////////////////// Function to DISPLAY the products' details and make the cart dynamic with DELETE and CHANGE QUANTITY functions
async function articleCartParams() {
	articles = await getArticles(); // the constant "articles" takes all products contained in my data base in an array thanks to the run of the function ""getArticles"

/////////////////////////////// Function to DISPLAY the article's attributes in the cart
	for (let i = 0; i < cart.length; i++) { // We launch a for loop to get each articles with its details at the rigth place
		foundProduct = articles.find(product => product._id === cart[i].id); // We target each product in the API's articles array
		// we select the element HTML where the attributes of the product have to appear, and we fullfill all the fields of the product thanks to the selection of the targeted key of the array "articles"
		productArticle = document.createElement("article")
		productArticle.id = cart[i].id + cart[i].color
		productArticle.className = "cart__item";
		productsOrdered.appendChild(productArticle);
		productArticle.innerHTML = `<div class="cart__item__img">
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
										</div>`
		/*productsOrdered.innerHTML += `<article class="cart__item" id="${cart[i].id}" data-id="${cart[i].id}" data-color="${cart[i].color}">
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
                                                                        </article>`;	*/							
	}
	


/////////////////////////////// The function to DELETE a product and remove it from the localStorage
	deleteBtn = document.querySelectorAll(".deleteItem"); // All the "delete" buttons are targeted
	console.log(deleteBtn)
	for (let j = 0; j < deleteBtn.length ; j++) { // We launch a for loop to take in consideration each button individually
		deleteBtn[j].addEventListener("click", (event) => {
			event.preventDefault();
			let productToCancel = cart.find(product => product.id == cart[j].id && product.color == cart[j].color);
			cart = cart.filter(p => p != productToCancel); // We keep in the localStorage the products which have a different id from the targeted product
			localStorage.setItem("cart", JSON.stringify(cart));
			location.reload(); // we refresh the page
		});
	}

/////////////////////////////// The function to CHANGE QUANTITY and send it to the localStorage
	inputQty = document.querySelectorAll(".itemQuantity"); // All the quantity inputs are targeted
	for (let k = 0; k < inputQty.length ; k++) {
		inputQty[k].addEventListener("change", (event) => {
			event.preventDefault();
			cart[k].quantity = Number(inputQty[k].value) // We replace the quantity of product by the new quantity selected in the localStorage
			localStorage.setItem("cart", JSON.stringify(cart));
			location.reload();// we refresh the page
		});
	}
}
articleCartParams();


/////////////////////////////// The function to calculate the total QUANTITY and put it in the DOM
function totalQuantityOfProduct () {
	cart.forEach(element => { // We consider each element of the cart and we add its quantity to the global quantity
		quantitySum += element.quantity
	});
	totalQuantity.innerText = quantitySum;
}
totalQuantityOfProduct();

deleteBtn = document.querySelectorAll(".deleteItem"); // All the "delete" buttons are targeted

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
