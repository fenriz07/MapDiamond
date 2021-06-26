<?php

namespace Bootstrap;


trait Loader
{

    public function loadDir($dir)
    {
        $directory = PLUGIN_MAP_DIR . $dir;

        foreach (glob("{$directory}/*.php") as $filename) {
            require_once $filename;
        }
    }

    public function loadFile($file)
    {
        require_once PLUGIN_MAP_DIR . $file . '.php';
    }
}
