import React, { useState, useEffect } from 'react';
import Region from './Region';
import Comuna from './Comuna';


export default function Filter(props) {

    const [region,setRegion] = useState(null);
    const [comuna,setComuna] = useState(null);


return (

    <div className="col-6 filter">

        <Region setRegion={setRegion}/>
        <Comuna region={region} comuna={comuna} setComuna={setComuna}/>

    </div>

);
};
