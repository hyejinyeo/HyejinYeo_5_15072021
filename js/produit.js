/* Afficher les données du produit */
(async function() {
    const productId = getProductId()
    const productInfo = await getProductInfo(productId)
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
            let errorMessage = document.getElementById("products__description")
            errorMessage.innerHTML = `
                <div class="text-center">
                    <i class="fas fa-exclamation-triangle products--error"></i>
                    <h2 class="mb-4">Erreur du Serveur</h2>
                    <p class="mb-5">Nous n'avons pas réussi à afficher nos produits.</p>
                </div>
            `
            error()
        })
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
