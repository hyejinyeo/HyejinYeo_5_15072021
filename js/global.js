/* Afficher une message d'errueur du serveur */
function showErrorMessage () {
    let errorMessage = document.querySelector('.errorMessage')
    errorMessage.innerHTML = `
                <div class="text-center">
                    <i class="fas fa-exclamation-triangle products--error"></i>
                    <h2 class="mb-4">Erreur du Serveur</h2>
                    <p class="mb-5">Nous n'avons pas réussi à afficher nos produits.</p>
                </div>
            `
}



/* Afficher le nombre d'article ajouté au panier - nav icone */
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('QuantityInCart')
    if (productNumbers) {
        document.querySelector('.nav-link span').textContent = productNumbers
    }
}
