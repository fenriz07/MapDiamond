import React, { useState, useEffect } from 'react';
import { CENTER_MAP } from '../../model/conf';
import Filter from './Filter';
import Map from './Map';

export default function Locations (props) {

    const [region,setRegion] = useState(null);
    const [center,setCenter] = useState(CENTER_MAP);

return (

    <div className="row">

        <Filter setCenter={setCenter} />
        <Map center={center} />

    </div>

);
};
