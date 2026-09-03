import './style.css';

// Navigation principales
const bouton1 = document.querySelector('.bouton1');
const bouton2 = document.querySelector('.bouton2');
const bouton3 = document.querySelector('.bouton3');
const etape1 = document.querySelector('.etape1');
const etape2 = document.querySelector('.etape2');
const etape3 = document.querySelector('.etape3');
const etape4 = document.querySelector('.etape4');

//Bouton radio
const optionsMontant = document.querySelectorAll<HTMLInputElement>('input[name="montant_fixe"]');
optionsMontant.forEach((radio) => {
    radio.addEventListener('change', () => {
        const selectionMontant = document.querySelector<HTMLInputElement>('input[name="montant_fixe"]:checked');
        
        if (selectionMontant) {
            console.log(selectionMontant.value);
            const inputMontant = document.querySelector<HTMLInputElement>('#montant');
            if (inputMontant) {
                inputMontant.value = selectionMontant.value;
            }
        }
    });
});

// Navigation retour
const boutonRetour1 = document.querySelector('.boutonRetour1');
const boutonRetour2 = document.querySelector('.boutonRetour2');
const boutonEnvoie = document.querySelector('.boutonEnvoie');

// Configuration du formulaire
document.documentElement.classList.add('js');
const formulaire = document.querySelector('form');
formulaire?.setAttribute('novalidate', '');

// Step
const etapesNav: (Element | null)[] = [
  document.querySelector('.etape-nav-1'),
  document.querySelector('.etape-nav-2'),
  document.querySelector('.etape-nav-3'),
  document.querySelector('.etape-nav-4')
];

function initialisation(): void {
  boutonEnvoie?.classList.add("hidden");
  mettreAJourStep(1);


}

function mettreAJourStep(etapeActive: number): void {
  etapesNav.forEach((li, index) => {
    if (!li) return;
    const lien = li.querySelector('a');
    const estActive = index + 1 === etapeActive;

    if (estActive) {
      li.setAttribute('aria-current', 'step');
      if (lien) lien.className = 'block pb-2 border-b-8 border-red-800 font-semibold text-red-800';
    } else {
      li.removeAttribute('aria-current');
      if (lien) lien.className = 'block pb-2 border-b-2 border-gray-300 text-gray-500';
    }
  });
}

initialisation();

// Navigation avant
function navigationEtapes() {
  bouton1?.addEventListener("click", () => {
    etape1?.classList.add("hidden");
    bouton1?.classList.add("hidden");
    etape2?.classList.remove("hidden");
    bouton2?.classList.remove("hidden");
    mettreAJourStep(2);
  });

  bouton2?.addEventListener("click", () => {
    if (validerEtape(1)) {
      etape2?.classList.add("hidden");
      bouton2?.classList.add("hidden");
      etape3?.classList.remove("hidden");
      bouton3?.classList.remove("hidden");
      mettreAJourStep(3);
    }
  });

  bouton3?.addEventListener("click", () => {
    if (validerEtape(2)) {
      etape3?.classList.add("hidden");
      bouton3?.classList.add("hidden");
      etape4?.classList.remove("hidden");
      boutonEnvoie?.classList.remove("hidden");
      mettreAJourStep(4);
    }
  });
}

// Navigation arrière
function navigationRetour() {
  boutonRetour1?.addEventListener("click", () => {
    etape2?.classList.add("hidden");
    bouton2?.classList.add("hidden");
    etape1?.classList.remove("hidden");
    bouton1?.classList.remove("hidden");
    mettreAJourStep(1);
  });

  boutonRetour2?.addEventListener("click", () => {
    etape3?.classList.add("hidden");
    bouton3?.classList.add("hidden");
    etape2?.classList.remove("hidden");
    bouton2?.classList.remove("hidden");
    mettreAJourStep(2);
  });
}

navigationEtapes();
navigationRetour();

// Validation
interface messageErreur {
  vide?: string;
  pattern?: string;
  type?: string;
}

interface erreursJSON {
  [fieldName: string]: messageErreur;
}

let messagesJSON: erreursJSON;

async function obtenirMessages(): Promise<void> {
  const reponse = await fetch('objJSONMessages.json');
  messagesJSON = await reponse.json();
}
obtenirMessages();

function validerChamp(champ: HTMLInputElement): boolean {
  const id = champ.id;
  const erreurElement = document.getElementById(`erreur-${id}`) as HTMLDivElement;

  if (champ.validity.valueMissing && messagesJSON[id]?.vide) {
    if (erreurElement) erreurElement.innerText = messagesJSON[id].vide!;
    return false;
  } 
  if (champ.validity.typeMismatch && messagesJSON[id]?.type) {
    if (erreurElement) erreurElement.innerText = messagesJSON[id].type!;
    return false;
  } 
  if (champ.validity.patternMismatch && messagesJSON[id]?.pattern) {
    if (erreurElement) erreurElement.innerText = messagesJSON[id].pattern!;
    return false;
  }

  return true;
}

function validerEtape(etape: number): boolean {
  if (etape === 1) {
    const champs = ['nom', 'prenom', 'telephone', 'email', 'adresse', 'ville', 'code-postal'];
    return champs
      .map(id => document.getElementById(id) as HTMLInputElement)
      .map(element => validerChamp(element))
      .every(valide => valide);
  }

  if (etape === 2) {
    const champs = ['cc-number', 'expiration', 'cvc'];
    return champs
      .map(id => document.getElementById(id) as HTMLInputElement)
      .map(element => validerChamp(element))
      .every(valide => valide);
  }

  return false;
}