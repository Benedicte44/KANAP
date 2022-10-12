// The script for the cart page

// Definition of variables

let cart = ""; // The cart which is in our local Storage
let articles = []; // We define a variable for the array that will take all the API's products
let descriptionArea = ""; // We define
let priceArea = "";
let foundProduct = "";


// The function getCart is defined to get the cart which is in the localStorage
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

// Function to display the article's attributes in the cart
async function displayArticle() {
	let productsOrdered = document.getElementById("cart__items"); // We target the HTML element that contains the cart products' details.
	articles = await getArticles(); // the constant "articles" takes all products contained in my data base in an array thanks to the run of the function ""getArticles"
	for (let i = 0; i < cart.length; i++) { // We launch a for loop to get each articles with its details at the rigth place
		foundProduct = articles.find(product => product._id === cart[i].id); // We target each product in the API's articles array
		// we select the element HTML where the attributes of the product have to appear, and we fullfill all the fields of the product thanks to the selection of the targeted key of the array "articles"
		productsOrdered.innerHTML += `<article class="cart__item" data-id="${cart[i].id}" ( data-color="${cart[i].color}">
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

