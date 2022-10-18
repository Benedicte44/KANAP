// Script for the product page
import getArticles from "./script.js";

// Definition of variables
let searchParams = new URLSearchParams(window.location.search); // We collect our url elements
let productId = " "; // The variable "productID" refers to the product's ID found in the URL
// We collecte the product ID which appears in the URL
if (searchParams.has("id")) {
	productId = searchParams.get("id");
}
let articles = []; // We define a variable for the array that will take all our products
let pageTitle = document.querySelector("title"); // The title of our web page
let productImage = document.querySelector(".item__img"); // The image of our product
let productName = document.getElementById("title"); // The name of our product
let productPrice = document.getElementById("price"); // The price of our product
let productDescription = document.getElementById("description"); // Our product's description
let productColors = ""; // Our product's colors possibilities
let color = ""; // The product's color visitor choice value
let inputColors = document.getElementById("colors"); // The html element where the visitor choose the product's color
let productQuantity = document.getElementById("quantity"); // The quantity of products, the visitor wants to put in his cart
let productToAdd = {
	// We define the object productToAdd with all details on the product to send to localstorage
	id: productId,
	name: "",
	quantity: "0",
	srcImg: "",
	altTxt: "",
	color: "",
};
let cart = ""; // The cart which is in our local Storage
let addToCartBtn = document.getElementById("addToCart"); // The button, to add products in the cart



// Main function of the product page
main(); // The function "main" is defined and run at the launch of the page

async function main() {
	// the function main runs to display the product's attributes from the data base on the product page
	articles = await getArticles(); // the variable "articles" takes all products contained in my data base in an array thanks to the run of the function ""getArticles"
	articles.find((object) => {
		// The "find" function runs to find in the articles array, the product targeted thanks to its ID
		if (object._id == productId) {
			displayArticle(object); // The displayArticles function runs to display the details of the targeted product at the right place
		}
	});
}



// Function to get all my articles in an array
/*async function getArticles() {
	return fetch("http://localhost:3000/api/products") // we call the API
		.then(function (httpBodyResponse) {
			if (httpBodyResponse.ok) {
				// if we have content we return a json file with all the data of the data base
				return httpBodyResponse.json(); //
			}
		})
		.then(async function (articles) {
			// we return an array in the variable "articles" with all the products of the data base
			return articles;
		})
		.catch(function (error) {
			// if the connection to the API doesn't work we will have an error message in a pop up
			alert(error);
		});
}*/



// Function to display the article's attributes
function displayArticle(object) {
	// we select the element HTML where the attributes of the product have to appear, and we fullfill all the fields of the product thanks to the selection of the targeted key of the array "articles"
	pageTitle.innerHTML += ` : ${object.name}`; //the name of the product to appear on the page title
	productImage.innerHTML += `<img src="${object.imageUrl}" alt="${object.altTxt}">`; // the product's image with its alternative text
	productName.innerHTML += object.name; // the product's name in the title of the product's description
	productPrice.innerHTML += object.price; // the price
	productDescription.innerHTML += `${object.description}`; // the description
	productColors = object.colors; // This data is an array that contains the product's colors
	productColors.forEach((element) => {
		// We define a forEach loop that creates a new color option for each color of the array productColor
		color = document.createElement("option"); // Creation of a new div <option> where the product's color choice appears
		color.value = element; // We add the color's attribute
		color.innerText = element; // New content for these options
		inputColors.appendChild(color); // Focus on the DOM's element where those options have to appear and addition of the options
	});
	// we register our productToAdd's data
	productToAdd.name = object.name;
	productToAdd.srcImg = object.imageUrl;
	productToAdd.altTxt = object.altTxt;
}



// We define an event listener on the quantity input to get the product's quantity to add in our object productToAdd
productQuantity.addEventListener("change", (event) => {
	productToAdd.quantity = parseInt(event.target.value);
});



// We define an event listener on the color input to get the product's color choice in our object productToAdd
inputColors.addEventListener("input", (event) => {
	productToAdd.color = event.target.value;
});



// WE DEFINE THE ADD TO CART BTN
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

function addToCart() {
	// The addToCart function runs to save the product our visitor wants to put in his cart, in the localStorage
	let foundProduct;
	if (cart.length != 0) {
		foundProduct = cart.find(
			(object) => object.id == productId && object.color == productToAdd.color
		); // We check if the products of the same color is ever in our cart
	}
	if (foundProduct != null) {
		// If the same product is already in the cart
		foundProduct.quantity += productToAdd.quantity; // We add the quantity selected by our visitor at the quantity of the same product which is ever registered in the cart of the localStorage
	} else {
		cart.push(productToAdd); // We add the new product to the cart in the local storage if there is no similar product in the cart
	}
	localStorage.setItem("cart", JSON.stringify(cart)); // We save the new cart in the local storage
}

addToCartBtn.addEventListener("click", function () {
	// We define an event listener on the click on the button "Ajouter au panier"
	if (productToAdd.quantity <= 0 || productToAdd.quantity > 100) {
		// if the quantity selected by our visitor is < or = to 0 or > to 100
		alert("La quantité que vous avez saisie n'est pas valide."); // a pop up appears with a message
	} else if (productToAdd.color == "") {
		// otherwise, if there is no selected color
		alert("Vous devez préciser votre choix de couleur."); // a pop up appears with a message
	} else {
		// if a valide quantity and a color is selected, we add the product to the cart on the local storage
		getCart();
		addToCart();
		alert("Cet article a bien été ajouté à votre panier.")
	}
});
