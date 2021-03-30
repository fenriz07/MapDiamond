<?php

namespace App\Repositories;

use App\Http\Response\CallMeStoreResponse;

class Captcha
{
    use CallMeStoreResponse;

    public function __construct($action, $token)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array('secret' => '6Lf_HTMaAAAAAD5lCpxgQm09Ztyu3TMImtNVHceY', 'response' => $token)));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
        $arrResponse = json_decode($response, true);

        // verify the response
        if ($arrResponse["success"] == '1' && $arrResponse["action"] == $action && $arrResponse["score"] >= 0.5) {
            // valid submission
            // go ahead and do necessary stuff
        } else {
            $this->response(505,[
                'msg' => "Not pass captcha"
            ]);
        }
    }
}
