<?php

use App\Http\Controllers\CallMeController;

add_action('wp_ajax_callme',  [ new CallMeController(),'store' ] );
add_action('wp_ajax_callme',  [ new CallMeController(),'store' ] );