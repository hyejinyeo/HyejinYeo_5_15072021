/* Déclaration d'URL */
const url = "http://localhost:3000/api/teddies";

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
  

/*
    Automatic creation of product cards depending on the number of items from data base;
    (Number of product in the data base = number of product card on this page.)
    1. Receive data : Number of products 
    2. Create product cards using "innerHTML" of JS
    3. Each card should contain: image of product, name, description, price
    4. Click on the card 
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
*/


/* What I've done since last session

1. Followed the course on Bootstrap 
    I applied what I've learnt to P5. In order to personalize the style, I added my own 'style.css' to override. 

2. Initiation of project -> Problem
    I first created 'index.html' and launched SASS to set a basic structure. 
    Then I tried to copy and paste the files from the folder clonned from git - backend. 
    Unfortunately the command "node server" had an error. 

    I learnt that I need extensions of Google Chrome: API tester and JSON formatter.  
    >>>Postman Insomnia


*/


/* Questions pour session de mentorat

1. Organisation of folder: 
    I would like to put original git repo files into a folder and name it 'backend'. 
    I tried and had an error with server when typed "node server" on terminal.

- Server: If I don't run the command "node server", localhost is inaccessible.

2. SASS:
    SASS comes with package.json file while I already have package.json from clonned git repo. 
    For now, therefore, I only have CSS file.  

3. Images :
    Is is okay to add new images into 'images' folder of backend repo ? It doesn't create any errors ?


4. Would "ACCUEIL" on the nav be necessary ? Clicking on the logo can do the same job.
    Having only one nav "PANIER" is ok ? In that case, I would like to replace the test into an icon. 


*/