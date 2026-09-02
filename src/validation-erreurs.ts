interface messageErreur {
    vide?: string;
    pattern?: string;
    type?: string;
}

interface erreursJSON {
    [fieldName: string]: messageErreur;
}

let messagesJSON: erreursJSON | null = null;

// 1. Chargement asynchrone du JSON
async function obtenirMessages(): Promise<void> {
    try {
        const reponse = await fetch('objJSONMessages.json');
        if (!reponse.ok) {
            throw new Error(`Erreur réseau HTTP : ${reponse.status}`);
        }
        messagesJSON = await reponse.json();
        console.log("JSON chargé avec succès :", messagesJSON);
    } catch (erreur) {
        console.error("Impossible de charger les messages d'erreur :", erreur);
    }
}
obtenirMessages();

// 2. Fonction de validation d'un champ
function validerChamp(champ: HTMLInputElement): boolean {
    if (!messagesJSON) {
        return false;
    }
    const id = champ.id;
    
    const idMessageErreur = "erreur-" + id;
    const erreurElement = document.getElementById(idMessageErreur) as HTMLDivElement | null;

    if (!erreurElement) {
        return true; 
    }
    let message: string | undefined;

    // Détection des erreurs via l'API validity
    if (champ.validity.valueMissing || champ.value === "") {
        message = messagesJSON[id]?.vide;
    } else if (champ.validity.patternMismatch) {
        message = messagesJSON[id]?.pattern;
    } else if (champ.validity.typeMismatch) {
        message = messagesJSON[id]?.type;
    }

    // Affichage ou effacement de l'erreur
    if (message) {
        erreurElement.innerText = message;
        return false;
    } else {
        erreurElement.innerText = "";
        return true;
    }
}