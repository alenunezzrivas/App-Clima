<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Se verifica si se ha proporcionado el parámetro 'ciudad' en la URL.
// Si no se ha proporcionado, se muestra un mensaje de error en formato JSON y se detiene la ejecución.
if (!isset($_GET['ciudad'])) {
    echo json_encode(["error" => "No se proporcionó una ciudad"]);
    exit;
}


$ciudad = urlencode($_GET['ciudad']);
$apiKey = "e665f25de116e475e89a42eed73a22e5";
$url = "https://api.openweathermap.org/data/2.5/weather?q={$ciudad}&appid={$apiKey}&units=metric&lang=es";

$respuesta = file_get_contents($url);

// Si la respuesta es falsa, significa que hubo un problema al conectar con la API, por lo que muestra un error en formato JSON.
if (!$respuesta) {
    echo json_encode(["error" => "Error al conectar con OpenWeatherMap"]);
    exit;
}

$datos = json_decode($respuesta, true);

// Verifica si el código de respuesta de la API es diferente de 200, lo que indica que hubo un problema (por ejemplo, la ciudad no se encontró).
// Si es el caso, muestra un mensaje de error en formato JSON y detiene la ejecución.
if ($datos["cod"] !== 200) {
    echo json_encode(["error" => "Ciudad no encontrada"]);
    exit;
}

// Si todo va bien, se envían los datos relevantes de la ciudad en formato JSON.
echo json_encode([
    "nombre" => $datos["name"],
    "pais" => $datos["sys"]["country"],
    "latitud" => $datos["coord"]["lat"],
    "longitud" => $datos["coord"]["lon"],
    "temperatura" => $datos["main"]["temp"] . "°C",
    "humedad" => $datos["main"]["humidity"] . "%",
    "clima" => $datos["weather"][0]["description"]
]);
?>
