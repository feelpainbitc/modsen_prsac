import React from 'react'
import {  MarkerF } from '@react-google-maps/api'

/**
* @author
* @function CurrentLocationMarker
**/

export const CurrentLocationMarker = ({position}) => {
  return(
    <MarkerF  
    position={position}
    icon={{url:'../../../public/assets/yourpoint.svg'}}
    />
   )
  }
