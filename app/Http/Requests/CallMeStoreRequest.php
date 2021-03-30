<?php namespace App\Http\Requests;

use App\Repositories\Captcha;
use App\Http\Response\CallMeStoreResponse;

class CallMeStoreRequest extends BaseRequest
{
    use CallMeStoreResponse;

    protected $rules = [
        'rut'                  => 'required|max_len,25',
        'name'                 => 'required|alpha_numeric_space|max_len,25',
        'email'                => 'required|valid_email',
        'phone'                => 'required|numeric',
    ];

    public function __construct()
    {
        $isValid = $this->is_valid();

        new Captcha($_POST['action'],$_POST['token']);

        if( $isValid !== true )
        {
           $this->response(403,$isValid);
        }

        $nonce = sanitize_text_field($_POST['nonce']);

        if (!wp_verify_nonce($nonce, 'callme-nonce')) {
            die('Busted!');
        }
    }
}
