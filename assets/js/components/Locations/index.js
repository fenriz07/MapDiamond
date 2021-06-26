import React, { useState, useEffect } from 'react';
import { CENTER_MAP } from '../../model/conf';
import Filter from './Filter';
import Map from './Map';

export default function Locations (props) {

    const [region,setRegion] = useState(null);
    const [center,setCenter] = useState(CENTER_MAP);

return (

    <div className="row justify-content-center g-5">
        <div className="col-11 col-md-6 order-2 order-md-1">
            <Map center={center} />
        </div>
        <div className="col-11 col-md-6 order-1 order-md-2">
            <Filter setCenter={setCenter} />
        </div>
    </div>

);
};
