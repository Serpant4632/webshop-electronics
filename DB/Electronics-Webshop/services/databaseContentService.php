<?php
class DatabaseContentService
{
    private $database;

    public function __construct(PDO $database)
    {
        $this->database = $database;
    }

    public function isExisting($id)
    {
        // check if body already exists
        $selectQuery = 'SELECT COUNT(id) from database_content WHERE id = ' . $id;
        $statement = $this->database->prepare($selectQuery);
        $statement->execute();
        $data = $statement->fetchAll();
        $count = $data[0][0];
        $existing = $count > 0;
        return $existing;
    }

    public function getAll()
    {
        $query = 'SELECT * FROM database_content';
        $statement = $this->database->prepare($query);
        $statement->execute();
        $data = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }

    public function getById($id)
    {
        $query = 'SELECT * FROM database_content WHERE id = ' . $id;
        $statement = $this->database->prepare($query);
        $statement->execute();
        $data = $statement->fetchAll(PDO::FETCH_ASSOC);
        if (count($data) == 0)
            return null;
        $result = $data[0];
        return $result;
    }

    public function deleteById($id)
    {
        $deleteQuery = 'DELETE FROM database_content WHERE id =' . $id;
        $statement = $this->database->prepare($deleteQuery);
        $statement->execute();
    }

    public function update($updatedEntity)
    {
        $id = $updatedEntity['id'];
        $text = $updatedEntity['text'];
        $title = $updatedEntity['title'];

        // $updateQuery = 'UPDATE database_content SET title="' . $title . '", text= "' . $text . '" WHERE id=' . $id;
        $updateQuery = 'UPDATE database_content SET title=:title, text=:text WHERE id=:id';        
        $statement = $this->database->prepare($updateQuery);
        $statement->bindParam(':id', $id);
        $statement->bindParam(':title', $title);
        $statement->bindParam(':text', $text);
        $statement->execute();
    }

    public function add($newEntity)
    {
        $id = $newEntity['id'];
        $text = $newEntity['text'];
        $title = $newEntity['title'];

        $insertQuery = 'INSERT INTO database_content (id, title, text) VALUES (' . $id . ', "' . $title . '", "' . $text . '" )';
        $statement = $this->database->prepare($insertQuery);
        $statement->execute();
    }
}
