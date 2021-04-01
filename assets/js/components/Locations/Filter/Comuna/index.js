import React  from 'react';
import { Comunas,getCenterComuna } from '../../../../model/comuna';


export default function Comuna(props) {

    const {region,setCenter} = props;

    const onChange = ( event ) => {

        let target = event.target;

        let idComuna = Number(target.value);

        let center = getCenterComuna(region,idComuna);

        setCenter(center)
    }

    if( region === null )
    {
        return <React.Fragment>  </React.Fragment>;
    }

    return (
        

        <select defaultValue={"d"} onChange={onChange} >
            <option key={"d"} value={"d"}  disabled>Comuna</option>
            {
                Comunas()[region].map( (comuna,key) => {
                    return <option key={key} value={comuna.id}>{comuna.name}</option>
                })
            }
        </select>

    );
};
