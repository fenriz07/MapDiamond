<?php
/*
Plugin Name: MapDistributor
Description: 
Version: 0.0.1
Author: Servio Zambrano 
Author URI: 
/*error_reporting(-1);
ini_set('display_errors', 'On');*/


$dir = trailingslashit(plugin_dir_path(__FILE__));
$uri = trailingslashit(plugin_dir_url(__FILE__));

require_once $dir  . 'vendor/autoload.php';

define('PLUGIN_MAP_DIR', $dir);
define('PLUGIN_MAP_URI', $uri);


Bootstrap\App::fire();
