<?
header('Access-Control-Allow-Origin: *');
include("../../clases/login.php");
$login = new login(strtoupper($_POST['usuario']),$clave=$_POST['contrasena']);
echo json_encode($login->autenticar());
?>
