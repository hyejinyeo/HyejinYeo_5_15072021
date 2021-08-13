/********************* Afficher un orderId (référence de la commande) *********************/
let receivedOrderId = localStorage.getItem('orderId');

displayOrderId();
function displayOrderId() {
    document.getElementById('orderid').innerText = receivedOrderId;
}

/********************* Vider local storage *********************/
localStorage.clear();