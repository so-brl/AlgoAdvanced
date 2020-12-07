

jQuery(document).ready(function(){
    let playerPosition =[];
    createLabyrinthe();
    initStart();
    initFinish();
    initPlayer(playerPosition);

 console.log(playerPosition);
});

//Création du labyrinthe
function createLabyrinthe() {
    labyrinthe.forEach((item, index)=> {
        let style = item['class'].toString();
        let positionX =  item['position-x']*100;
        let positionY =  item['position-y']*100;
        let styleToAdd = style.replace(/,/g, " ");
        let square = '<div id="square-'+index+'" class= "square '+styleToAdd+'" style="top:'+positionY+'px;left: '+positionX+'px">'+index+'</div>';
        $(square).appendTo('#labyrinthe');
    });
}

//Représentation de la case de départ
function initStart() {
    let positionX = labyrinthe[0]['position-x']*100;
    let positionY =  labyrinthe[0]['position-y']*100;
    let start = '<div id="start" class= "start" style="top:'+positionY+'px;left: '+positionX+'px"></div>';
    $(start).appendTo('#labyrinthe');
}

//Représentation de la case d'arrivé
function initFinish() {
    let size = labyrinthe.length-1;
    let positionX = labyrinthe[size]['position-x']*100;
    let positionY =  labyrinthe[size]['position-y']*100;
    let finish = '<div id="finish" class= "finish" style="top:'+positionY+'px;left: '+positionX+'px"></div>';
    $(finish).appendTo('#labyrinthe');
}

//initialisation du joueur sur le plateau
function initPlayer(playerPosition) {
    let positionX = labyrinthe[0]['position-x'];
    let positionY =  labyrinthe[0]['position-y'];
    let player = '<div id="player" class= "player" style="top:'+positionY+'px;left: '+positionX+'px"><i class="fas fa-user"></i></div>';
    $(player).appendTo('#labyrinthe');
    playerPosition.push([positionX,positionY ]);
}


// function getCurrentPosition(playerPosition) {
//
// }