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

switch ($httpMethod) {

    case "GET":
        $result = null;
        if ($params != null && $params['id'] != null) {
            $result = $userDatabaseService->getById($params['id']);
            if ($result == null) {
                HttpEndpointHelper::notFound();
                return;
            }
        } else {
            $result = $userDatabaseService->getAll();
        }
        echo json_encode($result);
        break;

    case "POST":
        $id = $decodedBody['id'];
        $email = $decodedBody['email'];
        $address = $decodedBody['address'];
        $password = $decodedBody['password'];
        $firstName = $decodedBody['firstName'];
        $lastName = $decodedBody['lastName'];

        // // check if body already exists
        if ($userDatabaseService->isExisting($id)) {
            duplicatedId();
            return;
        }

        // insert into db if not exists
        $userDatabaseService->add($decodedBody);
        $result = $userDatabaseService->getById($id);
        echo json_encode($result);
        http_response_code(201);
        break;

    case "PATCH":
        $id = $decodedBody['id'];
        $email = $decodedBody['email'];
        $address = $decodedBody['address'];
        $password = $decodedBody['password'];
        $firstName = $decodedBody['firstName'];
        $lastName = $decodedBody['lastName'];

        // check if entity already exists in database
        if (!$userDatabaseService->isExisting($id)) {
            // set 404 - Not Found
            HttpEndpointHelper::notFound();
            return;
        }

        $userDatabaseService->update($decodedBody);
        $result = $userDatabaseService->getById($id);
        echo json_encode($result);
        http_response_code(200);
        break;

    case "DELETE":
        // check if id in query string of http request
        if ($params == null || $params['id'] == null) {
            HttpEndpointHelper::wrongQuery();
            return;
        }

        $id = $params['id'];
        // check if entity already exists in database
        if (!$userDatabaseService->isExisting($id)) {
            HttpEndpointHelper::notFound();
            return;
        }

        $result = $userDatabaseService->getById($id);
        $userDatabaseService->deleteById($id);
        echo json_encode($result);
        break;

    default:
        HttpEndpointHelper::Forbidden();
        break;
}
