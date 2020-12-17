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
        // $('#makeAChoice').remove();
        let labyrinthe = [];
        $.getJSON("./labyrinthes.json", function (data) {
            let mazeData = data[size][level];
            for (let i = 0; i <mazeData.length; i++) {
                mazeData[i]['isVisited'] = false;
                mazeData[i]['neighbours'] = findAllechoices(mazeData[i]['walls'], i, Number(size));
                mazeData[i]['class'] =creatClass(mazeData[i]['walls']) ;
                mazeData[i]['case'] =i;
                }
            labyrinthe = mazeData;

            /** INITIALISATION DE LA PARTIE **/
            initGame(playerPosition, mazeData, stack, s, vewWidth, vewHeight, size, level);

            //DFS_iterative(mazeData, s,Number(size),vewWidth, vewHeight);
            //DFS_recurcive(stack[0], labyrinthe,turn,vewWidth, vewHeight,size);

            BFS(labyrinthe, s,size,vewWidth, vewHeight);
        });
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
            case: Number(goTo),
            current: key
        });
    }
    if (!walls[1]) {
        let goTo = key + 1;
        choices.push({
            text: 'la droite',
            x: +1,
            y: 0,
            case: Number(goTo),
            current: key
        });
    }
    if (!walls[2]) {
        let goTo = (key+size);
        choices.push({
            text: 'le bas',
            x: 0,
            y: +1,
            case: Number(goTo),
            current: key
        });
    }
    if (!walls[3]) {
        let goTo = key - 1;
        choices.push({
            text: 'la gauche',
            x: 1,
            y: 0,
            case: Number(goTo),
            current: key
        });
    }
    return choices;
}






async function BFS(labyrinthe, s,size,vewWidth, vewHeight) {
    let queue = [];
    let finish = labyrinthe.length - 1;
    updateQueue(s[0], queue, labyrinthe);
    while (queue.length > 0) {
        let v = queue.shift();
        console.log('Vous êtes sur la case n°' + v['case']);
        if (v['case'] == finish) {
            updatPlayerPosition(v, vewWidth, vewHeight,size);
            console.log('------Vous êtes arrivé sur la case n°' + v['case'] + '------');
            console.log('------LA PARTIE EST FINNI VOUS ETES SORTIE------');
            return v;
        }
        updatPlayerPosition(v,vewWidth, vewHeight,size);
        await new Promise(resolve => setTimeout(resolve, 50));
        let neighbours = getNeighbours(v, labyrinthe,size);
        for (let i = 0; i < neighbours.length; i++) {
            let neighbourCaseData = neighbours[i];
            let neighbourCase = neighbourCaseData.case;
            if (!labyrinthe[neighbourCase]['isVisited']) {
                let neighbourToPush = {
                    "case": labyrinthe[neighbourCase]['case'],
                    "x": labyrinthe[neighbourCase]['posY']  ,
                    "y": labyrinthe[neighbourCase]['posX']
                };
                updateStack(neighbourToPush, queue, labyrinthe);

            }
        }
    }
    return false;
}


async function DFS_recurcive(v, labyrinthe, turn,vewWidth, vewHeight,size) {
    let finish = labyrinthe.length - 1;
    labyrinthe[v['case']]['isVisited'] = true;
    console.log('Vous êtes sur la case n°' + v['case']);

    if (v['case'] == finish) {
        updatPlayerPosition(v,vewWidth, vewHeight,size);
        console.log('------Vous êtes arrivé sur la case n°' + v['case'] + '------');
        console.log('------LA PARTIE EST FINNI VOUS ETES SORTIE EN ' + turn + ' DEPLACEMENTS------');
        return true;
    }
    updatPlayerPosition(v,vewWidth, vewHeight,size);
    await new Promise(resolve => setTimeout(resolve, 50));
    let neighbours = getNeighbours(v, labyrinthe,size);
    for (let i = 0; i < neighbours.length; i++) {
        turn++;
        let neighbourCaseData = neighbours[i];
        let neighbourCase = neighbourCaseData.case;
        if (!labyrinthe[neighbourCase]['isVisited']) {
            let neighbourToPush = {
                "case": labyrinthe[neighbourCase]['case'],
                "x": labyrinthe[neighbourCase]['posY'],
                "y": labyrinthe[neighbourCase]['posX']
            };

            let isFinnish = await DFS_recurcive(neighbourToPush, labyrinthe, turn,vewWidth, vewHeight,size);
            if (isFinnish) {
                return isFinnish;
            }
        }
    }
}


async function DFS_iterative(labyrinthe, s,size,vewWidth, vewHeight) {
    let stack = [];
    let finish = labyrinthe.length - 1;
    let turn = 0;
    updateStack(s[0], stack, labyrinthe);
    while (stack.length > 0) {
        turn++;
        let v = stack.pop();
        console.log('Vous êtes sur la case n°' + v['case']);
        if (v['case'] == finish) {
            updatPlayerPosition(v,vewWidth, vewHeight,size);
            console.log('------Vous êtes arrivé sur la case n°' + v['case'] + '------');
            console.log('------LA PARTIE EST FINNI VOUS ETES SORTIE EN ' + turn + ' DEPLACEMENTS------');
            break;
        }
        updatPlayerPosition(v,vewWidth, vewHeight,size);
        await new Promise(resolve => setTimeout(resolve, 50));
        let neighbours = getNeighbours(v, labyrinthe,size);
        for (let i = 0; i < neighbours.length; i++) {
            let neighbourCaseData = neighbours[i];
            let neighbourCase = neighbourCaseData.case;
            if (!labyrinthe[neighbourCase]['isVisited']) {
                let neighbourToPush = {
                    "case": labyrinthe[neighbourCase]['case'],
                    "x": labyrinthe[neighbourCase]['posY']  ,
                    "y": labyrinthe[neighbourCase]['posX']
                };
                updateStack(neighbourToPush, stack, labyrinthe);
            }
        }
    }
}

function updateStack($index, stack, labyrinthe) {
    stack.push($index);
    labyrinthe[$index.case]['isVisited'] = true;
}

function updateQueue($index, queue, labyrinthe) {
    queue.push($index);
    labyrinthe[$index['case']]['isVisited'] = true;
}

function getNeighbours(v, labyrinthe,size) {
    return labyrinthe[v['case']]['neighbours'];
}

function updatPlayerPosition(v,vewWidth, vewHeight,size) {
    let width = vewWidth / 2;
    let height = vewWidth/ 2;
    let thePlayer = $('.active');
    thePlayer.removeClass('active');
    let positionX = v['x']* height / size;
    let positionY = v['y']* width / size;
    let player = '<div class="active playerStyle" style="margin-left:' + width/size/4+ 'px;margin-top:' + height/size/4+ 'px;font-size:' + height/size/2+ 'px;height:' + height/size+ 'px;width:' + width/size+ 'px;top:' + positionY + 'px;left: ' + positionX + 'px"><i class="fas fa-user"></i></div>';
    //let info = '<div class= "information"><p><i class="fas fa-arrow-right"></i> Bienvenue dans la partie !</p></div>';
    //$(info).appendTo('#theGAme');
    $(player).appendTo('#labyrinthe');
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
    let width = vewWidth / 2;
    let height = vewWidth/ 2;

    let labyrinthe = ' <div id="labyrinthe"   style=" height:' + height + 'px;width:' + width + 'px;"></div>';
    $(labyrinthe).appendTo('#dash');
    datas.forEach((item, index) => {
        let className =item['class'];
        let style = className.toString();
        let positionX = item['posY'] * width / size;
        let positionY = item['posX'] * height / size;
        let styleToAdd = style.replace(/,/g, " ");
        let square = '<div id="square-' + index + '" class= "square ' + styleToAdd + '" style="height:' + height/size+ 'px;width:' + width/size+ 'px;top:' + positionY + 'px;left: ' + positionX + 'px"></div>';
        $(square).appendTo('#labyrinthe');

    });
}

//Représentation de la case de départ
function initStart(datas,vewWidth, vewHeight, size) {
    let width = vewWidth / 2;
    let height = vewWidth/ 2;
    let positionX = datas[0]['posX'] * height / size;
    let positionY = datas[0]['posY'] * width / size;
    let start = '<div id="start" class= "start" style="height:' + height/size+ 'px;width:' + width/size+ 'px;top:' + positionY + 'px;left: ' + positionX + 'px"></div>';
    $(start).appendTo('#labyrinthe');
}

//Représentation de la case d'arrivé
function initFinish(datas,vewWidth, vewHeight, size) {
    let width = vewWidth / 2;
    let height = vewWidth/ 2;
    let last = datas.length - 1;
    let positionX = datas[last]['posX'] * height / size;
    let positionY = datas[last]['posY'] * width / size;
    let finish = '<div id="finish" class= "finish" style="height:' + height/size+ 'px;width:' + width/size+ 'px;top:' + positionY + 'px;left: ' + positionX + 'px"></div>';
    $(finish).appendTo('#labyrinthe');
}

//initialisation du joueur sur le plateau
function initPlayer(playerPosition, datas,vewWidth, vewHeight, size, stack, s) {
    let width = vewWidth / 2;
    let height = vewWidth/ 2;
    let positionX = datas[0]['posX'] * height / size;
    let positionY = datas[0]['posY'] * width / size;
    let player = '<div id="player" class= "player active" style="margin-left:' + width/size/4+ 'px;margin-top:' + height/size/4+ 'px;font-size:' + height/size/2+ 'px;height:' + height/size+ 'px;width:' + width/size+ 'px;top:' + positionY + 'px;left: ' + positionX + 'px"><i class="fas fa-user"></i></div>';
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
    s[0]=startCase;
    //return startCase;
}

