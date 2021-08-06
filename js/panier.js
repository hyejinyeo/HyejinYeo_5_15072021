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
    // Boutons
    reduceQuantity();
    increaseQuantity();
    deleteProduct();
}

function displayTotalPrice() {
    let totalPriceInCart = localStorage.getItem('TotalPrice');
    totalPriceInCart = JSON.parse(totalPriceInCart);
    cartTotalPrice.innerHTML = totalPriceInCart.toLocaleString("fr-FR", {style:"currency", currency:"EUR"})
}





// Buttons inside Quantity 

function reduceQuantity() {
    //let quantityMinus = document.getElementById('quantityMinus');
    //quantityMinus.addEventListener('click', () => {
    //    alert('You clicked on minus button')
    //})
    // if remaining quantity is 1, entire line should be deleted
    // if remaining quantitiy is > 2, return remaining quantity -1


    // let quantityMinus = document.getElementById('quantityMinus');
    // quantityMinus.addEventListener('click', () => {
    //     let product = productInCart.find(
    //         (obj) => obj.id === inputIdenfication && obj.option === inputColor
    //         if (product) {
    //             product.quantity += parseInt(inputQuantity);
    //         } else {}
    //     )
    // });
}

function increaseQuantity() {
    //let quantityPlus = document.getElementById('quantityPlus');
    //quantityPlus.addEventListener('click', () => {
    //    alert('You clicked on plus button')
    //})
    // increase 1 quantity of product on each click
}


function deleteProduct(id, option) {
    //for (let i = 0; i < productInCart.length; i++) {
    //   if (productInCart[i].id === id && productInCart[i].option === option)  {
    //        productInCart.splice(i, 1)
    //    }
    //}
}


//////////////////////// Part I was working on - temporary breakpoint

function deleteProduct() {
    let quantityDelete = document.querySelectorAll('#quantityDelete');
    for (let d = 0; d < quantityDelete.length; d++) {
        quantityDelete[d].addEventListener('click', (event) => {
            event.preventDefault();
            let idOfProductToDelete = productInCart[d].id;
            let optionOfProductToDelete = productInCart[d].option;
            let quantityOfProductToDelete = productInCart[d].quantity;
            let priceOfProductToDelete = productInCart[d].price;
            
            // Filtre des items afin de laisser des produits differents
            productInCart = productInCart.filter( (el) => el.id !== idOfProductToDelete || el.option !== optionOfProductToDelete );
            localStorage.setItem('Cart', JSON.stringify(productInCart));
            
            // Modifier 'QuantityInCart'
            let productNumbers = localStorage.getItem('QuantityInCart');
            productNumbers = parseInt(productNumbers); // String -> Number
            localStorage.setItem('QuantityInCart', productNumbers - quantityOfProductToDelete);
            
            // Modifier 'TotalPrice'
            let cartPrice = localStorage.getItem('TotalPrice');
            cartPrice = parseInt(cartPrice);
            localStorage.setItem('TotalPrice', cartPrice - priceOfProductToDelete);
            
            // Rechargement de la page
            window.location.reload();
        })
    }
}
   


/********************* FORMULAIRE *********************/

//Once "COMMANDER" button is clicked, the number of items in local storage should be reset to 0
//preventDefault for formulaire




