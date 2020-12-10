jQuery(document).ready(function () {
    let playerPosition = [];
    let s = [];
    let setTime = 50;
    let stack = [];
    let turn = 0;
    let v = s;
    console.log(' -> labyrinthe ');
    console.log(labyrinthe);
    console.log(' ');


    /** INITIALISATION DE LA PARTIE **/
    initGame(playerPosition, labyrinthe,stack,s);

    /** LA PARTIE COMMENCE **/
    console.log(' ');
    console.log(' ');
    console.log('------LA PARTIE COMMENCE------');

    DFS_iterative(labyrinthe, s);
   //DFS_recurcive(stack[0], labyrinthe,turn);
    //BFS(labyrinthe, s);




});

async function BFS(labyrinthe, s) {
    let stack = [];
    let finish = labyrinthe.length - 1;
    updateStack(s[0], stack, labyrinthe);

    while (stack.length > 0) {
        let v = stack.pop();
        if (v['case'] == finish) {
            updatPlayerPosition(v);
            console.log('------LA PARTIE EST FINNI VOUS ETES SORTIE------');
            break;
        }
        updatPlayerPosition(v);
        await new Promise(resolve => setTimeout(resolve, 50));
        let neighbours = getNeighbours(v, labyrinthe);
        for (let i = 0; i < neighbours.length; i++) {
            let neighbourCase = neighbours[i]['case'];
            if (!labyrinthe[neighbourCase]['isVisited']) {
                let neighbourToPush = {
                    "case": labyrinthe[neighbourCase]['case'],
                    "x": labyrinthe[neighbourCase]['position-x'] * 100,
                    "y": labyrinthe[neighbourCase]['position-y'] * 100
                };
                updateStack(neighbourToPush, stack, labyrinthe);
            }
        }
    }
}


async function DFS_recurcive(v, labyrinthe,turn) {
    let finish = labyrinthe.length - 1;
    labyrinthe[v['case']]['isVisited'] = true;
    console.log('Vous êtes sur la case n°'+v['case']);

    if (v['case'] == finish) {
        updatPlayerPosition(v);
        console.log('------Vous êtes arrivé sur la case n°'+v['case']+'------');
        console.log('------LA PARTIE EST FINNI VOUS ETES SORTIE EN '+turn+' DEPLACEMENTS------');
        return true;
    }
    updatPlayerPosition(v);
    await new Promise( resolve => setTimeout(resolve, 50));
    let neighbours = getNeighbours(v, labyrinthe);
    for (let i = 0; i < neighbours.length; i++) {
        turn ++;
        let neighbourCase = neighbours[i]['case'];
        if (!labyrinthe[neighbourCase]['isVisited']) {
            let neighbourToPush = {
                "case": labyrinthe[neighbourCase]['case'],
                "x": labyrinthe[neighbourCase]['position-x'] * 100,
                "y": labyrinthe[neighbourCase]['position-y'] * 100
            };

            let isFinnish = await DFS_recurcive(neighbourToPush, labyrinthe,turn);
            if (isFinnish){
                return isFinnish;
            }
        }
    }
}



async function DFS_iterative(labyrinthe, s) {
    let stack = [];
    let finish = labyrinthe.length - 1;
    let turn = 0;
    updateStack(s[0], stack, labyrinthe);


    while (stack.length > 0) {
        turn++;
        let v = stack.pop();
        console.log('Vous êtes sur la case n°' + v['case']);
        if (v['case'] == finish) {
            updatPlayerPosition(v);
            console.log('------Vous êtes arrivé sur la case n°' + v['case'] + '------');
            console.log('------LA PARTIE EST FINNI VOUS ETES SORTIE EN ' + turn + ' DEPLACEMENTS------');
            break;
        }
        updatPlayerPosition(v);
        await new Promise(resolve => setTimeout(resolve, 50));
        let neighbours = getNeighbours(v, labyrinthe);
        for (let i = 0; i < neighbours.length; i++) {

            let neighbourCase = neighbours[i]['case'];
            if (!labyrinthe[neighbourCase]['isVisited']) {
                let neighbourToPush = {
                    "case": labyrinthe[neighbourCase]['case'],
                    "x": labyrinthe[neighbourCase]['position-x'] * 100,
                    "y": labyrinthe[neighbourCase]['position-y'] * 100
                };

                updateStack(neighbourToPush, stack, labyrinthe);
            }
        }
    }
}

function updateStack($index, stack, labyrinthe) {
    stack.push($index);
    labyrinthe[$index['case']]['isVisited'] = true;
}



function getNeighbours(v, labyrinthe) {
    return labyrinthe[v['case']]['neighbours'];
}

function updatPlayerPosition(v) {
    let thePlayer = $('.active');
    thePlayer.addClass('visited');
    thePlayer.removeClass('active');
    let positionX = v['x'];
    let positionY = v['y'];
    let player = '<div class="active playerStyle" style="top:' + positionY + 'px;left: ' + positionX + 'px"><i class="fas fa-user"></i></div>';
    //let info = '<div class= "information"><p><i class="fas fa-arrow-right"></i> Bienvenue dans la partie !</p></div>';
    //$(info).appendTo('#theGAme');
    $(player).appendTo('#labyrinthe');
}

/** ---------------------------------FONTION D'INITIALISATION DE LA PARTIE ---------------------------------**/
//initialiasation global
function initGame(playerPosition, labyrinthe,stack,s) {
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
    initPlayer(playerPosition, labyrinthe,stack,s);
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
function initPlayer(playerPosition, labyrinthe,stack,s) {
    let positionX = labyrinthe[0]['position-x'] * 100;
    let positionY = labyrinthe[0]['position-y'] * 100;
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