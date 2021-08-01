/* Afficher les données du produit */
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

/* Modifier breadcrumb - Nom d'ourson */
function changeBreadcrumb(productInfo) {
    document.getElementById('breadcrumb-name').textContent = `OURSON :  ` + productInfo.name
}

/* Insérer les données */
function insertProductInfo(productInfo) {
    document.getElementById('description__image').src = productInfo.imageUrl
    document.getElementById('description__name').textContent = productInfo.name
    document.getElementById('description__id').textContent = `Réf :  ` + productInfo._id
    document.getElementById('description__description').textContent = productInfo.description
    document.getElementById('description__price').textContent = (productInfo.price / 100).toLocaleString("fr-FR", {style:"currency", currency:"EUR"})
    let colorOption = document.getElementById('description__option')
    for (let i = 0; i < productInfo.colors.length; i++) {
        let option = document.createElement("option");
        option.innerText = productInfo.colors[i];
        colorOption.appendChild(option);
    }
}

/* Ajouter au Panier */
