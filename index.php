<?php
include 'function.php';
$scriptName = 'dfs';

//$mazeNumber = mazeNumber();
//var_dump($mazeNumber);

$typeOfLabyrinthe = '24';
$exerciseNumber = '0';
$getLabyrintheData = getLabyrintheData($typeOfLabyrinthe, $exerciseNumber);
$labyrinthe = updateLabyrintheData($getLabyrintheData, $typeOfLabyrinthe);

?>

<!DOCTYPE html>
<html>
<head>
    <title>Labirynthe - Algo Avancé</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
          integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="/assets/styles.css" media="screen"/>
</head>
<body>
<!--<section class="container d-flex flex-row justify-contents-center">-->
<!--    <canvas class="maze"></canvas>-->
<!--</section>-->



<section>
    <section class="plateau">
        <div id="labyrinthe" >
        </div>
    </section>


</section>
<div id="theGAme" >
</div>

<footer>

</footer>
<script>
    let typeOfLabyrinthe=<?php echo $typeOfLabyrinthe ?>;
    let labyrinthe =<?php echo json_encode($labyrinthe) ?>;

</script>
<script src="https://kit.fontawesome.com/f22bcd2384.js" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
<script src="assets/script.js"></script>
</body>
</html>
