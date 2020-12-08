jQuery(document).ready(function () {
    /*Variables globales*/
    let turn = 0;
    let playerPosition = [];
    let choiceList =[];
    /*Initialisation de la partie */
    initGame(playerPosition, labyrinthe, turn);



    /*Déroulement de la partie */
    while (turn != labyrinthe.length) {
        turn++;
        console.log('-----------TOUR N° ' + turn + ' --------------');
        //lister les différents choix de déplacement sur la page courente
        choiceList[turn-1] = findChoices(playerPosition, labyrinthe);
        console.log('choiceList = '+choiceList);
        console.log('playerPosition = '+playerPosition);



        // //récupérer un choix alléatoire
        // let theChoice = makeChoice(choiceList, playerPosition);
        //
        // //Calculer la nouvelle position
        // newPosition(theChoice, playerPosition);
        //
        // // Mise à jour de la position du joueur sur le plateau
        // updatPosition(playerPosition, labyrinthe, theChoice);
        //
        // turn++;
    }
});


//initialisation du joueur sur le plateau
function updatPosition(playerPosition, labyrinthe, theChoice) {
    let last = playerPosition.length - 1;
    let positionX;
    let positionY;
    // console.log( 'last='+last);
    if (last < 0 && last != 0) {
        positionX = labyrinthe[0]['position-x'];
        positionY = labyrinthe[0]['position-y'];
        let player = '<div id="player" class= "player" style="top:' + positionY + 'px;left: ' + positionX + 'px"><i class="fas fa-user"></i></div>';
        let info = '<div class= "information"><p><i class="fas fa-arrow-right"></i> Bienvenue dans la partie !</p></div>';
        // console.log('Bienvenue dans la partie !');
        playerPosition[0] = [0, positionX, positionY];
        $(player).appendTo('#labyrinthe');
        $(info).appendTo('#theGAme');
    } else {
        console.log('entré dans le else de updatPosition');
        $('#player').remove();
        let newCase = theChoice[last][3];
        //console.log( 'newCase='+playerPosition[last+1]);
        positionX = labyrinthe[newCase]['position-x'] * 100;
        positionY = labyrinthe[newCase]['position-y'] * 100;
        playerPosition[turn] = [theChoice[last][3], positionX, positionY];
        console.log(playerPosition);
        let player = '<div id="player" class= "player" style="top:' + positionY + 'px;left: ' + positionX + 'px"><i class="fas fa-user"></i></div>';
        let info = '<div class= "information"><p><i class="fas fa-arrow-right"></i> Vous êtes en case n° ' + playerPosition[last][0] + '</p></div>';
        $(player).appendTo('#labyrinthe');
        $(info).appendTo('#theGAme');
        //console.log(' Vous êtes en case n° '+playerPosition[last+1][0]+'');
    }


}

//trouver les différens choix de déplacement sur la page courente
function findChoices(playerPosition, labyrinthe) {

    let last = playerPosition.length - 1;

    let positionData = labyrinthe[last];

    let choices = positionData['choices'];
    let choice = '<div class= "information findChoice"><p><i class="fas fa-arrow-right"></i> Vous pouvez vous déplacé vers :</p>' +
        '<ul id="choicelist-' + last + '"></ul></div>';
    //  console.log('Vous pouvez vous déplacé vers : ' + choices[last][3] + '');
    $(choice).appendTo('#theGAme');
    let choiceListID = '#choicelist-' + last;
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
        choiceList[index] = value;
    });
//console.log('ici ' + choiceList);
    return choiceList;
}

//Faire un choix
function makeChoice(choiceList, playerPosition) {
    let last = playerPosition.length - 1;
    let numberChoices = choiceList.length;
    if (numberChoices == 1) {
        let choice = '<div class= "information"><p><i class="fas fa-arrow-right"></i> Votre déplacement n° ' + last + 1 + ' est vers ' + choiceList[0][0] + ' soit en case n°' + choiceList[0][3] + '</p>' +
            //  console.log('Vous allez donc vers : ' + choiceList[0][0] + ' en case n° '+choiceList[0][3]);
            $(choice).appendTo('#theGAme');
        return choiceList;
    } else {
        let randomNumber = Math.floor((Math.random() * numberChoices) + 1);
        let theChoice = choiceList[randomNumber];
        let choice = '<div class= "information"><p><i class="fas fa-arrow-right"></i> Votre déplacement n° ' + last + 1 + ' est vers ' + theChoice[0][0] + ' soit en case n°' + theChoice[0][3] + '</p>' +
            //  console.log('Vous allez vers : ' + theChoice[0][0] + 'en case ');
            $(choice).appendTo('#theGAme');
        return choiceList[randomNumber];
    }
}

//Calculer la nouvelle position
function newPosition(theChoice, playerPosition) {
    let last = playerPosition.length - 1;
    let actualPosition = playerPosition[last];
    //console.log(actualPosition);
    //console.log('Vous êtes actuellement en case '+ actualPosition[last]);
    let positionX = theChoice[last][1] * 100;
    //console.log(positionX);
    let positionY = theChoice[last][2] * 100;
    //console.log(positionY);
    let newCase = theChoice[last][3];
    //console.log(newCase);
    playerPosition[last] = [newCase, positionX, positionY];

}





/**------------------------------FONCTION D'INITIALISATION------------------------------**/

/*Initialisation de la partie */
function initGame(playerPosition, labyrinthe, turn) {
    console.log('-----------INITIALISATION DE LA PARTIE --------------');

    //Création du labyrinthe
    createLabyrinthe();
    console.log('- Génération du plateau');

    //Représentation de la case de départ
    initStart();
    console.log('- Initialisation de la case du départ');

    //Représentation de la case d'arrivé
    initFinish();
    console.log('- Initialisation de la case d\'arrivée');

    /*Initialisation du joueur */
    initPlayer(playerPosition, labyrinthe, turn);
    console.log('- Initialisation du joueur');
}

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

/*Initialisation du joueur */
function initPlayer(playerPosition, labyrinthe, turn) {
    updatPosition(playerPosition, labyrinthe, turn);
}
