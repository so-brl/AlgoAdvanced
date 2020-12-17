<?php
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
    <img class="mt-5" src="assets/LABYRINTHE.png">
    <div id="makeAChoice"class=" d-flex flex-column  align-items-center justify-content-center">
        <div class=" d-flex flex-column  align-items-center justify-content-center">
            <p class="makeChoice mt-5"> Choisissez une taille :</p>
            <div class=" d-flex flex-row flex-wrap justify-content-center">
                <?php
                $mazes = maze();
                foreach ($mazes as $key => $value) {
                    ?>
                    <button id="<?php echo $key ?>" class="mazeSize size btn btnMaze"><?php echo $key ?></button>
                    <?php
                    $levels = $value;
                    foreach ($levels as $key => $value) {
                        if (!in_array($key, $level)) {
                            array_push($level, $key);
                        }
                    }
                }
                ?>
            </div>
        </div>
        <div class=" d-flex flex-column  align-items-center justify-content-center">
            <p class="makeChoice mt-4"> Choisissez une difficulté :</p>
            <div class=" d-flex flex-row justify-content-center">
                <?php
                foreach ($levels as $key => $value) {
                    switch ($key) {
                        case "ex-0":
                            $theLevel = 'Easy';
                            break;
                        case "ex-1":
                            $theLevel = 'Medium';
                            break;
                        case "ex-2":
                            $theLevel = 'Hard';
                            break;
                    }
                    ?>
                    <button id="<?php echo $key ?>"
                            class="level hardChoice btn btnMaze"><?php echo $theLevel ?></button>
                    <?php
                    $levels = $value;
                }
                ?>
            </div>

        </div>
        <button id="generer" class="generer mazeSize btn btnMaze mt-5">Générer</button>
    </div>



</section>


<section  class=" d-flex flex-column  align-items-center justify-content-center">

    <section id="dash" class="plateau mt-5  d-flex flex-column  align-items-center justify-content-center"></section>


</section>
<div id="theGAme" >
</div>

<footer>

</footer>
<!--<script>-->
<!--    let typeOfLabyrinthe =--><?php //echo $typeOfLabyrinthe ?>
<!--//    let labyrinthe =--><?php ////echo json_encode($labyrinthe) ?><!--//;-->
<!--//-->
<!--//</script>-->
<script src="https://kit.fontawesome.com/f22bcd2384.js" crossorigin="anonymous"></script>
<script
        src="https://code.jquery.com/jquery-3.5.1.js"
        integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
        crossorigin="anonymous"></script>
<script src="assets/maze.js"></script>
<!--<script src="assets/script.js"></script>-->
<script>

    // var myObj = function(){
    //     this.property = 'foo';
    //     this.bar = function(){
    //     }
    // }
    // myObj.prototype.objProp = true;
    // var newObj = new myObj();
    //
    // console.log(newObj);
</script>
</body>
</html>
