// The script for the cart page

// Definition of variables

let productPrice = document.getElementById("price"); // The price of our product
let cart = ""; // The cart which is in our local Storage
let articles = []; // We define a variable for the array that will take all the API's products

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

// Function to display the article's attributes
function displayArticle() {
	let productOrdered = document.getElementById("cart__items");
	console.log(cart);
	for (let i = 0; i < cart.length; i++) {
		console.log(cart.length);
		// we select the element HTML where the attributes of the product have to appear, and we fullfill all the fields of the product thanks to the selection of the targeted key of the array "articles"
		productOrdered.innerHTML += `<article class="cart__item" data-id="${cart[i].id}" ( data-color="${cart[i].color}">
                                                          <div class="cart__item__img">
                                                                    <img src="${cart[i].srcImg}" alt="${cart[i].altTxt}">
                                                                </div>
                                                                <div class="cart__item__content">
                                                                <div class="cart__item__content__description">
                                                                    <h2>${cart[i].name}</h2>
                                                                    <p>${cart[i].color}</p>
                                                                    <p>42 €</p> // aller chercher la valeur dans l'API
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

// Function to get all the API's articles in an array
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
