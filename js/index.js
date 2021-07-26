/* Déclaration d'URL */
const URL = "http://localhost:3000/api/teddies";

/* Récupération des données - Cours*/
fetch(url)
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then(function(value) {
        console.log(value);
    })
    .catch(function(err) {
        // Une erreur est survenue
    });


//Use 'Modulo' for an additional card when the number of item is odd. 
//let emptyCardCreator = numberOfItem % 2 ;
//if emptyCardCreator = 1; Create empty card ;


const evenOddCalculate = (itemCount) => {
    let cardCreator = (itemCount % 2);
    if (cardCreator == 1) {
        console.log('Create a card');
    }
};
evenOddCalculate(5);



/*
    Automatic creation of product cards depending on the number of items from data base;
    (Number of product in the data base = number of product card on this page.)
    1. Receive data : Number of products 
    2. Create product cards using "innerHTML" of JS
    3. Each card should contain: image of product, name, description, price
    <script>
        Call of Products API - GET
        Terms
        function nameOfFuction(Parameter) {
            return Parameter;
        }
        alert(nameOfFuction(Argument));
        function createProductCard() {
            i = 0;
            let numberOfProducts = nameOfArray.length
            while (i < numberOfProducts) {
                innerHTML ;
                i += 1;
            }
        }
        createProductCard();


          <!-- <div class="card col-lg-6 shadow p-2 m-0">
                    <a href="pages/produit.html">
                        <img class="card-img-top" src="images/Logo_Orinoco.webp" alt="">
                        <div class="card-body">                        
                            <h3 class="card-title">Ourson 1</h3>
                            <p class="card-text">Detail of product</p>
                        </div>
                    </a>

                    <button type="button" class="btn btn-primary">Add to cart</button>
                </div>
                <br><br> -->
    </script>

   
    4. Click on the card : 
    <script>
        let productLink = document.querySelector(#productLink);
        console.log(productLink.getAttribute('href'));
        productLink.setAttribute('href', 'http://produit.html/idOfProduct);

    </script>
        
*/
