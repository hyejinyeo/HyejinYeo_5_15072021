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
        cartTableBody.innerHTML += `
            <tr class="align-middle">
                <td>
                    <img class="img-fluide cart-img" src="${productInCart[i].image}">
                </td>
                <td>
                    <span class="h6">${productInCart[i].name}</span><br>
                    <span class="small" id="product-id">${productInCart[i].id}</span></td>
                <td>${productInCart[i].price.toLocaleString("fr-FR", {style:"currency", currency:"EUR"})}</td>
                <td id="product-option">${productInCart[i].option}</td>
                <td>
                    <i class="far fa-minus-square" id="quantityMinus"></i>
                    <span>${productInCart[i].quantity}</span>
                    <i class="far fa-plus-square" id="quantityPlus"></i>&nbsp
                    <i class="far fa-trash-alt" id="quantityDelete"></i>
                </td>    
            </tr>
        `
    }
    // Contrôle des boutons dans la colonne "Quantité"
    reduceQuantity();
    increaseQuantity();
    deleteProduct();
}

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

/* Afficher une formulaire de commande si le panier n'est pas vide */
let numberOfItemInCart = localStorage.getItem('QuantityInCart');
numberOfItemInCart = parseInt(numberOfItemInCart);
let formArea = document.getElementById('order-form');
if (numberOfItemInCart >= 1) {
    formArea.innerHTML += `
        <h3 class="mb-4">FORMULAIRE DE COMMANDE</h3>
        <form id="formulaire" method="POST">
            <div class="form-group pb-2">
                <label for="firstName" class="form-label h6">Prénom</label>
                <input 
                    type="text" class="form-control" id="firstName" name="firstName" required
                    autocomplete="off" placeholder="ex) Norbert" 
                    minlength="1" maxlength="30"
                    pattern="[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ .'-]*"
                    title="Prénom peut contenir les caractères alphabétiques qui sont utilisés dans la langue française et [ ] [.] ['] [-]."
                />
            </div>
            <div class="form-group pb-2">
                <label for="lastName" class="form-label h6">Nom de famille</label>
                <input 
                    type="text" class="form-control" id="lastName" name="lastName"required
                    autocomplete="off" placeholder="ex) Ourson d'Orinoco" 
                    minlength="1" maxlength="30"
                    pattern="[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ .'-]*"
                    title="Nom de famille peut contenir les caractères alphabétiques qui sont utilisés dans la langue française et [ ] [.] ['] [-]."
                />
            </div>
            <div class="form-group pb-2">
                <label for="address" class="form-label h6">Adresse</label>
                <input 
                    type="text" class="form-control" id="address" name="address" required
                    autocomplete="off" placeholder="ex) 123 rue Orinoco"
                    minlength="1" maxlength="100"
                    pattern="[0-9a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ ,.'-/]*"
                />
            </div>
            <div class="form-group pb-2">
                <label for="city" class="form-label h6">Ville</label>
                <input 
                    type="text" class="form-control" id="city" name="city" required
                    autocomplete="off" placeholder="ex) Orinoco" 
                    minlength="1" maxlength="50"
                    pattern="[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ]{1,}[a-zàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ'-]*"
                    title="Nom de ville peut contenir les caractères alphabétiques qui sont utilisés dans la langue française et ['] [-]."
                />
            </div>
            <div class="form-group pb-2">
                <label for="email" class="form-label h6">E-mail</label>
                <input 
                    type="email" class="form-control" id="email" name="email" required
                    autocomplete="off" placeholder="ex) norbert@orinoco.com"   
                />
                <!-- pattern="^([a-zA-Z0-9.-_]+[@]{1}([a-zA-Z0-9].*\.\w{2,4}))$" -->
            </div>
            <div class="panier__button">
                <button type="submit" class="btn btn-primary" id="form__orderButton">COMMANDER</button>
            </div>
        </form>
    `
}
// consider using HTMLElement.hidden = true | false; 
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden


// Validation de saisie 
// --- input type in HTML, pattern regEx, required


// Once "COMMANDER" button is clicked
// --- the number of items in local storage should be reset to 0 (localStorage.clear)
// --- the customer should be sent to confirmation.html page.
// --- the confirmation page will have to display orderId received from server


/* Confirmer la commande */
const orderButton = document.getElementById('form__orderButton');
orderButton.addEventListener('submit', (event) => {
    event.preventDefault();

    // Recuperer les données d'entrée
    let formulaire = document.getElementById('formulaire');
    let inputFirstName = formulaire.firstName;
    let inputLastName = formulaire.lastName;
    let inputAddress =formulaire.address;
    let inputCity = formulaire.city;
    let inputEmail = formulaire.emaile;

    console.log(inputFirstName)

    // Créer un object "contact" 
    const contact = {
        firstName: inputFirstName,
        lastName: inputLastName,
        address: inputAddress,
        city: inputCity,
        email: inputEmail
    }

    // Créer un tableau "products" 
    const products = [];
    products.push(productInCart);

    // Envoyer "contact" & "products" 
    sendOrderToServer(contact, products);

}) // closure of eventlistener


function sendOrderToServer(paramContact, paramProducts) {
    fetch(`http://localhost:3000/api/teddies/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'applicatin/json'
        },
        body: JSON.stringify({
            contact: paramContact, 
            products: paramProducts})
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






///////////////////////////////////////////////////////////////////////////////////////////

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



