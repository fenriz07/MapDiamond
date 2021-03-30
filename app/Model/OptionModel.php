<?php namespace App\Model;

class OptionModel
{

    private static $client_id = false;
    private static $token    = false;
    private static $url  = false;

    private static function loadOptions()
    {

        self::$client_id = get_theme_mod('id_call_action_esmax', 47);
        self::$token     = get_theme_mod('token_call_action_esmax', 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiY2xpZW50ZSIsIklzc3VlciI6InBldHJvYnJhcyIsIlVzZXJuYW1lIjoiZWNjIiwiZXhwIjoxNjA3MDkxMzkxLCJpYXQiOjE2MDcwOTEzOTF9.cdwnBFSSsyRvvbemltTugdLJ_i9DOVcI6R14HC1ZC7Y');
        self::$url       = get_theme_mod('url_call_action_esmax', 'https://eccnetserver.entelcallcenter.cl/ws_api_c2c/ws_api_c2c.asmx?wsdl');
    }

    public static function getOptions()
    {
        self::loadOptions();

        return (object) [
            'client_id' => self::$client_id,
            'token'     => self::$token,
            'url'       => self::$url,
        ];
    }


 

}
