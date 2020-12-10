jQuery(document).ready(function () {


    let level;
    let size;
    let playerPosition = [];
    let s = [];
    let setTime = 50;
    let stack = [];
    let turn = 0;
    let v = s;
    let vewWidth = $(window).width();
    var vewHeight = $(window).height();

    //Récupéré la taille de labyrinthe séléctionné
    $('.size').bind('click touch', function () {
        let sizeChoice = $(this).attr('id');
        $('.size').removeClass('btnSelect');
        $(this).addClass('btnSelect');
        size = sizeChoice;
    });
    //Récupéré la difficulté de labyrinthe séléctionné
    $('.hardChoice').bind('click touch', function () {
        let levelChoice = $(this).attr('id');
        $('.level').removeClass('btnSelect');
        $(this).addClass('btnSelect');
        level = levelChoice;

    });

    //Récupéré le labyrinthe
    $('#generer').bind('click touch', function () {
        $('#makeAChoice').remove();
        let labyrinthe = [];
        $.getJSON("./labyrinthes.json", function (data) {
            let mazeData = data[size][level];
            labyrinthe = mazeData;
            /** INITIALISATION DE LA PARTIE **/
            initGame(playerPosition, mazeData, stack, s, vewWidth, vewHeight, size, level);
        });
    });

    $('#regenerer').bind('click touch', function () {
        console.log('cliké');
        $('#labyrinthe').remove();
        $('#regenerer').remove();
        $('#makeAChoice').remove();
    });
});


/**
 * Création d'un tableau de class permettant de gérer l'affichage des murs
 * @param walls
 * @returns {[]}
 */
function creatClass(walls) {

    let className = [];
    if (walls[0]) {
        className.push('wall-top');
    }
    if (walls[1]) {
        className.push('wall-right');
    }
    if (walls[2]) {
        className.push('wall-bottom');
    }
    if (walls[3]) {
        className.push('wall-left');
    }
    return className;
}

/**
 * Création d'un tableau des zones de sorties pour chaque case
 * @param walls
 * @param key
 * @param size
 */
function findAllechoices(walls, key, size) {
    let choices = [];
    if (!walls[0]) {
        let goTo = key - size;
        choices.push({
            text: 'le haut',
            x: 0,
            y: 1,
            case: goTo,
            current: key
        });
    }
    if (!walls[1]) {
        let goTo = key + 1;
        choices.push({
            text: 'la droite',
            x: +1,
            y: 0,
            case: goTo,
            current: key
        });
    }
    if (!walls[2]) {
        let goTo = key + size;
        choices.push({
            text: 'le bas',
            x: 0,
            y: +1,
            case: goTo,
            current: key
        });
    }
    if (!walls[3]) {
        let goTo = key - 1;


        choices.push({
            text: 'la gauche',
            x: 1,
            y: 0,
            case: goTo,
            current: key
        });
    }
    return choices;
}

/** ---------------------------------FONTION D'INITIALISATION DE LA PARTIE ---------------------------------**/
/**
 * Initialiasation global
 * @param playerPosition
 * @param labyrinthe
 * @param stack
 * @param s
 * @param vewWidth
 * @param vewHeight
 * @param size
 * @param level
 */
function initGame(playerPosition, labyrinthe, stack, s, vewWidth, vewHeight, size, level) {
    console.log('------INITIALISATION DE LA PARTIE------');

    //Création du labyrinthe
    createLabyrinthe(labyrinthe, vewWidth, vewHeight, size, level);
    console.log('- Génération du plateau');

    //Représentation de la case de départ
    initStart(labyrinthe,vewWidth, vewHeight, size);
    console.log('- Génération de la case START');

    //Représentation de la case d'arrivé
    initFinish(labyrinthe,vewWidth, vewHeight, size);
    console.log('- Génération de la case FINISH');

    //initialisation du joueur sur le plateau
    initPlayer(playerPosition, labyrinthe,vewWidth, vewHeight, size, stack, s);
    console.log('- Positionnement du joueur sur la case START');
}


/**
 * Création du labyrinthe
 * @param datas
 * @param vewWidth
 * @param vewHeight
 * @param size
 * @param level
 */
function createLabyrinthe(datas, vewWidth, vewHeight, size, level) {
    console.log(datas);
    let levelChoose;
    switch (level) {
        case 'ex-0':
            levelChoose = "Easy";
            break;
        case 'ex-1':
            levelChoose = "Medium";
            break;
        case 'ex-2':
            levelChoose = "Hard";
            break;
    }
    let width = vewWidth / size;
    let height = vewHeight / size;

    let btnRegenerate = '  <button id="regenerer" class="mazeSize generer btn btnMaze">Nouveau</button>';
    let infoMaze = '<div class=" d-flex flex-column align-items-start justify-content-between mt-5" style="width:' + width + 'px;"><p class="infoMaze">Taille : ' + size + ' </p><p class="infoMaze">Difficulté : ' + levelChoose + ' </p></div>'
    let labyrinthe = ' <div id="labyrinthe"  class="mt-5" style="width:' + width + 'px;"></div>';
    $(btnRegenerate).appendTo('#dash');
    $(infoMaze).appendTo('#dash');
    $(labyrinthe).appendTo('#dash');
    datas.forEach((item, index) => {
        let className = creatClass(item['walls']);
        let style = className.toString();
        let positionX = item['posY'] * width / size;
        let positionY = item['posX'] * height / size;
        let styleToAdd = style.replace(/,/g, " ");
        let square = '<div id="square-' + index + '" class= "square ' + styleToAdd + '" style="top:' + positionY + 'px;left: ' + positionX + 'px">' + index + '</div>';
        $(square).appendTo('#labyrinthe');

    });
}

//Représentation de la case de départ
function initStart(datas,vewWidth, vewHeight, size) {
    let width = vewWidth / size;
    let height = vewHeight / size;
    let positionX = datas[0]['posX'] * height / size;
    let positionY = datas[0]['posY'] * width / size;
    let start = '<div id="start" class= "start" style="top:' + positionY + 'px;left: ' + positionX + 'px"></div>';
    $(start).appendTo('#labyrinthe');
}

//Représentation de la case d'arrivé
function initFinish(datas,vewWidth, vewHeight, size) {
    let width = vewWidth / size;
    let height = vewHeight / size;
    let last = datas.length - 1;
    let positionX = datas[last]['posX'] * height / size;
    let positionY = datas[last]['posY'] * width / size;
    let finish = '<div id="finish" class= "finish" style="top:' + positionY + 'px;left: ' + positionX + 'px"></div>';
    $(finish).appendTo('#labyrinthe');
}

//initialisation du joueur sur le plateau
function initPlayer(playerPosition, datas,vewWidth, vewHeight, size, stack, s) {
    let width = vewWidth / size;
    let height = vewHeight / size;
    let positionX = datas[0]['posX'] * height / size;
    let positionY = datas[0]['posY'] * width / size;
    let player = '<div id="player" class= "player" style="top:' + positionY + 'px;left: ' + positionX + 'px"><i class="fas fa-user"></i></div>';
    //let info = '<div class= "information"><p><i class="fas fa-arrow-right"></i> Bienvenue dans la partie !</p></div>';
    let startCase = {
        "case": 0,
        "x": positionX,
        "y": positionY,
    };
    playerPosition.push(startCase);
    $(player).appendTo('#labyrinthe');
    //$(info).appendTo('#theGAme');
    s.push(startCase);
    stack.push(startCase);
    //s[0]=startCase;
    //return startCase;
}

