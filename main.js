const prompt = require("prompt-sync")();

// const name = prompt("To back to the menu, enter 1, to Quitter 0: ");
// console.log(name);

const candidats = [
    {
        cin : "AB123456",
        nom : "Boushaba",
        prenom : "Soufiane",
        partiPolitique : "Independant",
        age: 40,
        electeurs: ["ss","ss","ss","ss","ss"]
    }
];
function menu(){
    console.log(`
===========================================
====         Menu Prancipale           ====
===========================================
== 1 - Ajouter un candidats              ==
== 2 - Ajouter  plusieurs candidats      ==
== 3 - Afficher la liste des candidats   ==
== 4 - Voter pour un candidat            ==
== 5 - Modifier les info d'un candidat   ==
== 6 - Supprimer un candidat             ==
== 7 - Rechercher des candidats          ==
== 8 - Statistiques de l'élection        ==
== 0 - Quitter                           ==
===========================================

    `);
    const choice = Number(prompt("Choose From The Menu: "));
    switch(choice){
        case 1:
            Ajouter();
            break
        case 2:
            AjouterPlusieurs();
            break
        case 3:
            Afficher();
            break
        case 4:
            console.log("4");
            break
        case 5:
            console.log("5");
            break
        case 6:
            console.log("6");
            break
        case 7:
            console.log("7");
            break
        case 8:
            console.log("8");
            break
        case 0:
            console.log("See You Soon Sir");
            break
    }
    
}
menu();


function Ajouter(){
    console.log("============== Ajouter un candidats =============")
    const cin = prompt("Entrez le CIN: ");
    const nom = prompt("Entrez le Nom: ");
    const prenom = prompt("Entrez le Prenom: ");
    const partiPolitique = prompt("Entrez le Parti Politique (ou Indépendant): ");
    const age = Number(prompt("Entrez l'âge: "));

    const candidat = {
        cin: cin,
        nom: nom,
        prenom: prenom,
        partiPolitique: partiPolitique || "Indépendant",
        age: age,
        electeurs: []
    };

    candidats.push(candidat);
    // console.log(candidats)

}

function AjouterPlusieurs(){
    let manyCandidat;
    while(true){
        manyCandidat = parseInt(prompt("How Many condidats: "));
        // console.log(typeof(Number))
        if(isNaN(manyCandidat) || manyCandidat <= 0){
            console.log("Enter Number!!");
        } else {
            break
        }
    }
    for(let i = 0; i < manyCandidat; i++){
        Ajouter();
    }
    // console.log(candidats);
    console.log("== Ajouter succee ==")
    const choix = prompt("To back to the Menu click Enter:");
    switch(choix){
        case '':
            menu();
    }
}

function Afficher(){
    let vote = 0;
    if(!candidats){
        console.log("The list is Empty");
        return
    }
    console.log(`
========  Sprt by  ========
= 1 - Numbre of Vote      =
= 2 - Unique candidats    =
===========================
        
        `)
    switch(choix){
        case 1:
            const unique = prompt("Unique candidats: ");
            for(let i = 0 ; i < candidats.length ; i++ ){
                if(candidats[i].partiPolitique === unique){
                    console.log(`${i+1} - Candidat name: ${candidats[i].prenom} ${candidats[i].nom} CIN: ${candidats[i].cin} Age: ${candidats[i].age} Politique: ${candidats[i].partiPolitique} Vote: ${vote}`);
                }
            }
            break
        case 2:
            for(let i = 0 ; i < candidats.length ; i++ ){
                for(let j = 0; j<candidats[i].electeurs.length; j++){
                    vote++
                }
                // console.log(vote)
                console.log(`${i+1} - Candidat name: ${candidats[i].nom} ${candidats[i].prenom} CIN: ${candidats[i].cin} Age: ${candidats[i].age} Politique: ${candidats[i].partiPolitique} Vote: ${vote}`);
            }
            break
    }
    const choix = prompt("To back to the Menu click Enter:");
    switch(choix){
        case '':
            menu();
    }
    
}