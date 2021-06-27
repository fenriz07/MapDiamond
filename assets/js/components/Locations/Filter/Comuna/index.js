import React, { useState}  from 'react';
import { Comunas,getCenterComuna } from '../../../../model/comuna';


export default function Comuna(props) {

    const {region,setCenter} = props;

    const [defaultValue,setDefaultValue] = useState("d");

    const onChange = ( event ) => {
        

        let target = event.target;

        if (target.value != "d"){

            let idComuna = Number(target.value);

            let center = getCenterComuna(region,idComuna);
    
            setCenter(center)
        }

        setDefaultValue(target.value)
    }

    if( region === null )
    {
        return (
        

            <select value={defaultValue} onChange={onChange} >
                <option key={"d"} value={"d"}>Seleccionar comuna</option>
            </select>
    
        );
    }

    return (
        

        <select value={defaultValue} onChange={onChange} >
            <option key={"d"} value={"d"}>Seleccionar comuna</option>
            {
                Comunas()[region].map( (comuna,key) => {
                    return <option key={key} value={comuna.id}>{comuna.name}</option>
                })
            }
        </select>

    );
};
