// FILE FOR THE INDEX PAGE

//Check that the index.html is found in the url in other to execute the main function
let pageUrl = window.location.href.includes("index.html");
console.log(pageUrl);

//Main function of the index page
if (pageUrl) {
	main(); // The function "main" is defined and run at the launch of the page
}

async function main() {
	// the function main runs to display all products of the data base on the index page
	const articles = await getArticles(); // the constant "articles" takes all products contained in my data base in an array thanks to the run of the function ""getArticles"
	for (let product of articles) {
		// this "for" function allows us to display all the data base's products as wanted in the template thanks to the function "displayArticle" defined bellow
		displayArticle(product);
	}
}

// Function to get all my articles in an array
export default async function getArticles() {
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

// Function to display an article in my .items element
function displayArticle(product) {
	// we select the element HTML where products have to appear, and we fullfill all the fields of the product thanks to the selection of the targeted key of the array "articles"
	let section = document.getElementById("items");
	let a = document.createElement("a");
	a.setAttribute("href", "./product.html?id=" + product._id);
	section.appendChild(a);
	let b = document.createElement("article");
	a.appendChild(b);
	b.innerHTML += "<img src=" + product.imageUrl + " alt=" + product.altTxt + ">" + "<h3 class='productName'>" + product.name + "</h3>" + "<p class='productDescription'>" + product.description + "</p>";
}
