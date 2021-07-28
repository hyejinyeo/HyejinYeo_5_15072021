/* Afficher les produits */
(async function() {
    const products = await getProducts()
    for (product of products) {
        createCards(product)
    }
})()

/* Appeler les données de l'API du serveur */
function getProducts() {
    const URL = "http://localhost:3000/api/teddies"
    return fetch(URL)
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(products) {
            return products
        })
        .catch(function(error) {
            console.log(error)
        })
}

/* Créer des cartes produits */
function createCards(product) {
    const templateElement = document.getElementById("templateProducts")
    const cloneElement = document.importNode(templateElement.content, true)
    
    cloneElement.getElementById("card__image").src = product.imageUrl
    cloneElement.getElementById("card__name").textContent = product.name
    cloneElement.getElementById("card__price").textContent = product.price / 100 + (` €`)
    cloneElement.getElementById("card__link").href = "pages/produit.html?id=" + product._id
    
    document.getElementById("cards").appendChild(cloneElement)
}


/* Créer une carte supplementaire */

//Use 'Modulo' for an additional card when the number of item is odd. 
//let emptyCardCreator = numberOfItem % 2 ;
//if emptyCardCreator = 1; Create empty card ;


// const evenOddCalculate = (itemCount) => {
//     let cardCreator = (itemCount % 2);
//     if (cardCreator == 1) {
//         console.log('Create a card');
//     }
// };
// evenOddCalculate(5);

