import './style.css';

// Navigation principales
const bouton1 = document.querySelector('.bouton1');
const bouton2 = document.querySelector('.bouton2');
const bouton3 = document.querySelector('.bouton3');
const etape1 = document.querySelector('.etape1');
const etape2 = document.querySelector('.etape2');
const etape3 = document.querySelector('.etape3');
const etape4 = document.querySelector('.etape4');
//Résumé des données des champs 
const prenom = document.getElementById('prenom')as HTMLInputElement;
const nom = document.getElementById('nom')as HTMLInputElement;
const telephone = document.getElementById('telephone')as HTMLInputElement;
const entreprise = document.getElementById('entreprise')as HTMLInputElement;
const email = document.getElementById('email')as HTMLInputElement;
const adresse = document.getElementById('adresse')as HTMLInputElement;
const ville = document.getElementById('ville')as HTMLInputElement;
const codePostal = document.getElementById('code-postal')as HTMLInputElement;
const numeroCarte = document.getElementById('cc-number') as HTMLInputElement;
const expireMM = document.getElementById('expireMM') as HTMLSelectElement;
const expireAA = document.getElementById('expireAA') as HTMLSelectElement;
const cvcNumber = document.getElementById('cvc') as HTMLInputElement;
const resume_nom = document.getElementById('resume_nom')as HTMLInputElement;
const resume_prenom = document.getElementById('resume_prenom')as HTMLInputElement;
const resume_telephone = document.getElementById('resume_telephone')as HTMLInputElement;
const resume_codePostal = document.getElementById('resume_codePostal')as HTMLInputElement;
const resume_ville = document.getElementById('resume_ville')as HTMLInputElement;
const resume_adresse = document.getElementById('resume_adresse')as HTMLInputElement;
const resume_couriel = document.getElementById('resume_couriel')as HTMLInputElement;
const resume_entreprise = document.getElementById('resume_entreprise')as HTMLInputElement;
const resume_carte = document.getElementById('resume_carte')as HTMLInputElement;
const resume_expiration = document.getElementById('resume_expiration')as HTMLInputElement;
const resume_cvc = document.getElementById('resume_cvc')as HTMLInputElement;
const resume_montant = document.getElementById('resume_montant')as HTMLInputElement;
const inputMontant = document.getElementById('montant') as HTMLInputElement;

//Les liens pour la réussite du formulaire 

const etape1Reussi =  document.getElementById('etape1_reussi') as HTMLInputElement;
const etape2Reussi =  document.getElementById('etape2_reussi') as HTMLInputElement;
const etape3Reussi =  document.getElementById('etape3_reussi') as HTMLInputElement;
const etape4Reussi =  document.getElementById('etape4_reussi') as HTMLInputElement;

const etape1Texte = document.getElementById('etape1_texte') as HTMLInputElement;
const etape2Texte = document.getElementById('etape2_texte') as HTMLInputElement;
const etape3Texte = document.getElementById('etape3_texte') as HTMLInputElement;
const etape4Texte = document.getElementById('etape4_texte') as HTMLInputElement;


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
    const numeroEtape = index + 1;
    if (numeroEtape === etapeActive) {
  
      li.setAttribute('aria-current', 'step');
      if (lien) {
        lien.className = 'block pb-2 border-b-8 border-red-800 font-semibold text-red-800';
      }
    } else if (numeroEtape < etapeActive) {
      
      li.removeAttribute('aria-current');
      if (lien) {
        lien.className = 'block pb-2 border-b-4 border-[#155DFC] font-semibold text-[#155DFC]';
      }
    } else {
      
      li.removeAttribute('aria-current');
      if (lien) {
        lien.className = 'block pb-2 border-b-2 border-black-300 text-black';
      }
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
    etape1Reussi.classList.remove("hidden");
    etape1Texte.classList.add("hidden");

  });

  bouton2?.addEventListener("click", () => {
    if (validerEtape(1)) {
      etape2?.classList.add("hidden");
      bouton2?.classList.add("hidden");
      etape3?.classList.remove("hidden");
      bouton3?.classList.remove("hidden");
      mettreAJourStep(3);
      etape2Reussi.classList.remove("hidden");
    etape2Texte.classList.add("hidden");
    }
  });

  bouton3?.addEventListener("click", () => {
    if (validerEtape(2)) {
      mettreAJourResume();
      etape3?.classList.add("hidden");
      bouton3?.classList.add("hidden");
      etape4?.classList.remove("hidden");
      boutonEnvoie?.classList.remove("hidden");
      mettreAJourStep(4);
      etape3Reussi.classList.remove("hidden");
    etape3Texte.classList.add("hidden");
    }
  });
}

const modifierMontant = document.getElementById('modifierMontant');
const btnRetourEtape2 = document.getElementById('btnRetourEtape2');
const btnRetourEtape3 = document.getElementById('btnRetourEtape3');
// 2. Écouteur d'événement robuste
navigationRetour();

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

  
  if (modifierMontant) {
    modifierMontant.addEventListener("click", (e: Event) => {
      e.preventDefault();
      e.stopPropagation();

      etape4?.classList.add("hidden");
      boutonEnvoie?.classList.add("hidden");
      etape2?.classList.add("hidden");
      etape3?.classList.add("hidden");
      etape1?.classList.remove("hidden");
      bouton1?.classList.remove("hidden");

  
      mettreAJourStep(1);
    });
  }
  if (btnRetourEtape2) {
  btnRetourEtape2.addEventListener("click", (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    etape4?.classList.add("hidden");
    boutonEnvoie?.classList.add("hidden");

    etape1?.classList.add("hidden");
    etape3?.classList.add("hidden");

    etape2?.classList.remove("hidden");
    bouton2?.classList.remove("hidden"); 
    mettreAJourStep(2);
  });

}
if (btnRetourEtape3) {
  btnRetourEtape3.addEventListener("click", (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    etape4?.classList.add("hidden");
    boutonEnvoie?.classList.add("hidden");
    etape1?.classList.add("hidden");
    etape3?.classList.add("hidden");
    etape3?.classList.remove("hidden");
    bouton3?.classList.remove("hidden"); 

    mettreAJourStep(3);
  });

}
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

function validerChamp(champ: HTMLInputElement | HTMLSelectElement): boolean {
  const id = champ.id;
  const erreurElement = document.getElementById(`erreur-${id}`) as HTMLDivElement;

  if (erreurElement) erreurElement.innerText = '';
  if ((champ.validity.valueMissing || champ.value === '') && messagesJSON[id]?.vide) {
    if (erreurElement) erreurElement.innerText = messagesJSON[id].vide!;
    return false;
  } 

  if (champ instanceof HTMLInputElement) {
    if (champ.validity.typeMismatch && messagesJSON[id]?.type) {
      if (erreurElement) erreurElement.innerText = messagesJSON[id].type!;
      return false;
    } 
    if (champ.validity.patternMismatch && messagesJSON[id]?.pattern) {
      if (erreurElement) erreurElement.innerText = messagesJSON[id].pattern!;
      return false;
    }
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
  const champs = ['cc-number', 'expireMM', 'expireAA', 'cvc'];
  return champs
    .map(id => document.getElementById(id) as HTMLInputElement | HTMLSelectElement)
    .filter((element): element is HTMLInputElement | HTMLSelectElement => element !== null)
    .map(element => validerChamp(element))
    .every(valide => valide);
}

  return false;
}

function mettreAJourResume(): void {
  // Informations personnelles
  if (resume_nom && nom) resume_nom.textContent = nom.value;
  if (resume_prenom && prenom) resume_prenom.textContent = prenom.value;
  if (resume_telephone && telephone) resume_telephone.textContent = telephone.value;
  if (resume_couriel && email) resume_couriel.textContent = email.value;
  if (resume_adresse && adresse) resume_adresse.textContent = adresse.value;
  if (resume_ville && ville) resume_ville.textContent = ville.value;
  if (resume_codePostal && codePostal) resume_codePostal.textContent = codePostal.value;

  if (resume_entreprise && entreprise) {
    const conteneurEntreprise = resume_entreprise.parentElement;
    if (entreprise.value.trim() !== '') {
      resume_entreprise.textContent = entreprise.value;
      conteneurEntreprise?.classList.remove('hidden');
    } else {
      conteneurEntreprise?.classList.add('hidden');
    }
  }
  if (resume_carte) resume_carte.textContent = numeroCarte.value;
  
  if (resume_expiration && expireMM && expireAA) {
    resume_expiration.textContent = `${expireMM.value}/${expireAA.value}`;
  }
  if (resume_cvc) resume_cvc.textContent = cvcNumber.value;
  if (resume_montant && inputMontant) {
    resume_montant.textContent = `${inputMontant.value} $`;
  }
}