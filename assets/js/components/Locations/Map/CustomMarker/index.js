import React from 'react'
import { Marker } from '@react-google-maps/api';



export default function CustomMarker(props) {

    const {key,position} = props

    return (<Marker key={key} position={position}/>)
}