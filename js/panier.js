/********************* AFFICHER LE NOMBRE D'ARTICLE(S) DANS LE PANIER - NAV ICONE *********************/

/* Afficher le nombre d'article(s) ajouté(s) au panier */ 
onLoadCartNumbers();



/********************* AFFICHER DES PRODUITS DANS LE PANIER *********************/

/* Accéder au Local Storage et parser la valeur de 'Cart' */
let productInCart = localStorage.getItem('Cart');
productInCart = JSON.parse(productInCart);

/* Déclaration du lieu où les données doivent être insérées*/
let cartTableBody = document.getElementById('cart-tableBody');
let cartTotalPrice = document.getElementById('cart-totalPrice');


displayProductsInCart(); 
displayTotalPrice();


/* Afficher un résumé des produits dans le panier */
function displayProductsInCart() {
    for (let i = 0; i < productInCart.length; i ++) {
        const templateCart = document.getElementById('templateCart')
        const cloneElement = document.importNode(templateCart.content, true)
    
        cloneElement.getElementById("cart__image").src = productInCart[i].image
        cloneElement.getElementById("cart__name").textContent = productInCart[i].name
        cloneElement.getElementById("cart__id").textContent = productInCart[i].id
        cloneElement.getElementById("cart__price").textContent = (productInCart[i].price).toLocaleString("fr-FR", {style:"currency", currency:"EUR"})
        cloneElement.getElementById("cart__option").textContent = productInCart[i].option
        cloneElement.getElementById("cart__quantity").textContent = productInCart[i].quantity
    
        document.getElementById("cart-tableBody").appendChild(cloneElement)
    }
    // Contrôle des boutons dans la colonne "Quantité"
    reduceQuantity();
    increaseQuantity();
    deleteProduct();
}

/* Afficher le prix total */
function displayTotalPrice() {
    let totalPriceInCart = localStorage.getItem('TotalPrice');
    totalPriceInCart = JSON.parse(totalPriceInCart);
    cartTotalPrice.innerHTML = totalPriceInCart.toLocaleString("fr-FR", {style:"currency", currency:"EUR"})
}


// Boutons dans la colonne "Quantité"
/* Réduire la quantité */
function reduceQuantity() {
    let quantityMinus = document.querySelectorAll('#quantityMinus');
    for (let m = 0; m < quantityMinus.length; m++) {
        quantityMinus[m].addEventListener('click', (event) => {
            event.preventDefault();
            let idOfProductToReduce = productInCart[m].id;
            let optionOfProductToReduce = productInCart[m].option;
            const unitPrice = productInCart[m].price;
            
            // Modifier 'Cart'
            // Si (la quantité == 1 ) : Supprimer le produit
            if (productInCart[m].quantity == 1) {
                productInCart = productInCart.filter( (el) => el.id !== idOfProductToReduce || el.option !== optionOfProductToReduce );
                localStorage.setItem('Cart', JSON.stringify(productInCart));
            } 
            // Else (la quantité >= 2) : Réduire 1 de quantité de produit : 'Cart'
            else {
                let product = productInCart.find(
                    (obj) => obj.id === idOfProductToReduce && obj.option === optionOfProductToReduce
                );
                if (product) {
                    product.quantity = product.quantity - 1; 
                } 
                localStorage.setItem('Cart', JSON.stringify(productInCart));
            }
            
            // Modifier 'QuantityInCart'
            let productNumbers = localStorage.getItem('QuantityInCart');
            productNumbers = parseInt(productNumbers); // String -> Number
            localStorage.setItem('QuantityInCart', productNumbers - 1);
            
            // Modifier 'TotalPrice'
            let cartPrice = localStorage.getItem('TotalPrice');
            cartPrice = parseInt(cartPrice);
            localStorage.setItem('TotalPrice', cartPrice - unitPrice);

            // Rechargement de la page
            window.location.reload();
        })
    }
}

/* Augmenter la quantité */
function increaseQuantity() {
    let quantityPlus = document.querySelectorAll('#quantityPlus');
    for (let p = 0; p < quantityPlus.length; p++) {
        quantityPlus[p].addEventListener('click', (event) => {
            event.preventDefault();
            let idOfProductToIncrease = productInCart[p].id;
            let optionOfProductToIncrease = productInCart[p].option;
            const unitPrice = productInCart[p].price;
            
            // Modifier 'Cart'
            let product = productInCart.find(
                (obj) => obj.id === idOfProductToIncrease && obj.option === optionOfProductToIncrease
            );
            if (product) {
                product.quantity = product.quantity + 1; 
            } 
            localStorage.setItem('Cart', JSON.stringify(productInCart));
            
            // Modifier 'QuantityInCart'
            let productNumbers = localStorage.getItem('QuantityInCart');
            productNumbers = parseInt(productNumbers); // String -> Number
            localStorage.setItem('QuantityInCart', productNumbers + 1);
            
            // Modifier 'TotalPrice'
            let cartPrice = localStorage.getItem('TotalPrice');
            cartPrice = parseInt(cartPrice);
            localStorage.setItem('TotalPrice', cartPrice + unitPrice);
            
            // Rechargement de la page
            window.location.reload();
        })
    }
}

/* Supprimer un produit */
function deleteProduct() {
    let quantityDelete = document.querySelectorAll('#quantityDelete');
    for (let d = 0; d < quantityDelete.length; d++) {
        quantityDelete[d].addEventListener('click', (event) => {
            event.preventDefault();
            let idOfProductToDelete = productInCart[d].id;
            let optionOfProductToDelete = productInCart[d].option;
            let quantityOfProductToDelete = productInCart[d].quantity;
            let priceOfProductToDelete = productInCart[d].price;
            
            // Filtrer des items afin de laisser des produits différents uniquement
            productInCart = productInCart.filter( (el) => el.id !== idOfProductToDelete || el.option !== optionOfProductToDelete );
            localStorage.setItem('Cart', JSON.stringify(productInCart));
            
            // Modifier 'QuantityInCart'
            let productNumbers = localStorage.getItem('QuantityInCart');
            productNumbers = parseInt(productNumbers); // String -> Number
            localStorage.setItem('QuantityInCart', productNumbers - quantityOfProductToDelete);
            
            // Modifier 'TotalPrice'
            let cartPrice = localStorage.getItem('TotalPrice');
            cartPrice = parseInt(cartPrice);
            let priceXquantityOfProductToDelete = quantityOfProductToDelete * priceOfProductToDelete;
            localStorage.setItem('TotalPrice', cartPrice - priceXquantityOfProductToDelete);
            
            // Rechargement de la page
            window.location.reload();
        })
    }
}
   


/********************* FORMULAIRE *********************/

/* Afficher un formulaire de commande si le panier n'est pas vide */

let formArea = document.getElementById('order-form');
formArea.hidden = true;

displayOrderForm();
function displayOrderForm() {
    let numberOfItemInCart = localStorage.getItem('QuantityInCart');
    numberOfItemInCart = parseInt(numberOfItemInCart);
    if (numberOfItemInCart >= 1) {
        formArea.hidden = false;
    }
    else {
        formArea.hidden = true;
    }
}


/* Validation des données d'entrée */
// Directement en HTML
// "required" sur tous les champs
// input type = "text" => pattern regEx
// input type = "email"


/* Confirmer la commande */
const orderButton = document.getElementById('formulaire');
orderButton.addEventListener('submit', (event) => {
    event.preventDefault();

    // Créer un objet "contact" 
    let contactInput = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value
    }

    // Créer un array "products" 
    let productId = [];
    for (let i = 0; i < productInCart.length; i++) {
        productId.push(productInCart[i].id);
    }
        
    // Envoyer "contact" et "products" au backend 
    fetch(`http://localhost:3000/api/teddies/order`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: 'cors',
        body: JSON.stringify({
            contact: contactInput,
            products: productId
        })
    })
    .then((response) => response.json())
    .then((data) => {
        localStorage.clear();
        localStorage.setItem('orderId', data.orderId);
    })
    .catch(function(error) {
        showErrorMessage() 
    });
    window.location.href = "./confirmation.html"; 
})      


////////////////////////////////////////////////////// TRIAL ////////////////////////////////////////////////////// 
/*

executeSubmitEvent();

function executeSubmitEvent() {
    const orderButton = document.getElementById('form__orderButton');
    orderButton.addEventListener('submit', (event) => {
        event.preventDefault();

        //Créer un objet "contact" 
        let inputContact = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value
        }

        // Créer un array "products" 
        let inputProducts = [];
        for (let i = 0; i < productInCart.length; i++) {
            inputProducts.push(productInCart[i]);
        }
        
        // Envoyer "contact" et "products" au backend
        sendOrderToServer(inputContact, inputProducts);
    })      
} 


function sendOrderToServer(paramContact, paramProducts) {
    fetch(`http://localhost:3000/api/teddies/order`, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            contact: paramContact,
            products: paramProducts
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        localStorage.setItem('orderId', data.orderId);
    })
    .catch(function(error) {
        showErrorMessage() 
    });
    localStorage.removeItem('QuantityInCart');
    localStorage.removeItem('Cart');
    localStorage.removeItem('TotalPrice');
    document.location.href = "./confirmation.html";
}

*/

////////////////////////////////////////////////////// TRIAL ////////////////////////////////////////////////////// 
/*

// EventListener 'submit' sur le boutton "COMMANDER"
const orderButton = document.getElementById('form__orderButton');
orderButton.addEventListener('submit', (event) => {
    event.preventDefault();

    // Recuperer les données "contact"
    const inputFirstName = document.getElementById('firstName').value;
    const inputLastName = document.getElementById('lastName').value;
    const inputAddress = document.getElementById('address').value;
    const inputCity = document.getElementById('city').value;
    const inputEmail = document.getElementById('email').value;

    // Créer un tableau "products" 
    const products = [];
    for (let i = 0; i < productInCart.length; i++) {
        products.push([productInCart[i].id]);
    }
    
    // Créer un "order" en combinant "contact" et "products"
    const order = {
        contact: {
            firstName: inputFirstName,
            lastName: inputLastName,
            address: inputAddress,
            city: inputCity,
            email: inputEmail
        },
        products: products
    }

    // Envoyer "order" 
    sendOrderToServer();

}) // closure of eventlistener


function sendOrderToServer() {
    fetch(`http://localhost:3000/api/teddies/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'applicatin/json'
        },
        body: JSON.stringify(order)
    })
    .then((response) => response.json())
    .then((afterSendingOrder) => {
        localStorage.clear();
        localStorage.setItem("orderId", afterSendingOrder.orderId);
        document.location.href = "./confirmation.html";
    })
    .catch(function(error) {
        showErrorMessage()
    });
}

*/



/////////////////////////////////////////////////////////////////////////////////////////// REGEX

/* Création d'expressions régulières */
// let regExName = new RegExp(
//     `[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ .'-]*$`
// );
// let regExAddress = new RegExp(
//     `[0-9a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ ,.'-/]*$` 
// );
// let regExCity = new RegExp(
//     `[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ'-]*$`
// );
// let regExEmail = new RegExp(
//     `^([a-zA-Z0-9.-_]+[@]{1}([a-zA-Z0-9].*\.\w{2,4}))$`
// );

/* Validation des données d'entrée */
// function validateInput() {
//     // Recuperer les données d'entrée
//     let formulaire = document.getElementById('formulaire');
//     let inputFirstName = formulaire.firstName;
//     let inputLastName = formulaire.lastName;
//     let inputAddress =formulaire.address;
//     let inputCity = formulaire.city;
//     let inputEmail = formulaire.emaile;
    
//     // Tester les données d'entrée
//     let testFirstName = regExName.test(inputFirstName);
//     let testLastName = regExName.test(inputLastName);
//     let testAddress = regExAddress.test(inputAddress);
//     let testCity = regExCity.test(inputCity);
//     let testEmail = regExEmail.test(inputEmail);

//     if (testFirstName !== true || testLastName  !== true || testAddress !== true || testCity !== true || testEmail !== true) {
//         alert('your incorrect');
//     }
//     else {
//         alert('input correct')
//     };
// } // closure of fuction validateInput