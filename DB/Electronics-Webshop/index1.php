<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://127.0.0.1:5500');

$database = new PDO('mysql:host=127.0.0.1;dbname=webshopDatabase', "root", "");
$httpMethod = $_SERVER['REQUEST_METHOD'];

$bodyString = file_get_contents('php://input');
$decodedBody = json_decode($bodyString, true);

switch ($httpMethod) {
    case "GET":
        $query = 'SELECT * FROM userDatabase';
        $statement = $database->prepare($query);
        $statement->execute();
        $data = $statement->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
        break;
    case "POST":
        // parse http body
        // json string to php array
        // INSERT INTO database

        // $bodyString = file_get_contents('php://input');
        // $decodedBody = json_decode($bodyString, true);

        $id = $decodedBody['id'];
        $email = $decodedBody['email'];
        $address = $decodedBody['address'];
        $password = $decodedBody['password'];
        $firstName = $decodedBody['firstName'];
        $lastName = $decodedBody['lastName'];

        // check if body already exists
        $selectQuery = 'SELECT COUNT(id) from userDatabase WHERE id = ' . $id;
        $statement = $database->prepare($selectQuery);
        $statement->execute();
        $data = $statement->fetchAll();

        $count = $data[0][0];
        if ($count > 0) {
            echo 'duplicate id';
            http_response_code(409);
            return;
        }

        // insert into db if not exists
        $insertQuery = 'INSERT INTO userDatabase (id, email, address, password, firstName, lastName) VALUES (' . $id . ', "' . $email . '", "' . $address . '", "' .$password .'", "' . $firstName . '", "' . $lastName . '" )';
        $statement = $database->prepare($insertQuery);
        $statement->execute();
        echo $bodyString;
        http_response_code(201);
        break;
    case "PATCH":
        // get and parse http hody
        // check if entity in db --> else 404
        // update entity in db with latest properties

        $id = $decodedBody['id'];
        $email = $decodedBody['email'];
        $address = $decodedBody['address'];
        $password = $decodedBody['password'];
        $firstName = $decodedBody['firstName'];
        $lastName = $decodedBody['lastName'];

        // check if entity already exists in database
        $selectQuery = 'SELECT COUNT(id) from userDatabase WHERE id = ' . $id;
        $statement = $database->prepare($selectQuery);
        $statement->execute();
        $data = $statement->fetchAll();

        $count = $data[0][0];
        if ($count == 0) {
            echo 'entity not found';
            // set 404 - Not Found
            http_response_code(404);
            return;
        }

        $updateQuery = 'UPDATE userDatabase SET email="' . $email .'", address="' . $address .'", password="' . $password .'", firstName="' . $firstName .'", lastName="' . $lastName .'" WHERE id=' . $id;
        $statement = $database->prepare($updateQuery);
        $statement->execute();
        echo $bodyString;
        http_response_code(200);
        break;
    case "DELETE":
        // id in query string
        // echo $_SERVER['QUERY_STRING'];
        parse_str($_SERVER['QUERY_STRING'], $params);
        // check if id in query string of http request
        if ($params == null || $params['id'] == null) {
            http_response_code(400);
            echo 'id not set';
            return;
        }

        $id = $params['id'];
        // check if entity already exists in database
        $selectQuery = 'SELECT COUNT(id) from userDatabase WHERE id = ' . $id;
        $statement = $database->prepare($selectQuery);
        $statement->execute();
        $data = $statement->fetchAll();

        $count = $data[0][0];
        if ($count == 0) {
            echo 'entity not found';
            // set 404 - Not Found
            http_response_code(404);
            return;
        }

        $deleteQuery = 'DELETE FROM userDatabase WHERE id =' . $id;
        $statement = $database->prepare($deleteQuery);
        $statement->execute();
        echo 'success';
        http_response_code(200);
        break;
    default:
        http_response_code(400);
        echo 'Unsupported HTTP method';
        break;
}
