<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exeption.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail ->CharSet = 'UTF-8';
$mail ->setLanguage('ru', 'phpmailer/language/');
$mail ->IsHTML(true);

// от кого письмо
$mail->setFrom('nikolenkourij@gmail.com','Отзыв клиента' )
// кому отправить
$mail->addAddress('nikolenkourij@gmail.com');
// тема письма 
$mail->Subject = 'Получено новое письмо (отзыв клиента)';

// Рука
$hand = "Правая";
if($_POST['hand'] == "left") {
    $hand = "левая";
}
// тело письма
$body = '<h1>Поступио новое письмо</h1>';
if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['hand']))){
    $body.='<p><strong>Имя:</strong> '.$hand['hand'].'</p>';
}
if(trim(!empty($_POST['age']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['age'].'</p>';
}
if(trim(!empty($_POST['message']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['message'].'</p>';
}
// прикрепить файл
if (!empty($_FILES['image']['tmp_name'])){
    // путь загрузки файла 
    $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
    // загрузим файл
    if (copy($_FILES['image']['tmp_name'], $filePath)){
        $fileAttach = $filePath;
        $body.='<p><strong>Фото в приложении</strong>';
    }
}

$mail->Body = $body;

// отправляем 
if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены !';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>
