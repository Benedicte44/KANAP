// FILE FOR THE INDEX PAGE

//Main function of the index page

main(); // The function "main" is defined and run at the launch of the page

async function main() {
	// the function main runs to display all products of the data base on the index page
	const articles = await getArticles(); // the constant "articles" takes all products contained in my data base in an array thanks to the run of the function ""getArticles"
	for (product of articles) {
		// this "for" function allows us to display all the data base's products as wanted in the template thanks to the function "displayArticle" defined bellow
		displayArticle(product);
	}
}

// Function to get all my articles in an array
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

// Function to display an article in my .items element
function displayArticle(product) {
	// we select the element HTML where products have to appear, and we fullfill all the fields of the product thanks to the selection of the targeted key of the array "articles"
	document.querySelector(
		".items"
	).innerHTML += `<a href="./product.html?id=${product._id}">
                                                    <article>
                                                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                    <h3 class="productName">${product.name}</h3>
                                                    <p class="productDescription">${product.description}</p>
                                                    </article>
                                                    </a>`;
}
