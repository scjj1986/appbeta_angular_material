<?
header('Access-Control-Allow-Origin: *');
include("../../clases/recuperar-contrasena.php");
$rc = new recuperarContrasena();
echo json_encode($rc->cambiarClave(strtoupper($_POST["usuario"]),$_POST["clave"]));
?>