//JS practice
let maVariable = 'Hyejin';
let myVariableNumber = 2;

console.log(maVariable + ', ' + myVariableNumber);
console.log(`Je m'appelle ${maVariable}.`);
console.log('Je m\'appelle Hyejin.');


//JS Boucles

//Boucle - For
    for ( let i = 0; i < 3; i += 1){
    console.log('For iteration : ' + i);
    }
    //For array
    let tableau0 = ['HMT', 'Hyejin', 'Bongout', 'bingbong'];
    for ( let i = 0; i < tableau0.length; i += 1 ){
        console.log(tableau0[i]);
    }
    //For in - key of object
    let objet = {
        name : 'coucou',
        price : 3900,
        description : 'Nobert your bestie'
    };
    for ( let k in objet) {
        console.log(k);
    }
    //For of - value of array
    let tableau1 = ['red', 'pink', 'purple', 'beige'];
    for ( let v of tableau1) {
        console.log(v);
    }

//Boucle - While
    let j = 0;
    let tableau2 = ['pommes', 'cerises', 'bananes'];
    while ( j < tableau2.length ){
        console.log(tableau2[j]);
        j += 1;
    }

//Boucle - Do... While
    let a = 0;
    let tableau3 = ['frontend', 'backend', 'fullstack'];
    do {
        console.log(tableau3[a]);
        a += 1;
    } while ( a < tableau3.length)

//Le DOM
console.log(window);
window.alert('Hello');
console.log('Largeur d\'ecran : ' + window.innerWidth);

console.log(document);
console.log('Chemin de fichier : ' + document.documentURI);

//Selection 
    let title = document.getElementById('title');
    title.innerText = 'Nouveau titre';
    title.innerHTMK = '<em>Nouveau</em> titre';

    let citation = document.getElementsByClassName('citation');
    console.log(citation);

    let paragraph = document.getElementsByTagName('p');
    console.log(paragraph); //tableau
    console.log(paragraph[1].innerText); //contenu

    console.log(document.querySelector('#id')); //selection with CSS selector
    console.log(document.querySelector('.class')); 
    console.log(document.querySelectorAll('a')); 

    let a = document.querySelector('a');
    console.log(a.getAttribute('href'));
    a.setAttribute('href', './pages/produit.html/id');

//Events - On click, it adds new class 'gris' that changes the color 
let cardClickEvent = document.querySelectorAll('.product--card');
cardClickEvent.addEventListener('click', function() {
    cardClickEvent.classList.add('gris');   //Add new class on selector
});

//Events - Toggle effect
let cardClickEvent = document.querySelectorAll('.product--card');
cardClickEvent.addEventListener('click', function() {
    this.classList.toggle('gris');   //Switch the class on every click
});

    //Same function but different way of writing
    let cardClickEvent = document.querySelectorAll('.product--card');
    cardClickEvent.addEventListener('click', () => {
        this.classList.toggle('gris');   //Switch the class on every click. 
    });
    //Better to use 'function()' with EventListener

    //How to use on P5
    let cardClickEvent = document.querySelectorAll('.product--card');
    let productLink = document.querySelector('a');
    for (productLink of cardClickEvent) {
        cardClickEvent.addEventListener('click', function() {
            //Change the URL_ID of link
        });
    }