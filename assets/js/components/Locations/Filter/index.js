import React, { useState, useEffect } from 'react';
import Region from './Region';
import Comuna from './Comuna';


export default function Filter(props) {

    const [region,setRegion] = useState(null);
    const [comuna,setComuna] = useState(null);
    const {setCenter} = props;


return (

    <div className="col-6 filter">

        <Region setRegion={setRegion}/>
        <Comuna setCenter={setCenter} region={region} comuna={comuna} setComuna={setComuna}/>

    </div>

);
};
