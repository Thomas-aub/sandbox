// On va chercher les différents éléments de notre page
const pages = document.querySelectorAll(".page")
const header = document.querySelector("header")
const nbPages = pages.length // Nombre de pages du formulaire
let pageActive = 1

// On attend le chargement de la page
window.onload = () => {
    // On affiche la 1ère page du formulaire
    document.querySelector(".page").style.display = "initial"

    // On affiche les numéros des pages dans l'entête
    // On parcourt la liste des pages
    pages.forEach((page, index) => {
        // On crée l'élément "numéro de page"
        let element = document.createElement("div")
        element.classList.add("page-num")
        element.id = "num" + (index + 1)
        if(pageActive === index + 1){
            element.classList.add("active")
        }
        element.innerHTML = index + 1
        header.appendChild(element)
    })

    // On gère les boutons "suivant"
    let boutons = document.querySelectorAll(".next")

    for(let bouton of boutons){
        bouton.addEventListener("click", pageSuivante)
    }

    // On gère les boutons "précédent"
    boutons = document.querySelectorAll(".prev")

    for(let bouton of boutons){
        bouton.addEventListener("click", pagePrecedente)
    }
}

/**
 * Cette fonction fait avancer le formulaire d'une page
 */
function pageSuivante(){
    // On masque toutes les pages
    for(let page of pages){
        page.style.display = "none"
    }

    // On affiche la page suivante
    this.parentElement.nextElementSibling.style.display = "initial"

    // On "désactive" la page active
    document.querySelector(".active").classList.remove("active")

    // On incrémente pageActive
    pageActive++

    // On "active" le nouveau numéro
    document.querySelector("#num"+pageActive).classList.add("active")
}

/**
 * Cette fonction fait reculer le formulaire d'une page
 */
function pagePrecedente(){
    // On masque toutes les pages
    for(let page of pages){
        page.style.display = "none"
    }

    // On affiche la page suivante
    this.parentElement.previousElementSibling.style.display = "initial"

    // On "désactive" la page active
    document.querySelector(".active").classList.remove("active")

    // On incrémente pageActive
    pageActive--

    // On "active" le nouveau numéro
    document.querySelector("#num"+pageActive).classList.add("active")
}
let ing = 1;
function addIngredient(){

///////////////console.log("jddzllzd");    

    const ingDiv = document.createElement("div");
    ingDiv.classList.add("ing");

    const inpIng = document.createElement("input");
    inpIng.setAttribute("type", "text");
    inpIng.setAttribute("name", "ingredient"+ing);
    inpIng.setAttribute("placeholder", "Nom de l'ingrédient");


    const inpQte = document.createElement("input");
    inpQte.setAttribute("type", "text");
    inpQte.setAttribute("name", "quantite"+ing);
    inpQte.setAttribute("placeholder", "Quantité");

    /* const delbtn = document.createElement("button");
    delbtn.setAttribute("class", "delete");
    delbtn.innerText = "Suppr";
    delbtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("HEY");
    }); */

    ingDiv.appendChild(inpIng);
    ingDiv.appendChild(inpQte);
    /*ingDiv.appendChild(delbtn);*/

    const btn = document.getElementById("new-ing-btn");
    btn.parentNode.insertBefore(ingDiv, btn);

    ing++
}