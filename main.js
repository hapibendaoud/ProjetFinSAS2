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
    },
    {
        cin : "jc111",
        nom : "ait",
        prenom : "said",
        partiPolitique : "Independant",
        age: 25,
        electeurs: ["ss","ss","ss","ss","ss","dd","kk"]
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
            vote();
            break
        case 5:
            update();
            break
        case 6:
            deleteFunction();
            break
        case 7:
            search();
            break
        case 8:
            Statistiques();
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
    for(let con of candidats){
        if(cin === con.cin){
            console.log(`The CIN: ${con.cin} is already EXIST!!`);
            const choix = prompt("Click Enter:");
            switch(choix){
                case '':
                    menu();
            }
        }
    }
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
    const choix = prompt("To back to the Menu click Enter:");
    switch(choix){
        case '':
            menu();
    }

}

function AjouterPlusieurs(){
    let manyCandidat;
    while(true){
        manyCandidat = parseInt(prompt("How Many condidats: "));
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
    if(!candidats){
        console.log("The list is Empty");
        return
    }
    console.log(`
=========  Sprt by  ==========
= 1 - By Numbre of Vote      =
= 2 - By Unique politique    =
==============================
        `)
    const choix = Number(prompt("Choose Sort way: "))
    switch(choix){
        case 1:
            for(let i = 0 ; i < candidats.length ; i++ ){
                for (let i = 0; i < candidats.length - 1; i++) {
                    for (let j = 0; j < candidats.length - 1 - i; j++) {
                        if (candidats[j].electeurs.length < candidats[j + 1].electeurs.length) {
                            let x = candidats[j];
                            candidats[j] = candidats[j + 1];
                            candidats[j + 1] = x;
                        }
                    }
                }
                console.log(`${i+1} - Candidat name: ${candidats[i].nom} ${candidats[i].prenom} CIN: ${candidats[i].cin} Age: ${candidats[i].age} Politique: ${candidats[i].partiPolitique} Vote: ${candidats[i].electeurs.length}`);
            }
            break
        case 2:
            const unique = prompt("Unique candidats: ");
            for(let i = 0 ; i < candidats.length ; i++ ){
                if(candidats[i].partiPolitique === unique){
                    console.log(`${i+1} - Candidat name: ${candidats[i].prenom} ${candidats[i].nom} CIN: ${candidats[i].cin} Age: ${candidats[i].age} Politique: ${candidats[i].partiPolitique} Vote: ${candidats[i].electeurs.length}`);
                }
            }
            break
    }
    const backToMenu = prompt("To back to the Menu click Enter:");
    switch(backToMenu){
        case '':
            menu();
    }
    
}

function vote(){
    const voteCIN = prompt("Please write your CIN: ").trim();
    for(let con of candidats){
        for(let j = 0; j < con.electeurs.length; j++ ){
            if(voteCIN === con.electeurs[j]){
                console.log(`The CIN: ${con.cin} is already VOTE!! you can not change your vote!!.`);
                const choix = prompt("Click Enter:");
                switch(choix){
                    case '':
                        menu();
                }
            }
        }
    }
    let cinOfCandidate = prompt("CIN of the candidate that you wanna VOTE for: ").trim();
    let exist = false;
    for(let i = 0; i < candidats.length; i++){
        if(cinOfCandidate === candidats[i].cin){
            exist = true;
            ChoosenCandidat = candidats[i];
            break
        }        
    }

    if(exist){
        console.log("exist");
        let vote = prompt(`Are you sure you wanna vote for ${ChoosenCandidat.nom} (Y/N): `).toLowerCase();
        if(vote === "y" || vote === "" ){
            ChoosenCandidat.electeurs.push(voteCIN);
            const choix = prompt("Click Enter:");
            switch(choix){
                case '':
                    menu();
            }
        } else {
            menu();
            return
        }
    } else {
        console.log("The candidat do not exist");
        const choix = prompt("Click Enter:");
        switch(choix){
            case '':
                menu();
        }
    }
    
}

function update(){
    let cinOfCandidate = prompt("CIN of the candidate that you wanna UPDATE: ").trim();
    for(let i = 0; i < candidats.length; i++){
        if(cinOfCandidate === candidats[i].cin){
            exist = true;
            ChoosenCandidat = candidats[i];
            break
        }        
    }
    if(exist){
        console.log(`
    =======================================
    == 1 - Update politique of candidat   =
    == 2 - Update Age of candidat         =
    =======================================
    `);
        let choice = Number(prompt("Update: "));
        switch(choice){
            case 1:
                console.log("===== update politique =====");
                let newPolitique = prompt("Write new Politique Name: ");
                ChoosenCandidat.partiPolitique = newPolitique;
                console.log("Politique Updated Seccesfully.");
                break
            case 2:
                console.log("===== update Age =====");
                let newAge = prompt("Write new candidat Age: ");
                ChoosenCandidat.age = newAge;
                console.log("Age Updated Seccesfully.");
                break
        }
    } else {
        console.log("The candidat do not exist");
    }
    const choix = prompt("Click Enter:");
        switch(choix){
            case '':
                menu();
        }
}
function deleteFunction(){
    let indexOfCandidat;
    let cinOfCandidate = prompt("CIN of the candidate that you wanna DELETE: ").trim();
    for(let i = 0; i < candidats.length; i++){
        if(cinOfCandidate === candidats[i].cin){
            exist = true;
            indexOfCandidat = i ;
            break
        }        
    }
    if(exist){
        let choice = prompt("Are you sure you wanna DELETE this candidat: ").toLowerCase();
        switch(choice){
            case "y":
                candidats.splice(indexOfCandidat, 1);
                console.log("DELETED Seccesfully.");
                break
            case "n":
                console.log();
                break
            default:
                menu();
        }
    } else {
        console.log("The candidat do not exist!!.");
    }
    const choix = prompt("Click Enter:");
    switch(choix){
        case '':
            menu();
    }
}

function search(){
    let index;
    let nameOfCandidate = prompt("The name of Candidat: ").trim();
    for(let i = 0; i < candidats.length; i++){
        if(nameOfCandidate === candidats[i].nom){
            exist = true;
            ChoosenCandidat = candidats[i];
            index = i;
            break
        }        
    }
    if(exist){
        console.log(`${index} - Candidat name: ${ChoosenCandidat.prenom} ${ChoosenCandidat.nom} CIN: ${ChoosenCandidat.cin} Age: ${ChoosenCandidat.age} Politique: ${ChoosenCandidat.partiPolitique} Vote: ${ChoosenCandidat.electeurs.length}`);
    } else {
        console.log("Not Exist!!!");
    }
    const choix = prompt("Click Enter:");
        switch(choix){
            case '':
                menu();
        }
}

function Statistiques(){
//     console.log(`==================================
// == 1 -  nombre total de candidats  ==
// == 2 - nombre total de votes       ==
// =====================================`)
    
    let top3 = [];
    let numberOfCandidat = 0;
    let numberOfVoter = 0;
    for(let i = 0; i < candidats.length; i++){
        numberOfCandidat++
    }
    for(let con of candidats){
        numberOfVoter = numberOfVoter + con.electeurs.length;
    }
    for(let i = 0 ; i < 2 ; i++ ){
        for (let i = 0; i < candidats.length - 1; i++) {
            for (let j = 0; j < candidats.length - 1 - i; j++) {
                if (candidats[j].electeurs.length < candidats[j + 1].electeurs.length) {
                    let x = candidats[j];
                    candidats[j] = candidats[j + 1];
                    candidats[j + 1] = x;
                }
            }
        }
        top3.push(candidats[i]);
        // console.log(`${i+1} - Candidat name: ${candidats[i].nom} ${candidats[i].prenom} CIN: ${candidats[i].cin} Age: ${candidats[i].age} Politique: ${candidats[i].partiPolitique} Vote: ${candidats[i].electeurs.length}`);
    }

    console.log(`
===============  Statistiques  ================
==  Number of too candidat is:  ${numberOfCandidat}            ==
==  Number of the voter is:  ${numberOfVoter}              ==
==  Top 3 Candidats by vote                  ==`);
for(let i = 0; i < top3.length; i++){
    console.log(`== ${i + 1} - Parti Politique ${top3[i].partiPolitique}, Vote: ${top3[i].electeurs.length}  ==`);
}
console.log("===============================================")
    const choix = prompt("To go back Click Enter:");
    switch(choix){
        case '':
            menu();
    }
}