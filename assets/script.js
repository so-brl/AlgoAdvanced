jQuery(document).ready(function () {
    let playerPosition = [];
    let positionX;
    let positionY;
    let turn = playerPosition.length-1;




    /** INITIALISATION DE LA PARTIE **/
    initGame(playerPosition, labyrinthe, positionX, positionY);
    console.log( 'Journale des positions du joueur "départ" ');
    console.log(playerPosition);
    /** LA PARTIE COMMENCE **/

    console.log(' ');
    console.log(' ');
    console.log('------LA PARTIE COMMENCE------');


     console.log('-->Round n° 1');
    let theChoice = choice(playerPosition, labyrinthe);
    updatPlayer(theChoice, playerPosition,turn);



    console.log(' ');
    console.log('-->Round n° 2 ');

     let theChoice2 = choice(playerPosition, labyrinthe);
     //updatPlayer(theChoice2, playerPosition,turn);


});





/** --------------------------------- DEPLACER LE JOUEUR ---------------------------------**/
function updatPlayer(theChoice, playerPosition,turn) {

    //Calculer la nouvelle position
    newPosition(theChoice, playerPosition);

    //Mise à jour de la position du joueur sur le plateau
     updatPosition(playerPosition,labyrinthe,theChoice,turn);
}

//Calculer la nouvelle position
function newPosition(theChoice,playerPosition) {
    let last =playerPosition.length-1;
    let actualPosition = playerPosition[last];
    console.log('Vous êtes actuellement en case n° '+ actualPosition[last]);
    let positionX = theChoice[0][1]*100;
    let positionY = theChoice[0][2]*100;
    let newCase =theChoice[0][3];
    console.log('Vous vous déplacé en case n° '+newCase);
    playerPosition.push([newCase, positionX, positionY]);
}

//initialisation du joueur sur le plateau
function updatPosition(playerPosition, labyrinthe, theChoice,turn) {
    turn = playerPosition.length-1;
    $('#player').remove();
    let newCase = theChoice[0][3];
    let positionX = labyrinthe[newCase]['position-x'] * 100;
    let positionY = labyrinthe[newCase]['position-y'] * 100;
    let player = '<div id="player" class= "player" style="top:' + positionY + 'px;left: ' + positionX + 'px"><i class="fas fa-user"></i></div>';
    let info = '<div class= "information"><p><i class="fas fa-arrow-right"></i> Vous êtes en case n° ' + playerPosition[turn][0] + '</p></div>';
    $(player).appendTo('#labyrinthe');
    $(info).appendTo('#theGAme');

}





/** ---------------------------------FAIRE DES CHOIX  ---------------------------------**/
function choice(playerPosition, labyrinthe) {

    //lister des différents choix de déplacement sur la case courente
    let choiceList = findChoices(playerPosition, labyrinthe);
    console.log('La liste des choix  est = ' + choiceList);

    //récupérer un choix alléatoire
    let theChoice = makeChoice(choiceList, playerPosition);
    console.log('Le choix effectué est d\'aller vers ' + theChoice[0][0]);

    return theChoice;

}

//trouver les différens choix de déplacement sur la page courente
function findChoices(playerPosition, labyrinthe) {
    let last = playerPosition.length - 1;
    console.log('position actuelle ' + playerPosition[last]);
    let lastPosition =playerPosition[last-1];
    let actualPosition = playerPosition[last][0];
    let positionData = labyrinthe[actualPosition];
    let choices = positionData['choices'];
    console.log('derniere position = '+ lastPosition);

    let choiceDiv = '<div class= "information findChoice"><p><i class="fas fa-arrow-right"></i> Vous pouvez vous déplacé vers :</p>' +
        '<ul id="choicelist-' + last + '"></ul></div>';
    $(choiceDiv).appendTo('#theGAme');
    let choiceListID = '#choicelist-' + last;
    return getAllChoice(choices, choiceListID,lastPosition);
}

//Afficher la liste des choix
function getAllChoice(choices, choiceListID,lastPosition) {
    console.log(typeof(lastPosition));
    console.log('sdflkg' + lastPosition[0]);
    let choiceList = [];
    $.each(choices, function (index, value) {
        if( value[3]!=lastPosition){
            let text = '<li>' + value[0] + '</li>';
            let x = value[1];
            let y = value [2];
            $(text).appendTo(choiceListID);
            choiceList.push(value);
        }

    });
    return choiceList;
}

//Faire un choix
function makeChoice(choiceList, playerPosition) {
    console.log('liste des choix');
    console.log(choiceList);
    let last = playerPosition.length - 1;
    let currentPosition = playerPosition[last][0];
    console.log('->'+currentPosition);
    let numberChoices = choiceList.length;
    console.log('nombre de choix = '+ numberChoices);
    if (numberChoices == 1) {
        let choice = '<div class= "information"><p><i class="fas fa-arrow-right"></i> Vous vous déplacé vers ' + choiceList[0][0] + ' soit en case n°' + choiceList[0][3] + '</p></div>';
        $(choice).appendTo('#theGAme');
        return choiceList;
    } else {
        let randomNumber = Math.floor(Math.random() * numberChoices);
        console.log('random '+ randomNumber);
        let theChoice = choiceList[randomNumber];
        console.log(theChoice);
        let choice = '<div class= "information"><p><i class="fas fa-arrow-right"></i> Vous vous déplacé vers ' + theChoice[0][0] + ' soit en case n°' + theChoice[0][3] + '</p></div>';
        $(choice).appendTo('#theGAme');
        return choiceList[randomNumber];
    }
}





/** ---------------------------------FONTION D'INITIALISATION DE LA PARTIE ---------------------------------**/
//initialiasation global
function initGame(playerPosition, labyrinthe, positionX, positionY) {
    console.log('------INITIALISATION DE LA PARTIE------');

    //Création du labyrinthe
    createLabyrinthe();
    console.log('- Génération du plateau');

    //Représentation de la case de départ
    initStart();
    console.log('- Génération de la case START');

    //Représentation de la case d'arrivé
    initFinish();
    console.log('- Génération de la case FINISH');

    //initialisation du joueur sur le plateau
    initPlayer(playerPosition, labyrinthe, positionX, positionY);
    console.log('- Positionnement du joueur sur la case START');
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

//initialisation du joueur sur le plateau
function initPlayer(playerPosition, labyrinthe, positionX, positionY) {
    positionX = labyrinthe[0]['position-x'];
    positionY = labyrinthe[0]['position-y'];
    let player = '<div id="player" class= "player" style="top:' + positionY + 'px;left: ' + positionX + 'px"><i class="fas fa-user"></i></div>';
    let info = '<div class= "information"><p><i class="fas fa-arrow-right"></i> Bienvenue dans la partie !</p></div>';
    playerPosition[0] = [0, positionX, positionY];
    $(player).appendTo('#labyrinthe');
    $(info).appendTo('#theGAme');
}