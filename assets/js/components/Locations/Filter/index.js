import React, { useState, useEffect } from 'react';
import Region from './Region';
import Comuna from './Comuna';


export default function Filter(props) {

    const [region,setRegion] = useState(null);
    const [comuna,setComuna] = useState(null);
    const {setCenter} = props;


return (

    <div className="filter-wrapper">
        <div className="title">
            <p>NUESTRAS SUCURSALES</p>
            <h3>Busca tu Mini Bodega más cercana</h3>
        </div>
        <div className="field-wrap">
            <Region setRegion={setRegion}/>
        </div>
        <div className="field-wrap">
            <Comuna setCenter={setCenter} region={region} comuna={comuna} setComuna={setComuna}/>
        </div>
    </div>
    
    );
};
