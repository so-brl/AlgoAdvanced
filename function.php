<?php


function getLabyrintheData($number, $exercise)
{
    $exo = 'ex-' . $exercise;
    // chemin d'accès vers le fichier JSON
    $file = 'labyrinthes.json';
    // mettre le contenu du fichier dans une variable
    $data = file_get_contents($file);
    // décoder le flux JSON
    $obj = json_decode($data);

    // accéder à l'élément approprié
    return $obj->$number->$exo;
}


function updateLabyrintheData($labyrinthe, $typeOfLabyrinthe)
{
    // stocker les datas reçu dans une variable
    $datas = $labyrinthe;

    // création du nouveau tableau de data modifié
    $newDatas = [
        "start" => 0,
        "finish" => $typeOfLabyrinthe * $typeOfLabyrinthe,
        "totalCells" => $typeOfLabyrinthe * $typeOfLabyrinthe,
        "totalRows" => $typeOfLabyrinthe*1,
        "totalColumns" => $typeOfLabyrinthe*1,
        "cellDatas" => [],
    ];
    foreach ($datas as $index => $data) {
        $walls = $data->walls;
        //Stockage des nouvelles données dans  le tableau
        $newDatas['cellDatas'][$index+1] = [
            "cell"=>$index+1,
            "rowNumber" => $data->posY,
            "colNumber" => $data->posX,
            "walls" => [
                "topWall" => $walls[0],
                "rightWall" => $walls[1],
                "bottomWall" => $walls[2],
                "leftWall" => $walls[3]
            ]
        ];
    }
    return $newDatas;
}









//function updateLabyrintheData($labyrinthe,$typeOfLabyrinthe)
//{
//    // stocker les datas reçu dans une variable
//    $datas = $labyrinthe;
//    // initialiser un nouveau tableau pour le stockage des data modifié
//    $newDatas = [];
//    // création du nouveau tableau de data modifié
//    foreach ($datas as $index => $data) {
//        $walls = $data->walls;
//        $case = $index;
//        // stockage des classe pour chaque case
//        $class =  createClass($walls);
//        // stockage de la sortie pour chaque case
//        $choices = findchoices($walls,$index,$typeOfLabyrinthe);
//
//
//        //Stockage des nouvelles données dans  le tableau
//        $newDatas[$index] = [
//            "position-x" => $data->posY,
//            "position-y" => $data->posX,
//            "choices" => $choices,
//            "class"=>$class,
//            "case"=>$index,
//        ];
//    }
//    return $newDatas;
//}
//
//
//// création d'un tableau des zones de sorties pour chaque case
//function findchoices($walls,$index,$typeOfLabyrinthe){
//    $choices=[];
//    $actual = $index;
//    if ($walls[0] == false) {
//
//        $goTo=$index - $typeOfLabyrinthe;
//        array_push($choices, ['le haut',0,-1,$goTo,$actual]);
//    }
//    if ($walls[1]==false) {
//        $goTo=$index + 1;
//        array_push($choices, ['la droite',+1,0,$goTo,$actual]);
//    }
//    if ($walls[2]==false) {
//        $goTo=$index + $typeOfLabyrinthe;
//        array_push($choices, ['le bas',0,+1,$goTo,$actual]);
//    }
//    if ($walls[3]==false) {
//        $goTo=$index -1;
//        array_push($choices, ['la gauche',-1,0,$goTo,$actual]);
//    }
//    return $choices;
//}
//
//
//// création d'un tableau de class permettant de gérer l'affichage des murs
//function createClass($walls){
//    $class=[];
//    if ($walls[0]==true) {
//        array_push($class, 'wall-top');
//    }
//    if ($walls[1]==true) {
//        array_push($class, 'wall-right');
//    }
//    if ($walls[2]==true) {
//        array_push($class, 'wall-bottom');
//    }
//    if ($walls[3]==true) {
//        array_push($class, 'wall-left');
//    }
//    return $class;
//}

