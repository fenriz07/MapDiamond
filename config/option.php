<?php

use WP_Customize_Media_Control as CMC;

if ( !defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

function callActionMzzoOptionTheme($wp_customize)
{
    /* Just use the $wp_customize object and create a section or use a built-in
       section. */
       $wp_customize->add_section(
            'call_action_mzzo',
            [
                'title'       => 'Call Action',
                'priority'    => 30,
            ]
        );


        $wp_customize->add_setting(
            'id_call_action_esmax',
            [
                'default'    => '',
                'capability' => 'edit_theme_options',
            ]
        );

        $wp_customize->add_setting(
            'token_call_action_esmax',
            [
                'default'    => '',
                'capability' => 'edit_theme_options',
            ]
        );

        $wp_customize->add_setting(
            'url_call_action_esmax',
            [
                'default'    => '',
                'capability' => 'edit_theme_options',
            ]
        );


        $wp_customize->add_control( new CMC( $wp_customize, 'id_call_action_esmax', array(
            'label'     => 'ID',
            'section'   => 'call_action_mzzo', // Required, core or custom.
            'type'      => 'text',
        )));

        $wp_customize->add_control( new CMC( $wp_customize, 'token_call_action_esmax', array(
            'label'     => 'Token',
            'section'   => 'call_action_mzzo', // Required, core or custom.
            'type'      => 'text',
        )));

        $wp_customize->add_control( new CMC( $wp_customize, 'url_call_action_esmax', array(
            'label'     => 'Url',
            'section'   => 'call_action_mzzo', // Required, core or custom.
            'type'      => 'text',
        )));


}

add_action('customize_register', 'callActionMzzoOptionTheme');

