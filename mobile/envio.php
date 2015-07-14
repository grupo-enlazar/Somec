<?php
$nombre = $_POST['nombre'] ;
$email = $_POST['email'] ;
$mensaje = $_POST['mensaje'] ;


$header = 'From:'.$email."\r\n";
$header .= 'X-Mailer: PHP/' . phpversion();

$mensaje = 'estos son los datos enviados desde el formulario:
Nombre: '.$nombre.'
Email: '.$email.'
Mensaje: '.$mensaje;
$para = "comercialymercadeo@somecoop.com";
$asunto = "contacto de ". $nombre;

$validar = filter_var($email, FILTER_VALIDATE_EMAIL);
if ($validar) {
    mail($para,$asunto,utf8_decode($mensaje),$header);
}
header('Location: envio.html');
?>