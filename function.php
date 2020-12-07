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


function updateLabyrintheData($labyrinthe)
{
    // stocker les datas reçu dans une variable
    $datas = $labyrinthe;
    // initialiser un nouveau tableau pour le stockage des data modifié
    $newDatas = [];
    // création du nouveau tableau de data modifié
    foreach ($datas as $index => $data) {
        $walls = $data->walls;
        // stockage des classe pour chaque case
        $class =  createClass($walls);
        // stockage de la sortie pour chaque case
        $choices = findchoicese($walls);


        //Stockage des nouvelles données dans  le tableau
        $newDatas[$index] = [
            "position-x" => $data->posY,
            "position-y" => $data->posX,
            "choices" => $choices,
            "class"=>$class,
        ];
    }
    return $newDatas;
}


// création d'un tableau des zones de sorties pour chaque case
function findchoicese($walls){
    $choices=[];
    if ($walls[0] == false) {

        array_push($choices, 'le haut');
    }
    if ($walls[1]==false) {
        array_push($choices, 'la droite');
    }
    if ($walls[2]==false) {
        array_push($choices, 'le bas');
    }
    if ($walls[3]==false) {
        array_push($choices, 'la gauche');
    }
    return $choices;
}


// création d'un tableau de class permettant de gérer l'affichage des murs
function createClass($walls){
    $class=[];
    if ($walls[0]==true) {
        array_push($class, 'wall-top');
    }
    if ($walls[1]==true) {
        array_push($class, 'wall-right');
    }
    if ($walls[2]==true) {
        array_push($class, 'wall-bottom');
    }
    if ($walls[3]==true) {
        array_push($class, 'wall-left');
    }
    return $class;
}

