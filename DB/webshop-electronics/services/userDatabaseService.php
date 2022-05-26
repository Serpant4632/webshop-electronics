<?php
class userDatabaseService
{
    private $database;

    public function __construct(PDO $database)
    {
        $this->database = $database;
    }

    public function isExisting($id)
    {
        // check if body already exists
        $selectQuery = 'SELECT COUNT(id) from userDatabase WHERE id = ' . $id;
        $statement = $this->database->prepare($selectQuery);
        $statement->execute();
        $data = $statement->fetchAll();
        $count = $data[0][0];
        $existing = $count > 0;
        return $existing;
    }

    public function getAll()
    {
        $query = 'SELECT * FROM userDatabase';
        $statement = $this->database->prepare($query);
        $statement->execute();
        $data = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }

    public function getById($id)
    {
        $query = 'SELECT * FROM userDatabase WHERE id = ' . $id;
        $statement = $this->database->prepare($query);
        $statement->execute();
        $data = $statement->fetchAll(PDO::FETCH_ASSOC);
        if (count($data) == 0) {
            return null;
        }

        $result = $data[0];
        return $result;
    }

    public function deleteById($id)
    {
        $deleteQuery = 'DELETE FROM userDatabase WHERE id =' . $id;
        $statement = $this->database->prepare($deleteQuery);
        $statement->execute();
    }

    public function update($updatedEntity)
    {
        $id = $updatedEntity['id'];
        $email = $updatedEntity['email'];
        $address = $updatedEntity['address'];
        $password = $updatedEntity['password'];
        $firstName = $updatedEntity['firstName'];
        $lastName = $updatedEntity['lastName'];

        // $updateQuery = 'UPDATE userDatabase SET title="' . $title . '", text= "' . $text . '" WHERE id=' . $id;
        $updateQuery = 'UPDATE userDatabase SET email=:email, password=:password, address=:address, firstName:=firstName, lastName:=lastName WHERE id=:id';
        $statement = $this->database->prepare($updateQuery);
        $statement->bindParam(':id', $id);
        $statement->bindParam(':email', $email);
        $statement->bindParam(':address', $address);
        $statement->bindParam(':password', $password);
        $statement->bindParam(':firstName', $firstName);
        $statement->bindParam(':lastName', $lastName);
        $statement->execute();
    }

    public function add($newEntity)
    {
        $id = $newEntity['id'];
        $email = $newEntity['email'];
        $address = $newEntity['address'];
        $password = $newEntity['password'];
        $firstName = $newEntity['firstName'];
        $lastName = $newEntity['lastName'];

        $insertQuery = 'INSERT INTO userDatabase (id, email, address, password, firstName, lastName) VALUES (' . $id . ', "' . $email . '", "' . $address . '", "' . $password . '", "' . $firstName . '", "' . $lastName . '" )';
        $statement = $this->database->prepare($insertQuery);
        $statement->execute();
    }

    public function innerJoinOrderToUser($id)
    {
        $query = 'SELECT * FROM userDatabase INNER JOIN ordersDatabase ON userDatabase.id = ordersDatabase.orderid WHERE orderID =' . $id;
        $statement = $this->database->prepare($query);
        // $statement->bindParam(':id', $id);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        if (count($result) == 0) {
            return null;
        }
        return $result;
    }
}
