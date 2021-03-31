import React  from 'react';
import { Comunas } from '../../../../model/comuna';


export default function Region(props) {

    const {region,setComuna} = props;

    const onChange = ( event ) => {

        let target = event.target;

        setComuna(target.value);
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
