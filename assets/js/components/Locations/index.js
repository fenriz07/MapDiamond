import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import Map from './Map';


export default function Locations (props) {

    const [region,setRegion] = useState(null);


    useEffect(  () => {
    
        let idMap = 'location-map;'

        if( document.getElementById(idMap) )
        {
            console.log("epdwad");

            const centerMap  = {lat:'-22.910063',lng:'-68.199762'}

            console.log(centerMap);

            map = new Map(idMap,centerMap,this);
        }else{
            "epa";
        }

        console.log("ajamm");
        console.log(document.getElementById(idMap));

    },[])


return (

    <div className="row">

        <Filter/>

        <div>
            <div id="location-map">

            </div>
        </div>

    </div>

);
};
