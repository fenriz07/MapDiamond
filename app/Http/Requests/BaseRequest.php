<?php namespace App\Http\Requests;

use GUMP;

class BaseRequest 
{    
    protected $rules = [];

    protected function is_valid()
    {
        $gump = new GUMP();

        $gump->validation_rules($this->rules);

        $valid_data = $gump->run($_POST);

        if ( $gump->errors() ) {
           return $gump->get_errors_array();
        } else {
           return true;
        }        
    }

    public function getRequest()
    {
        $request = [];

        foreach ($this->rules as $key => $rule) {
            $request[$key] = $_POST[$key] ?? $_FILES[$key];
        }

        return (object) $request;
    }
}
