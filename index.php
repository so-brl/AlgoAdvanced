<?php
//include 'function.php';
//$scriptName = 'dfs';
//
////$mazeNumber = mazeNumber();
////var_dump($mazeNumber);
//
//$typeOfLabyrinthe = '24';
//$exerciseNumber = '0';
//$getLabyrintheData = getLabyrintheData($typeOfLabyrinthe, $exerciseNumber);
//$labyrinthe = updateLabyrintheData($getLabyrintheData, $typeOfLabyrinthe);
$level = [];


function maze (){
    $file = 'labyrinthes.json';
    // mettre le contenu du fichier dans une variable
    $data = file_get_contents($file);
    // décoder le flux JSON
    $obj = json_decode($data);
    return $obj;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Labirynthe - Algo Avancé</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
          integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="/labyrinthe/assets/styles.css" media="screen"/>
</head>
<body>

<section class="container d-flex flex-column  align-items-center justify-content-center">
    <a class="mt-5 d-flex flex-column  align-items-center" href="labyrinthe/index-labyrinthe.php"><img class="mt-5 mb-2" src="labyrinthe/assets/LABYRINTHE.png">Algorithmes de parcours en profondeur & en largeur</a>
   <a class="mt-5 d-flex flex-column  align-items-center" href="tri/index.html"><img class="mt-5 mb-2" style="width: 150px" src="tri/octopus.png">Algorithmes de tries</a>
</section>



<footer>

<script src="https://kit.fontawesome.com/f22bcd2384.js" crossorigin="anonymous"></script>
<script
        src="https://code.jquery.com/jquery-3.5.1.js"
        integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
        crossorigin="anonymous"></script>
<script src="labyrinthe/assets/maze.js"></script>
<script>
</script>
</body>
</html>
