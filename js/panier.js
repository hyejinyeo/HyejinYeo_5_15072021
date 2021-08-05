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
                <span class="small">${productInCart[i].id}</span></td>
            <td>${productInCart[i].price.toLocaleString("fr-FR", {style:"currency", currency:"EUR"})}</td>
            <td>${productInCart[i].option}</td>
            <td>
                <i class="far fa-minus-square"></i>
                <span>${productInCart[i].quantity}</span>
                <i class="far fa-plus-square"></i>
                <i class="far fa-trash-alt" id="delete"></i>
            </td>    
        </tr>
        `
    }  
}

function displayTotalPrice() {
    let totalPriceInCart = localStorage.getItem('TotalPrice');
    totalPriceInCart = JSON.parse(totalPriceInCart);
    cartTotalPrice.innerHTML = totalPriceInCart.toLocaleString("fr-FR", {style:"currency", currency:"EUR"})
}


// let deleteProduct = document.getElementById('delete');

// deleteProduct.forEach( function(deleteProduct) {
//     deleteProduct.addEventListener('click', function() {
//         const dataset = this.dataset;
//         const 
//     })
// });



/* 
let removeCartItemButtons = document.getElementById('delete')
for (let i=0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i]
    button.addEventListener('click', function(event)) {
        let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    }
}

function updateCartTotal() {

}

*/



/********************* FORMULAIRE *********************/

//Once "COMMANDER" button is clicked, the number of items in local storage should be reset to 0
//preventDefault for formulaire




