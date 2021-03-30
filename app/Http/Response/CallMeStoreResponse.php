<?php namespace App\Http\Response;

trait CallMeStoreResponse
{
    public function response($status,$payload)
    {
        return wp_send_json([
            'status'  => $status,
            'payload' => $payload,
        ]);
    }
}
