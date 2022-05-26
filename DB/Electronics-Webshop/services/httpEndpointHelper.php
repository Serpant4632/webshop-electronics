<?php
class HttpEndpointHelper
{
    public static function notFound()
    {
        http_response_code(404);
        echo 'Entity not found';
    }

    public static function duplicatedID()
    {
        http_response_code(409);
        echo 'Duplicated id';
    }

    public static function ok()
    {
        http_response_code(201);
        echo 'Ok';
    }

    public static function forbidden()
    {
        http_response_code(403);
        echo 'Forbidden or unsupported HTTP method';
    }

    public static function wrongQuery()
    {
        http_response_code(400);
        echo 'Query not correct';
    }

}
