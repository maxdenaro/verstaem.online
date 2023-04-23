<?php

$host = 'https://verstaem.online/';
$title = 'Название';
$description = 'Описание';
$image = '/assets/img/pstshrng.jpg';
$redirect = '/';

?>
<!doctype html>
<html lang="ru">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width">
	<meta name="description" content="<?= htmlspecialchars($description) ?>">
	<meta property="og:type" content="website">
	<meta property="og:title" content="<?= htmlspecialchars($title) ?>">
	<meta property="og:description" content="<?= htmlspecialchars($description) ?>">
	<meta property="og:image" content="<?= htmlspecialchars($image ? $host . $image : '') ?>">
	<meta property="og:image:type" content="image/png">
	<meta property="og:image:width" content="968">
	<meta property="og:image:height" content="504">
	<meta property="og:locale" content="ru_RU">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="<?= htmlspecialchars($title) ?>">
	<meta name="twitter:description" content="<?= htmlspecialchars($description) ?>">
	<title><?= $title ?></title>
</head>
<body onload="window.location = '<?= $redirect ?>'"></body>
</html>
