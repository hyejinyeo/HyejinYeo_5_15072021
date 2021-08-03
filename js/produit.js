/********************* GLOBAL SCOPE *********************/
const productImage = document.getElementById('description__image');
const productName = document.getElementById('description__name');
const productIdentification = document.getElementById('description__id');
const productDescription = document.getElementById('description__description');
const productPrice = document.getElementById('description__price');
const productOption = document.getElementById('description__option');
const productQuantity = document.getElementById('description__quantity');



/********************* AFFICHER LES DONNEES D'UN PRODUIT CHOISI *********************/

/* Afficher les données d'un produit */
(async function() {
    const productId = getProductId()
    const productInfo = await getProductInfo(productId)
    changeBreadcrumb(productInfo)
    insertProductInfo(productInfo)
})()

/* Obtenir l'ID du produit de l'URL*/
function getProductId() {
    return new URL(document.location).searchParams.get('id')
}

/* Appeler les données par ID de l'API du serveur  */
function getProductInfo(productId) {
    return fetch(`http://localhost:3000/api/teddies/${productId}`)
        .then((responseHttp) => responseHttp.json())
        .catch(function(error) {
            showErrorMessage()
        })
}

/* Modifier le breadcrumb - Nom d'ourson */
function changeBreadcrumb(productInfo) {
    document.getElementById('breadcrumb-name').textContent = `OURSON :  ` + productInfo.name
}

/* Insérer les données */
function insertProductInfo(productInfo) {
    productImage.src = productInfo.imageUrl
    productName.textContent = productInfo.name
    productIdentification.textContent = `Réf :  ` + productInfo._id
    productDescription.textContent = productInfo.description
    productPrice.textContent = (productInfo.price / 100).toLocaleString("fr-FR", {style:"currency", currency:"EUR"})
    for (let i = 0; i < productInfo.colors.length; i++) {
        let option = document.createElement("option");
        option.innerText = productInfo.colors[i];
        productOption.appendChild(option);
    }
}



/********************* INCREMENTER LE NOMBRE D'ARTICLE DANS LE PANIER - NAV ICONE *********************/
//Number of article
//function itself to be in global.js



/********************* AJOUTER AU PANIER *********************/


/* Ajouter au Panier */
let cart = document.querySelector(".card__button")
cart.addEventListener('click', () => {
    modifyCartNumbers()
    //addToCart()
})

/* Afficher le nombre d'article ajouté dans le panier */
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('modifyCartNumbers')
    if (productNumbers) {
        document.querySelector('.nav-link span').textContent = productNumbers
    }
}

/* Increment + 1 local storage au chaque clique sur le bouton "AJOUTER AU PANIER" */
function modifyCartNumbers() {
    let productNumbers = localStorage.getItem('modifyCartNumbers')
    productNumbers = parseInt(productNumbers) // String -> Number
    if (productNumbers) {
        localStorage.setItem('modifyCartNumbers', productNumbers + 1)
        document.querySelector('.nav-link span').textContent = productNumbers + 1
    } else {
        localStorage.setItem('modifyCartNumbers', 1)
        document.querySelector('.nav-link span').textContent = 1
    }
    
}

onLoadCartNumbers()


//03/08 Trial
//Create an object 

/*
// function addToCart() {
//     let id = getProductId();
//     let productAdded = {
//         name: productName.innerHTML,
//         _id: id,
//         price: parseFloat(productPrice.innerHTML),
//         option: parseFloat(productOption.),
//         quantity: parseFloat(product),
//     };
// }

function addToLocalStorage() {
    let arrayProductInCart = [];

}

*/