jQuery(document).ready(function () {
    let playerPosition = [];
    //Création du labyrinthe
    createLabyrinthe();
    //Représentation de la case de départ
    initStart();
    //Représentation de la case d'arrivé
     initFinish();
    // //initialisation du joueur sur le plateau
     initPlayer(playerPosition);
    //lister les différents choix de déplacement sur la page courente
     let choiceList = findChoices(playerPosition, labyrinthe);
     //console.log(choiceList);
     //récupérer un coix alléatoire
     let theChoice = makeChoice(choiceList, playerPosition);
    //console.log(theChoice);
     //Calculer la nouvelle position
   newPosition(theChoice, playerPosition);
//console.log(playerPosition);
    // console.log(turn);
});

//Création du labyrinthe
function createLabyrinthe() {
    labyrinthe.forEach((item, index) => {
        let style = item['class'].toString();
        let positionX = item['position-x'] * 100;
        let positionY = item['position-y'] * 100;
        let styleToAdd = style.replace(/,/g, " ");
        let square = '<div id="square-' + index + '" class= "square ' + styleToAdd + '" style="top:' + positionY + 'px;left: ' + positionX + 'px">' + index + '</div>';
        $(square).appendTo('#labyrinthe');
    });
}

//Représentation de la case de départ
function initStart() {
    let positionX = labyrinthe[0]['position-x'] * 100;
    let positionY = labyrinthe[0]['position-y'] * 100;
    let start = '<div id="start" class= "start" style="top:' + positionY + 'px;left: ' + positionX + 'px"></div>';
    $(start).appendTo('#labyrinthe');
}

//Représentation de la case d'arrivé
function initFinish() {
    let size = labyrinthe.length - 1;
    let positionX = labyrinthe[size]['position-x'] * 100;
    let positionY = labyrinthe[size]['position-y'] * 100;
    let finish = '<div id="finish" class= "finish" style="top:' + positionY + 'px;left: ' + positionX + 'px"></div>';
    $(finish).appendTo('#labyrinthe');
}

//initialisation du joueur sur le plateau
function initPlayer(playerPosition) {
    let positionX = labyrinthe[0]['position-x'];
    let positionY = labyrinthe[0]['position-y'];
    let player = '<div id="player" class= "player" style="top:' + positionY + 'px;left: ' + positionX + 'px"><i class="fas fa-user"></i></div>';
    let info = '<div class= "information"><p><i class="fas fa-arrow-right"></i> Bienvenue dans la partie !</p></div>';
    console.log('Bienvenue dans la partie !')
    $(player).appendTo('#labyrinthe');
    playerPosition[0]=[0, positionX, positionY];
    $(info).appendTo('#theGAme');
}

//trouver les différens choix de déplacement sur la page courente
function findChoices(playerPosition, labyrinthe) {
    let last =playerPosition.length-1;
    let positionData = labyrinthe[last];
    let choices = positionData['choices'];
    let choice = '<div class= "information findChoice"><p><i class="fas fa-arrow-right"></i> Vous pouvez vous déplacé vers :</p>' +
        '<ul id="choicelist-'+last+'"></ul></div>';
    console.log('Vous pouvez vous déplacé vers : ' + choices[last][3] + '');
    $(choice).appendTo('#theGAme');
    let choiceListID = '#choicelist-'+last;
    //Afficher la liste des choix

    return getAllChoice(choices, choiceListID);
}

//Afficher la liste des choix
function getAllChoice(choices, choiceListID) {
    let choiceList = [];
    $.each(choices, function (index, value) {
        let text = '<li class="turlututu">' + value[0] + '</li>';
        let x = value[1];
        let y = value [2];
        $(text).appendTo(choiceListID);
        choiceList.push(value);
    });

    return choiceList;
}

//Faire un choix
function makeChoice(choiceList, playerPosition) {
    let last =playerPosition.length-1;
    let numberChoices = choiceList.length;
    if (numberChoices == 1) {
        let choice = '<div class= "information"><p><i class="fas fa-arrow-right"></i> Votre déplacement n° ' + last+1 + ' est vers ' + choiceList[0][0] +' soit en case n°'+choiceList[0][3] +'</p>' +
            console.log('Vous allez donc vers : ' + choiceList[0][0] + '');
        $(choice).appendTo('#theGAme');
        return choiceList;
    } else {
        let randomNumber = Math.floor((Math.random() * numberChoices) + 1);
        let theChoice = choiceList[randomNumber];
        let choice = '<div class= "information"><p><i class="fas fa-arrow-right"></i> Votre déplacement n° ' + last+1 + ' est vers ' + theChoice[0][0] + ' soit en case n°'+theChoice[0][3]+'</p>' +
            console.log('Vous allez vers : ' + theChoice[0][0] + '');
        $(choice).appendTo('#theGAme');
        return choiceList[randomNumber];
    }
}

//Calculer la nouvelle position
function newPosition(theChoice,playerPosition) {
    let last =playerPosition.length-1;
    let actualPosition = playerPosition[last];
    //console.log(actualPosition);
    console.log('Vous êtes actuellement en case '+ actualPosition[0]);
     let positionX = theChoice[last][1]*100;
    //console.log(positionX);
     let positionY = theChoice[last][2]*100;
    //console.log(positionY);
    let newCase =theChoice[last][3];
    //console.log(newCase);
    playerPosition[last]=[newCase, positionX, positionY];

}