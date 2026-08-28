import './style.css';
//Déclaration de constantes
const bouton1 = document.querySelector('.bouton1');
const bouton2 = document.querySelector('.bouton2');
const bouton3 = document.querySelector('.bouton3');
const etape1 = document.querySelector('.etape1');
const etape2 = document.querySelector('.etape2');
const etape3 = document.querySelector('.etape3');
const etape4 = document.querySelector('.etape4');

const boutonEnvoie=document.querySelector('.boutonEnvoie');
document.documentElement.classList.add('js');

const formulaire = document.querySelector('form');
formulaire?.setAttribute('novalidate', '');

//Fonction pour initialisation
function initialisation() {
  boutonEnvoie?.classList.add("hidden");
}

initialisation();

//Fonction pour la navigation entre les étapes
function navigationEtapes() {
  //Navigation etape1 -> etape2
  bouton1?.addEventListener("click", (event) => {
    etape1?.classList.add("hidden");
    bouton1?.classList.add("hidden");
    etape2?.classList.remove("hidden");
    bouton2?.classList.remove("hidden");
  });

  //Navigation etape2 -> etape3
 bouton2?.addEventListener("click", (event) => {
    etape2?.classList.add("hidden");
    bouton2?.classList.add("hidden");
    etape3?.classList.remove("hidden");
    bouton3?.classList.remove("hidden");
  });
//Navigation etape3 -> etape4
  bouton3?.addEventListener("click", (event) => {
    etape3?.classList.add("hidden");
    bouton3?.classList.add("hidden");
    etape4?.classList.remove("hidden");
    boutonEnvoie?.classList.remove("hidden");
  });

}

navigationEtapes();
