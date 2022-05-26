<?php
require_once(__DIR__ . './services/productDatabaseService.php');
// require_once(__DIR__ . './../services/httpEndpointHelper.php');

// path http://localhost/ordner/datei/

// HttpEndpointHelper::test();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://127.0.0.1:5500');

$database = new PDO('mysql:host=127.0.0.1;dbname=productDatabase', "root", "");
$databaseContentService = new DatabaseContentService($database);

$httpMethod = $_SERVER['REQUEST_METHOD'];

$bodyString = file_get_contents('php://input');
$decodedBody = json_decode($bodyString, true);
parse_str($_SERVER['QUERY_STRING'], $params);

switch ($httpMethod) {
    case "GET":
        $result = null;
        if ($params != null && $params['id'] != null) {
            $result = $databaseContentService->getById($params['id']);
            if ($result == null) {
                // set 404 - Not Found
                notFound();
                return;
            }
        } else {
            $result = $databaseContentService->getAll();
        }
        echo json_encode($result);
        break;
    case "POST":
        // parse http body
        // json string to php array
        // INSERT INTO database

        // $bodyString = file_get_contents('php://input');
        // $decodedBody = json_decode($bodyString, true);


        $id = $decodedBody['id'];
        $text = $decodedBody['text'];
        $title = $decodedBody['title'];

        // // check if body already exists
        if ($databaseContentService->isExisting($id)) {
            duplicatedId();
            return;
        }

        // insert into db if not exists
        $databaseContentService->add($decodedBody);
        $result = $databaseContentService->getById($id);
        echo json_encode($result);
        http_response_code(201);
        break;
    case "PATCH":
        // get and parse http hody
        // check if entity in db --> else 404
        // update entity in db with latest properties

        $id = $decodedBody['id'];
        $text = $decodedBody['text'];
        $title = $decodedBody['title'];

        // check if entity already exists in database
        if (!$databaseContentService->isExisting($id)) {
            // set 404 - Not Found
            notFound();
            return;
        }

        $databaseContentService->update($decodedBody);
        $result = $databaseContentService->getById($id);
        echo json_encode($result);
        http_response_code(200);
        break;
    case "DELETE":
        // id in query string
        // echo $_SERVER['QUERY_STRING'];

        // check if id in query string of http request
        if ($params == null || $params['id'] == null) {
            http_response_code(400);
            echo 'id not set';
            return;
        }

        $id = $params['id'];
        // check if entity already exists in database
        if (!$databaseContentService->isExisting($id)) {
            // set 404 - Not Found
            notFound();
            return;
        }

        $result = $databaseContentService->getById($id);
        $databaseContentService->deleteById($id);
        echo json_encode($result);
        break;
    default:
        http_response_code(400);
        echo 'Unsupported HTTP method';
        break;
}

function notFound()
{
    http_response_code(404);
    echo 'entity not found';
}

function duplicatedId()
{
    echo 'duplicated id';
    http_response_code(409);
}
