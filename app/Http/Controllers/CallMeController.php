<?php namespace App\Http\Controllers;

use \SoapClient;


use App\Http\Requests\CallMeStoreRequest;
use App\Http\Response\CallMeStoreResponse;
use App\Model\OptionModel;

class CallMeController
{
    use CallMeStoreResponse;
    
    private $url = '';

    public function store()
    {
        $request = new CallMeStoreRequest();     
        $request = $request->getRequest();

        $options = OptionModel::getOptions();

        $this->url = $options->url;

        $data = [
            'servicio' => $options->client_id,  
            'token'    => $options->token,
            'rut'      => $request->rut,
            'nombre'   => $request->name,
            'email'    => $request->email,
            'telefono' => $request->phone,
        ];

        libxml_disable_entity_loader(false);

        try {
        
            ini_set("soap.wsdl_cache_enabled", "0"); // disabling WSDL cache

            $client = new SoapClient($this->url, ['trace' => 1]);

            $result = $client->AgendarLlamada($data);

            if( $result->AgendarLlamadaResult->Codigo == 'ERROR' )
            {
                $status = 500;
                $msg = $result->AgendarLlamadaResult->Descripcion;

            }else if( $result->AgendarLlamadaResponse->Codigo == 'OK')
            {
                $status = 200;
                $msg = 'Te estaremos llamando en los próximos minutos';
            }

        } catch (\SoapFault $e) {

            $status = 500;
            $msg = $e->getMessage();

        } catch (\Exception $e) { 
            $status = 501;
            $msg = $e->getMessage();
        }

        return $this->response($status,$msg);

    }

}
