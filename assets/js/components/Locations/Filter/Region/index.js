import React  from 'react';
import { Regions } from '../../../../model/regions';


export default function Region(props) {

    const {setRegion} = props;

    

    const onChange = ( event ) => {

        let target = event.target;

        setRegion(target.value);
    }

    return (

        <select defaultValue={"d"} onChange={onChange} >
            <option key={"d"} value={"d"}  disabled>Seleccionar región</option>
            {
                Regions().map( (region,key) => {
                    return <option vd={Math.random()} key={key} value={region.id}>{region.name}</option>
                })
            }
        </select>

    );
};


