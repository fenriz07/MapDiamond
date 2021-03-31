<?php

namespace Bootstrap;

class App
{
    use Loader;

    private static $_instance     = null;
    private $versionAssets = 1;

    private function __construct()
    {
        $this->loadDir('routes');
        $this->loadDir('config');
        add_action('wp_enqueue_scripts', [$this, 'initCss']);
        add_action('wp_enqueue_scripts', [$this, 'initJs']);
    }

    public static function fire()
    {

        if (self::$_instance === null) {
            self::$_instance = new self;
        }

        return self::$_instance;
    }

    public function __clone()
    {
        trigger_error('La clonación de este objeto no está permitida', E_USER_ERROR);
    }


    public function initCss()
    {
        wp_register_style('map-app-css', PLUGIN_MAP_URI . 'assets/app/bundle.css', '',  $this->versionAssets);
        wp_enqueue_style('map-app-css');
    }

    public function initJs()
    {
        wp_register_script('map-mzzo-app-js',  PLUGIN_MAP_URI .  'assets/app/bundle.js', '', $this->versionAssets);

        wp_enqueue_script('map-mzzo-app-js');
    }
}
