import React from 'react'
import { GoogleMap, LoadScript,Marker } from '@react-google-maps/api';
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
            return <Marker key={key} position={position} />
          })
        }

      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)