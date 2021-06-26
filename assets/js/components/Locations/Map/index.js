import React,{useState} from 'react'
import { GoogleMap, LoadScript,Marker,InfoWindow} from '@react-google-maps/api';
import {  CONTAINER_STYLE, GOOGLE_MAP_API_KEY } from '../../../model/conf';
import { getMarkers } from '../../../model/markers.';


function Map(props) {

  const {center} = props;
  const [infoWindownOpen,setInfoWindownOpen] = useState(false);

  return (
    <div className="map-wrapper">
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
              return <CustomMarker infoWindownOpen={infoWindownOpen} setInfoWindownOpen={setInfoWindownOpen} marker={key} key={key} position={position} text="Test"/>
            })
          }

        </GoogleMap>
      </LoadScript>
    </div>
  )
}


function CustomMarker(props) {

  const {position} = props

  const [open,setOpen] = useState(false);

  const {infoWindownOpen,setInfoWindownOpen,marker} = props


  const onClick = (e) => {
    setInfoWindownOpen(marker)
    setOpen(!open)
  }

  if(open==true && infoWindownOpen == marker){
    return (<Marker position={position} onClick={onClick}> 
  
        <InfoWindow
        position={position}
      >
        <div className="info-window-22">
          <h3><span>Sucursal:</span> {position.name}</h3>
          <p><span>Dirección:</span> {position.address}</p>
          {/* <p><span>Ciudad:</span> {position.city}</p> */}
          {/* <p><span>Teléfono:</span> <a href={"tel:"+position.phone}>{position.phone}</a> </p> */}
          {/* <p><span>Sitio web:</span> <a target="_blank" href={position.website}>Sitio Web</a></p> */}
        </div>
      </InfoWindow>
  
    </Marker>)
  }

  return (<Marker position={position} onClick={onClick}> </Marker>)

}


export default React.memo(Map)
