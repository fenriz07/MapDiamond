import React,{useState} from 'react'
import { GoogleMap, LoadScript,Marker,InfoWindow} from '@react-google-maps/api';
import {  CONTAINER_STYLE, GOOGLE_MAP_API_KEY } from '../../../model/conf';
import { getMarkers } from '../../../model/markers.';


function Map(props) {

  const {center} = props;

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAP_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={CONTAINER_STYLE}
        center={center}
        zoom={11}
      >



        { /* Child components, such as markers, info windows, etc. */ }
        <></>
        {
          getMarkers().map( (position,key) => {
            return <CustomMarker key={key} position={position} text="Test"/>
          })
        }

      </GoogleMap>
    </LoadScript>
  )
}


function CustomMarker(props) {

  const {position} = props

  const [open,setOpen] = useState(false);

  const onClick = (e) => {
    setOpen(!open)
  }

  if(open==true){
    return (<Marker  position={position} onClick={onClick}> 
  
        <InfoWindow
        position={position}
      >
        <div className="info-window-22">
          <h1>Nombre: {position.name}</h1>
          <a href={"tel:"+position.phone}>{position.phone}</a> 
          <a target="_blank" href={position.website}>Sitio Web</a>
        </div>
      </InfoWindow>
  
    </Marker>)
  }

  return (<Marker position={position} onClick={onClick}> </Marker>)

}


export default React.memo(Map)
