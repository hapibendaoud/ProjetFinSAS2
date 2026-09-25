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
= 2 - By Unique candidats    =
==============================
        `)
    const choix = Number(prompt("Choose Sort way: "))
    switch(choix){
        case 1:
            for(let i = 0 ; i < candidats.length ; i++ ){
                // let vote = 0;
                // for(let j = 0; j<candidats[i].electeurs.length; j++){
                //     vote++
                // }
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
    let candidatsName;
    let indexCandidat;
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
}