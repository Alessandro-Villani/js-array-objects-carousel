/*--------------------------TRACCIA------------------------------

Dato un array di oggetti letterali con:
 - url dell’immagine
 - titolo
 - descrizione
Creare un carosello ispirandovi alla foto allegata. Se volete cambiare la grafica siete liberi di farlo.
Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile assieme al suo titolo e testo.
Milestone 2:
Aggiungere il "ciclo infinito" del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
BONUS 1:
Aggiungere le thumbnails (sotto forma di miniatura) ed al click attivare l’immagine corrispondente.
BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
BONUS 3:
Aggiungere bottoni di start/stop  del meccanismo di autoplay.

---------------------------------------------------------------*/

//get target elements
const targetImgContainer = document.getElementById('carousel-img-container');
const targetThumbnailContainer = document.querySelector('.thumbnails');
const arrowUp = document.querySelector('.arrow.up');
console.log(arrowUp);
const arrowDown = document.querySelector('.arrow.down');
console.log(arrowDown);

//# FUNCTIONS

//Function to create pic cards
const createPicCard = (array, i) => {
    const displayClass = !i ? '' : ' d-none';

    const card = `
    <div class="img-card${displayClass}">
        <img src="${array.image}" alt="${array.title}">
        <div class="caption">
            <h4>${array.title}</h4>
            <p class="mb-0">${array.text}</p>
        </div>
    </div>`
    console.log(card);
    return card;

}


//Function to create thumbnail
const createThumbnail = (array, i) => {
    const displayClass = !i ? ' selected' : ''
    const thumbnail = `	
    <div class="thumbnail${displayClass}">
        <img src="${array.image}" alt="${array.title}">
    </div>`
    return thumbnail;
}

//Function to build pic cards

const addPicCards = () => {

    let cards = ''

    data.forEach((data, i) => {

       cards += createPicCard(data, i);  

    });
    
     return cards
}

//Function to build thumbnails cards

const addThumbnails = () => {
    let thumbnails = ''

    data.forEach((data, i) => {

        thumbnails += createThumbnail(data, i);  
 
     });

     console.log(thumbnails);

     return thumbnails;

}

//Change pics function
const changePic = (target) => {
    //add display none to current image
    cards[currentActiveImg].classList.add('d-none');
    //remove selected from current image
    thumbnails[currentActiveImg].classList.remove('selected');
    console.log(thumbnails[currentActiveImg]);

    switch (target){
    case 'next': {
    //index increment
    currentActiveImg++
    if(currentActiveImg >= cards.length) currentActiveImg = 0;
    break
    }
    case 'previous' : {
    //index decrement
    currentActiveImg--
    if(currentActiveImg < 0) currentActiveImg = cards.length - 1;
    break
    }
    default: {
    //image index
    currentActiveImg = target;
    }
    }
    //remove display none from next image
    cards[currentActiveImg].classList.remove('d-none');
    //add selected to next image
    thumbnails[currentActiveImg].classList.add('selected');
    console.log(thumbnails[currentActiveImg]);
    
}


//! START PROGRAM

targetImgContainer.innerHTML = addPicCards();
targetThumbnailContainer.innerHTML += addThumbnails();

//get all created cards and thumbnails
const cards = document.querySelectorAll('.img-card');
console.log(cards);
const thumbnails = document.querySelectorAll('.thumbnail');
console.log(thumbnails);

//set index of currently active image
let currentActiveImg = 0;

console.log(arrowDown);
//add listener to button 
arrowDown.addEventListener('click', () => {

changePic('next');

});

arrowUp.addEventListener('click', () => {

    changePic('previous');

});


thumbnails.forEach((thumbnail, i) => {
    thumbnail.addEventListener('click', () => {

        changePic(i);

    })
});

const autoPlay = setInterval(() => {
    changePic('next');
}, 3000);