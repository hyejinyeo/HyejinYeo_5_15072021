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
    const productId = getProductId();
    const productInfo = await getProductInfo(productId);
    changeBreadcrumb(productInfo);
    insertProductInfo(productInfo);
})();

/* Obtenir l'ID du produit de l'URL*/
function getProductId() {
    return new URL(document.location).searchParams.get('id');
};

/* Appeler les données par ID de l'API du serveur  */
function getProductInfo(productId) {
    return fetch(`http://localhost:3000/api/teddies/${productId}`)
        .then((responseHttp) => responseHttp.json())
        .catch(function(error) {
            showErrorMessage()
        });
};

/* Modifier le breadcrumb - Nom d'ourson */
function changeBreadcrumb(productInfo) {
    document.getElementById('breadcrumb-name').textContent = `OURSON :  ` + productInfo.name;
};

/* Insérer les données */
function insertProductInfo(productInfo) {
    productImage.src = productInfo.imageUrl;
    productName.textContent = productInfo.name;
    productIdentification.textContent = `Réf :  ` + productInfo._id;
    productDescription.textContent = productInfo.description;
    productPrice.textContent = (productInfo.price / 100).toLocaleString("fr-FR", {style:"currency", currency:"EUR"});
    for (let i = 0; i < productInfo.colors.length; i++) {
        let option = document.createElement("option");
        option.innerText = productInfo.colors[i];
        productOption.appendChild(option);
    };
};



/********************* AFFICHER LE NOMBRE D'ARTICLE(S) DANS LE PANIER - NAV ICONE *********************/

/* Afficher le nombre d'article(s) ajouté(s) au panier */ 
onLoadCartNumbers();


/********************* AJOUTER L'ARTICLE CHOISI AU PANIER *********************/

/* Gestion du Local Storage */
let productInCart = localStorage.getItem('Cart')
// Si 'Cart' est vide, créer un array 
if (productInCart === null) {
    productInCart = [];
} 
// Si 'Cart' n'est pas vide, parser JSON 
else {
    productInCart = JSON.parse(productInCart);
}

/* Ajouter au Panier */
let cartButton = document.querySelector('.card__button');
cartButton.addEventListener('click', () => {
    modifyCartNumbers(); // Local Storage - QuantityInCart
    addToCart(); // Local Storage - Cart
    addUpTotalPrice(); // Local Storage - TotalPrice
})

/* Augmenter le nombre de 'QuantityInCart' du Local Storage en fonction de 'quantityInput' et afficher la valeur finale sur l'icône de Nav */
function modifyCartNumbers() {
    let productNumbers = localStorage.getItem('QuantityInCart');
    productNumbers = parseInt(productNumbers); // String -> Number
    let quantityInput = document.getElementById('description__quantity').value;
    quantityInput = parseInt(quantityInput); // String -> Number
    if (productNumbers) {
        localStorage.setItem('QuantityInCart', productNumbers + quantityInput);
    } else {
        localStorage.setItem('QuantityInCart', quantityInput);   
    }
}

/* Mettre à jour la saisie du client dans le 'Cart' du Local Storage */
function addToCart() {
    let inputQuantity = productQuantity.value;
    inputQuantity = parseInt(inputQuantity)
    let inputColor = productOption.value;
    let inputIdenfication = getProductId();
    let product = productInCart.find(
        (obj) => obj.id === inputIdenfication && obj.option === inputColor
    );
    // Cas 1: Le même produit de même option déjà dans le panier - Incrementer la quantité   
    if (product) {
        product.quantity += parseInt(inputQuantity);
    } 
    // Cas 2: Le même produit mais option différente - Ajouter un nouveau array
    // Cas 3: Produit complétement différent - Ajouter un nouveau array
    else {
        productInCart.push({
            image: productImage.src,
            id: inputIdenfication,
            name: productName.textContent,
            option: inputColor,
            quantity: parseInt(inputQuantity),
            price: parseFloat(productPrice.textContent)
        });
    }
    alert('Votre ourson a bien été ajouté au panier !');
    localStorage.setItem('Cart', JSON.stringify(productInCart));
    window.location.reload();
}

/* Calculer le prix total - 'TotalPrice' du Local Storage */
function addUpTotalPrice() {
    let cartPrice = localStorage.getItem('TotalPrice');
    let inputQuantity = productQuantity.value;
    inputQuantity = parseInt(inputQuantity);
    let inputPriceXQuantity = (parseFloat(productPrice.textContent) * inputQuantity);
    if (cartPrice !== null) {
        cartPrice = parseInt(cartPrice);
        localStorage.setItem('TotalPrice', cartPrice + inputPriceXQuantity);
    } else {
        localStorage.setItem('TotalPrice', inputPriceXQuantity);
    }
}