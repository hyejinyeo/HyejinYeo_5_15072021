/********************* Afficher un orderId (référence de la commande) *********************/

function displayOrderId() {
    let orderId = document.getElementById('orderid')
    let receivedOrderId = localStorage.getItem('orderId');
    orderId.innerText = receivedOrderId;
}

