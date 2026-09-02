import './style.css';
import './validation-erreurs';

//Déclaration navigation étapes
const bouton1= document.querySelector('.bouton1');
const bouton2 = document.querySelector('.bouton2');
const bouton3 = document.querySelector('.bouton3');
const etape1 = document.querySelector('.etape1');
const etape2 = document.querySelector('.etape2');
const etape3 = document.querySelector('.etape3');
const etape4 = document.querySelector('.etape4');

let etapeRendu = 1;

//Déclaration navigation "retour";
const boutonRetour1 = document.querySelector('.boutonRetour1');
const boutonRetour2 = document.querySelector('.boutonRetour2');

//Déclaration modification des trucs 

const boutonEnvoie=document.querySelector('.boutonEnvoie');
document.documentElement.classList.add('js');

const formulaire = document.querySelector('form');
formulaire?.setAttribute('novalidate', '');

//Fonction pour initialisation
function initialisation() {
  boutonEnvoie?.classList.add("hidden");
  etapeRendu=1
}

initialisation();

//Fonction pour la navigation entre les étapes
function navigationEtapes() {
  //Navigation etape1 -> etape2
  bouton1?.addEventListener("click", () => {

      etape1?.classList.add("hidden");
    bouton1?.classList.add("hidden");
    etape2?.classList.remove("hidden");
    bouton2?.classList.remove("hidden");
  
      }
  );

  //Navigation etape2 -> etape3
 bouton2?.addEventListener("click", () => {
 let resultat = validerEtape(1);
      if (resultat==true) {
      etape2?.classList.add("hidden");
    bouton2?.classList.add("hidden");
    etape3?.classList.remove("hidden");
    bouton3?.classList.remove("hidden");
  
      }
  });
//Navigation etape3 -> etape4
  bouton3?.addEventListener("click", () => {
    etape3?.classList.add("hidden");
    bouton3?.classList.add("hidden");
    etape4?.classList.remove("hidden");
    boutonEnvoie?.classList.remove("hidden");


  });

}

navigationEtapes();

//Fonction de navigation "retour" 
function navigationRetour() {
  //Navigation étape 2 -> étape 1
  boutonRetour1?.addEventListener("click", () => {
      etape2?.classList.add("hidden");
      bouton2?.classList.add("hidden");
      etape1?.classList.remove("hidden");
      bouton1?.classList.remove("hidden");

  })
  //Navigation étape 3 -> étape 2 
  boutonRetour2?.addEventListener("click",(event) => {
      etape3?.classList.add("hidden");
      bouton3?.classList.add("hidden");
      etape2?.classList.remove("hidden");
      bouton2?.classList.remove("hidden");
  });
}
navigationRetour();


interface messageErreur {
    vide?: string;
    pattern?: string;
    type?: string;
}
interface erreursJSON {
    [fieldName: string]: messageErreur;
}
let messagesJSON:erreursJSON;

async function obtenirMessages(): Promise<void> {
    const reponse = await fetch('objJSONMessages.json');
    messagesJSON = await reponse.json();
}
obtenirMessages();

function validerChamp(champ:HTMLInputElement): boolean {
    let valide = false;
    const id = champ.id; // email
    const idMessageErreur = "erreur-" + id; // erreur-email
    const erreurElement = document.getElementById(idMessageErreur) as HTMLDivElement;

    console.log('valider champ', champ.validity);

    // Vérifie chaque type d'erreur de validation
    if (champ.validity.valueMissing && messagesJSON[id].vide) {
        console.log('erreur', id);
        
        valide = false;
        erreurElement.innerText = messagesJSON[id].vide;
    } 
    else if (champ.validity.typeMismatch && messagesJSON[id].type) {
        valide = false;
        erreurElement.innerText = messagesJSON[id].type;
    } 
    else if (champ.validity.patternMismatch && messagesJSON[id].pattern) {
        // Ne correspond pas au pattern regex défini
        valide = false;
        erreurElement.innerText = messagesJSON[id].pattern;
    }
    else {
        // La validation n'a pas d'erreur, donc on assigne la variable vraie
        valide = true;
    }

    return valide;

}



function validerEtape(etape: number): boolean {
    let etapeValide = false;

    switch (etape) {
        case 1: {
            const nomElement = document.getElementById('nom') as HTMLInputElement;
            const prenomElement = document.getElementById('prenom') as HTMLInputElement;
            const telephoneElement = document.getElementById('telephone') as HTMLInputElement;
            const courrielElement = document.getElementById('email') as HTMLInputElement;
            const adresseElement = document.getElementById('adresse') as HTMLInputElement;
            const villeElement = document.getElementById('ville') as HTMLInputElement;
            const codePostalElement = document.getElementById('codepostal') as HTMLInputElement;

            const nomValide = validerChamp(nomElement);
            const prenomValide=validerChamp(prenomElement);
            const telephoneValide = validerChamp(telephoneElement);
            const courrielValide = validerChamp(courrielElement);
            const adresseValide = validerChamp(adresseElement);
            const villeValide = validerChamp(villeElement);
            const codepostalValide = validerChamp(codePostalElement);
           
            etapeValide = nomValide && prenomValide && telephoneValide && courrielValide && adresseValide && villeValide && codepostalValide ;
            break;
        }


        default:
            etapeValide = false;
            break;
    }

    return etapeValide;
}


