<?php
header('Access-Control-Allow-Origin: *');
include("../../clases/usuario.php");
$usuario = new usuario();
echo json_encode($usuario->listado());
?>