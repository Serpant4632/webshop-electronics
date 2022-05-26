<!-- Abfrage welche Bestellungen ich als Kunde oder ein Kunde bereits getätigt hat -->
<?php
require_once __DIR__ . './../services/userDatabaseService.php';
require_once __DIR__ . './../services/httpEndpointHelper.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://127.0.0.1:5500');

$database = new PDO('mysql:host=127.0.0.1;dbname=webshopDatabase', "root", "");
$userDatabaseService = new userDatabaseService($database);

$httpMethod = $_SERVER['REQUEST_METHOD'];

$bodyString = file_get_contents('php://input');
$decodedBody = json_decode($bodyString, true);
parse_str($_SERVER['QUERY_STRING'], $params);

switch($httpMethod){
    case 'GET':
        $result = null;
        if ($params != null && $params['id'] != null ) { // && params['orderHistory'] != null)
            $result = $userDatabaseService->innerJoinOrderToUser($params['id']);
            if ($result == null) {
                HttpEndpointHelper::notFound();
                return;
            }
        } 
        else {
            //$result = $userDatabaseService->getAll();
            HttpEndpointHelper::wrongQuery();
        }
        echo json_encode($result);
        break;

}